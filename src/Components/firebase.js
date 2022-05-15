import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAjMWh6qHD5JpjKIdeDaNKPmBpRMhyKWco",
    authDomain: "reels-b3efe.firebaseapp.com",
    projectId: "reels-b3efe",
    storageBucket: "reels-b3efe.appspot.com",
    messagingSenderId: "567321985515",
    appId: "1:567321985515:web:c4830d2b915472148759ae",
    measurementId: "G-HXWFCJL7FQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();

const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}

export const storage=firebase.storage()