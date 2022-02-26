import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCvKPVow0hHVCpGsttHc3AUdZI3aie6rPY",
    authDomain: "reels-ad6bd.firebaseapp.com",
    projectId: "reels-ad6bd",
    storageBucket: "reels-ad6bd.appspot.com",
    messagingSenderId: "604865635922",
    appId: "1:604865635922:web:498799c381cf64843de18b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();

const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}

export const storage=firebase.storage()