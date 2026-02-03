// Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "ncc-project-3b0f1.firebaseapp.com",
  projectId: "ncc-project-3b0f1",
  storageBucket: "ncc-project-3b0f1.appspot.com",
  messagingSenderId: "590441541895",
  appId: "1:590441541895:web:2a861830fcb60f09f655a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
