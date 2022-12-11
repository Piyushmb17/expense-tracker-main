import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getApps,getApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDx1PAE1P54axkLPTtgXe-PeVoRauy4TmI",
    authDomain: "expense-tracker-n.firebaseapp.com",
    projectId: "expense-tracker-n",
    storageBucket: "expense-tracker-n.appspot.com",
    messagingSenderId: "311405315381",
    appId: "1:311405315381:web:ea4ab56eea62910991787c",
    measurementId: "G-56YG2JYJZX"
};

// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app); 
export const storage = getStorage();
export const db = getFirestore();
