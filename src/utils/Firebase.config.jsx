// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1_8ZHGsUduJVge3aLWJXwY3eCTBMrCSo",
  authDomain: "netflix-gpt-e3a72.firebaseapp.com",
  projectId: "netflix-gpt-e3a72",
  storageBucket: "netflix-gpt-e3a72.firebasestorage.app",
  messagingSenderId: "923324610179",
  appId: "1:923324610179:web:f65c39952c976278c84db6",
  measurementId: "G-V1CN4RFXVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();