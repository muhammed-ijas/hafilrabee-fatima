import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyDbSPzy8NwocwQ_QqA3FZtl7a0nrvtl1Ms",
  authDomain: "fatimaafnanwedding.firebaseapp.com",
  projectId: "fatimaafnanwedding",
  storageBucket: "fatimaafnanwedding.firebasestorage.app",
  messagingSenderId: "221150574765",
  appId: "1:221150574765:web:25d92622477df73bc56e24",
  measurementId: "G-0V2V9DP1E5"
};
 
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);