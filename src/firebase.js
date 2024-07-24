
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDte_DycKTrSSwlcmtRF8LOg4QCIGNSBTw",
  authDomain: "music-4d660.firebaseapp.com",
  projectId: "music-4d660",
  storageBucket: "music-4d660.appspot.com",
  messagingSenderId: "956326287282",
  appId: "1:956326287282:web:8fd446dc36c3795241f6ab"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
