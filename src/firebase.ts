// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestoreの追加

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzA4iM7rHwsydcJcL6E0J3EkYUAbs-YEA",
  authDomain: "onedaydemo-project.firebaseapp.com",
  projectId: "onedaydemo-project",
  storageBucket: "onedaydemo-project.appspot.com",
  messagingSenderId: "850817821667",
  appId: "1:850817821667:web:1a8b8578cf3b55dd958ed6",
  measurementId: "G-05KCDFG54H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Firestoreインスタンスを作成してエクスポート
export const db = getFirestore(app);
export { auth };
