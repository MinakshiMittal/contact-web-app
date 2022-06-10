import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/database";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCr7vivHFveIgbuv6sH-zyG-LNE0rxNvxU",
  authDomain: "contact-web-app-7d6e9.firebaseapp.com",
  projectId: "contact-web-app-7d6e9",
  storageBucket: "contact-web-app-7d6e9.appspot.com",
  messagingSenderId: "138301522871",
  appId: "1:138301522871:web:141825576cb7cb803b5e32",
  measurementId: "G-VR6YNDYRGK",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});
const firestore = firebase.firestore();
const db = firebase.database();
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);

export { auth, googleAuthProvider, firestore, db, storage };
export default firebase;
