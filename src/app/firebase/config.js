import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIBVf1gw-P3CLo4K7yj_sCBEVHqQsKqm8",
  authDomain: "news-app-5a24b.firebaseapp.com",
  projectId: "news-app-5a24b",
  storageBucket: "news-app-5a24b.appspot.com",
  messagingSenderId: "488607869570",
  appId: "1:488607869570:web:e9cd6471c56fd901e5629b" 
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();
