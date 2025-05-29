import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_uc5FGVZbtf3DPm4TaVK7pQXTEkgE-Jw",
  authDomain: "librosapi2.firebaseapp.com",
  projectId: "librosapi2",
  storageBucket: "librosapi2.firebasestorage.app",
  messagingSenderId: "260996730970",
  appId: "1:260996730970:web:74fe93e72061f2fed1c863",
  measurementId: "G-5M0X76QQXR" // Puedes eliminar este campo si no usas Analytics
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };