import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyATdmMpAUpuL9npw0_VfzR4O9N9oKcO-TY",
    authDomain: "trnaslation-empire.firebaseapp.com",
    databaseURL: "https://trnaslation-empire-default-rtdb.firebaseio.com",
    projectId: "trnaslation-empire",
    storageBucket: "trnaslation-empire.firebasestorage.app",
    messagingSenderId: "223882479742",
    appId: "1:223882479742:web:4265eb10afece40bb8f02f",
    measurementId: "G-TYDEP91QNF"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getDatabase(app);
