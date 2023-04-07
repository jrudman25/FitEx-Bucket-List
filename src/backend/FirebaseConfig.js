// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAivSA9lqGE5bxVu5Jq9-If_2Jn9HSXwT0",
    authDomain: "bucketlist-90b4c.firebaseapp.com",
    projectId: "bucketlist-90b4c",
    storageBucket: "bucketlist-90b4c.appspot.com",
    messagingSenderId: "842956243605",
    appId: "1:842956243605:web:d22d3e7be0b19b1045519c",
    measurementId: "G-FZP2EB653E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);