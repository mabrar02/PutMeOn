import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9-5oZltqy-jitXzMy-4HlhJJzTFVYrXE",
    authDomain: "putmeon-bf16d.firebaseapp.com",
    databaseURL: "https://putmeon-bf16d-default-rtdb.firebaseio.com",
    projectId: "putmeon-bf16d",
    storageBucket: "putmeon-bf16d.appspot.com",
    messagingSenderId: "448231239090",
    appId: "1:448231239090:web:3364fed2759b32d81688ab",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);