// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyClnn0mukB-5G3UE_pE6S1nFVVZm0XRXvY",

  authDomain: "emergencydispatcherpro.firebaseapp.com",

  databaseURL: "https://emergencydispatcherpro-default-rtdb.firebaseio.com",

  projectId: "emergencydispatcherpro",

  storageBucket: "emergencydispatcherpro.appspot.com",

  messagingSenderId: "798294890392",

  appId: "1:798294890392:web:7f8f2d820293ac9ca7bded"

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
