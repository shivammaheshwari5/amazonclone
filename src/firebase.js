import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnA8iMAGLXNB__WD-TL-tI0lf2v9UemQ8",
  authDomain: "clone-ed503.firebaseapp.com",
  projectId: "clone-ed503",
  storageBucket: "clone-ed503.appspot.com",
  messagingSenderId: "472101274398",
  appId: "1:472101274398:web:753a63d84aa84fc6477f0f",
  measurementId: "G-V9SG17FRT9"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };