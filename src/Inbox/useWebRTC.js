import { useEffect, useRef } from 'react';
import { collection, doc, addDoc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config'; // Ensure this is the correct path to your Firebase config

const servers = {
  iceServers: [
    {
      urls: 'stun:stun1.l.google.com:19302'
    },
  ],
  iceCandidatePoolSize: 10,
};

const useWebRTC = () => {
  const pc = useRef(new RTCPeerConnection(servers));
  const localStream = useRef();
  const remoteStream = useRef();
  const callDocRef = useRef();

  const setupStreams = async () => {
    localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    remoteStream.current = new MediaStream();

    pc.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.addTrack(track);
      });
    };

    localStream.current.getTracks().forEach((track) => {
      pc.current.addTrack(track, localStream.current);
    });
  };

  const createOffer = async () => {
    callDocRef.current = doc(collection(db, 'calls'));
    const offerCandidates = collection(callDocRef.current, 'offerCandidates');
    const answerCandidates = collection(callDocRef.current, 'answerCandidates');

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(offerCandidates, event.candidate.toJSON());
      }
    };

    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDocRef.current, { offer });

    onSnapshot(callDocRef.current, (snapshot) => {
      const data = snapshot.data();
      if (!pc.current.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.current.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const createAnswer = async (callId) => {
    const callDoc = doc(collection(db, 'calls'), callId);
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(answerCandidates, event.candidate.toJSON());
      }
    };

    const callData = (await getDoc(callDoc)).data();
    const offerDescription = callData.offer;
    await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  useEffect(() => {
    setupStreams();
  }, []);

  return { localStream, remoteStream, createOffer, createAnswer };
};

export default useWebRTC;
