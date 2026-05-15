// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webgen-1b290.firebaseapp.com",
  projectId: "webgen-1b290",
  storageBucket: "webgen-1b290.firebasestorage.app",
  messagingSenderId: "1069777648230",
  appId: "1:1069777648230:web:2d15b53c2d4085abfdcba7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
