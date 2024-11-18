// firebase.config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Xc9GFHLXdXmPgDjbqLEt-Bx41mM_a_w",
  authDomain: "hirebd.firebaseapp.com",
  projectId: "hirebd",
  storageBucket: "hirebd.appspot.com",
  messagingSenderId: "779553391223",
  appId: "1:779553391223:web:02380ce42093e9e3577c72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Use the new Auth method

export { app, db, auth };
