import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { useHistory } from "react-router-dom";
// const history = useHistory();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
const config = {
  apiKey: "AIzaSyDroR2bNjdGkcx7Hry_JCrzZ9qyGFpJNRk",
  authDomain: "todo-app-63b41.firebaseapp.com",
  projectId: "todo-app-63b41",
  storageBucket: "todo-app-63b41.appspot.com",
  messagingSenderId: "341495623233",
  appId: "1:341495623233:web:03c49fe360195dedc120c0",
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
export { auth, db };
