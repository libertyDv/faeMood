import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
export const googleProvider = new GoogleAuthProvider(app)