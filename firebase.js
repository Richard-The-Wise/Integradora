import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWOtZ4gwI9cV2Hm7mUThN44_wlpA4npcA",
    authDomain: "integradora-e420a.firebaseapp.com",
    projectId: "integradora-e420a",
    storageBucket: "integradora-e420a.appspot.com",
    messagingSenderId: "1087310598405",
    appId: "1:1087310598405:web:3176b2eda01ada889c676c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };