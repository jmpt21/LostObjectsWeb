import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZFm262u2IhkcgpPEw-Tp4JV0UqmSDfhg",
  authDomain: "lost-objects-app.firebaseapp.com",
  projectId: "lost-objects-app",
  storageBucket: "lost-objects-app.appspot.com",
  messagingSenderId: "506654347126",
  appId: "1:506654347126:web:5c800782d346d228983457"
};

// Initialize Firebase and products
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
