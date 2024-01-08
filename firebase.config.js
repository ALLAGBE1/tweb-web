// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAefb0-y2xEnDBUERQm5j-5kEvHddOTeDI",
    authDomain: "phone-auth-e0c6b.firebaseapp.com",
    projectId: "phone-auth-e0c6b",
    storageBucket: "phone-auth-e0c6b.appspot.com",
    messagingSenderId: "906166534238",
    appId: "1:906166534238:web:23d1fc42177c48e3fcb4cf",
    measurementId: "G-FJWTPCGE1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)