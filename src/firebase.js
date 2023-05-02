import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-Da3e64HuAGoYX7dDoJNJDMPE9sMumsY",
  authDomain: "budget---brother.firebaseapp.com",
  projectId: "budget---brother",
  storageBucket: "budget---brother.appspot.com",
  messagingSenderId: "1066602946161",
  appId: "1:1066602946161:web:516b7d9acc334d2b1405d0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
