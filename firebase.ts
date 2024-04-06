import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHefU4vFbHkK0b8Uer9ZlbVTXQWKwvtGo",
  authDomain: "dropbox-clone-8cdd3.firebaseapp.com",
  projectId: "dropbox-clone-8cdd3",
  storageBucket: "dropbox-clone-8cdd3.appspot.com",
  messagingSenderId: "389161095647",
  appId: "1:389161095647:web:b045dbbb212e696ec6b46a",
  measurementId: "G-BHMJX8BEGL"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }