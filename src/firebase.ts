// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx3N34r8Y2akusajov3QC9SmpX_rf42ZI",
  authDomain: "teethlab-c79e4.firebaseapp.com",
  projectId: "teethlab-c79e4",
  storageBucket: "teethlab-c79e4.appspot.com",
  messagingSenderId: "114610779517",
  appId: "1:114610779517:web:7a5027d31e5ba964fe0814",
  measurementId: "G-D0WGM6GWDK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
 const auth = getAuth(app);
 const db = getFirestore(app);

 export { auth, db}
// export const emailAndPasswordAuthProvider = new EmailAuthProvider();
// export const googleAuthProvider = new GoogleAuthProvider();

