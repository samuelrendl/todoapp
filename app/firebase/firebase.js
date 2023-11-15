// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBegLsvXa4ltYl-subKn6fPM_OBlqN_KOM",

  authDomain: "to-do-app-1a0af.firebaseapp.com",

  projectId: "to-do-app-1a0af",

  storageBucket: "to-do-app-1a0af.appspot.com",

  messagingSenderId: "581299701567",

  appId: "1:581299701567:web:6454129720653c8ee2b58a",

  measurementId: "G-Q08YDKY5EL"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app);