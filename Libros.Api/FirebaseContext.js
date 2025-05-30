import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC_uc5FGVZbtf3DPm4TaVK7pQXTEkgE-Jw",
  authDomain: "librosapi2.firebaseapp.com",
  projectId: "librosapi2",
  storageBucket: "librosapi2.firebasestorage.app",
  messagingSenderId: "260996730970",
  appId: "1:260996730970:web:74fe93e72061f2fed1c863",
  measurementId: "G-5M0X76QQXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics not supported in this environment:", error);
}

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Ensure auth is fully initialized
        await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
            setAuthInitialized(true);
            setCargando(false);
            resolve();
          }, reject);
          return () => unsubscribe();
        });
      } catch (error) {
        console.error("Error initializing auth:", error);
        setCargando(false);
      }
    };

    initializeFirebase();
  }, []);

  if (cargando || !authInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Inicializando...</Text>
      </View>
    );
  }

  return (
    <FirebaseContext.Provider value={{ auth, db, usuario, cargando, analytics }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);