
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLoFNn16q6smL9g_KLoT3IaoE5ip5bMk8",
  authDomain: "ufyp-94a3c.firebaseapp.com",
  projectId: "ufyp-94a3c",
  storageBucket: "ufyp-94a3c.appspot.com",
  messagingSenderId: "616441466229",
  appId: "1:616441466229:web:bcda8d35cfeefc04a0d73c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 