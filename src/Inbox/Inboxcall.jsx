import React, { useRef, useEffect, useState } from 'react';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

const Inbox = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [stream, setStream] = useState(null);

  const callDocument = doc(collection(db, 'calls'), 'callId'); // Replace 'callId' with a unique ID

  useEffect(() => {
    // Access user's video and audio
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        localVideoRef.current.srcObject = mediaStream;
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    // Firebase listeners for offer and ICE candidates
    const unsubscribeOffer = onSnapshot(callDocument, async (snapshot) => {
      const data = snapshot.data();
      if (data && data.offer && !peerConnection.current) {
        createPeerConnection();
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        await setDoc(callDocument, { answer }, { merge: true });
      }
      if (data && data.candidate) {
        peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    return () => {
      unsubscribeOffer();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        setDoc(callDocument, { candidate: event.candidate.toJSON() }, { merge: true });
      }
    };

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    stream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, stream);
    });
  };

  const callUser = async () => {
    if (!peerConnection.current) createPeerConnection();
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    await setDoc(callDocument, { offer: offer.toJSON() }, { merge: true });
  };

  return (
    <div>
      <h1>Video Call</h1>
      <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '300px' }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '300px' }} />
      <button onClick={callUser}>Call User</button>
    </div>
  );
};

export default Inbox;
