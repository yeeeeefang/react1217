// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//匯入firebase
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQzz3raw7u-dJ_SAI_R8M-WJQq_qCrBBw",
  authDomain: "react-auth-cb894.firebaseapp.com",
  projectId: "react-auth-cb894",
  storageBucket: "react-auth-cb894.firebasestorage.app",
  messagingSenderId: "572652593253",
  appId: "1:572652593253:web:a99eddbe18722825efa68c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//匯出
export const auth=getAuth(app);
export const provide = new GoogleAuthProvider();