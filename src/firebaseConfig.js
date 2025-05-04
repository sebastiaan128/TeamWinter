import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqCMu-xPP2i3ZH7IoO0WL1VHGP5r-c-zE",
  authDomain: "team-winter-21463.firebaseapp.com",
  projectId: "team-winter-21463",
  storageBucket: "team-winter-21463.firebasestorage.app",
  messagingSenderId: "1033138459582",
  appId: "1:1033138459582:web:8f30f7c6e317761a859fef",
  measurementId: "G-GC83BDVG3Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);