import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "komero-bbe8e.firebaseapp.com",
    databaseURL: "https://komero-bbe8e.firebaseio.com",
    projectId: "komero-bbe8e",
    storageBucket: "komero-bbe8e.appspot.com",
    messagingSenderId: "627231312134",
    appId: "1:627231312134:web:7f2a1e3ac3c8599d"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
