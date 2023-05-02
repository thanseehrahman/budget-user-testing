import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW44cY4_H-YQb8LOJ-OATWdFtzVlgxg1w",
  authDomain: "budget-user-testing.firebaseapp.com",
  projectId: "budget-user-testing",
  storageBucket: "budget-user-testing.appspot.com",
  messagingSenderId: "33373407919",
  appId: "1:33373407919:web:ad4d406284796dca6be25a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
