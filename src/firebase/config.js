// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfPbYdg6zGPiIe0K7MLkK2bj_NYmABah0",
  authDomain: "humsafar-app-3000b.firebaseapp.com",
  databaseURL: "https://humsafar-app-3000b-default-rtdb.firebaseio.com",
  projectId: "humsafar-app-3000b",
  storageBucket: "humsafar-app-3000b.firebasestorage.app",
  messagingSenderId: "494647434719",
  appId: "1:494647434719:web:98675f73bc26a6af33386a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app);

// Export app (optional but recommended)
export default app;