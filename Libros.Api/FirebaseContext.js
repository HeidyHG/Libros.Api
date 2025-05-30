import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCjUhH9WiMfGmvYe9EmVQOjYTTxRRWG2v8",
  authDomain: "librosapi-245bf.firebaseapp.com",
  projectId: "librosapi-245bf",
  storageBucket: "librosapi-245bf.appspot.com", // Corregido
  messagingSenderId: "357180022116",
  appId: "1:357180022116:web:bc6f95af2c0d8343a22e71",
  measurementId: "G-11BVGF8V53"
};

// Inicializa Firebase
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
    const initializeAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
            setAuthInitialized(true);
            setCargando(false);
            resolve();
          }, (error) => {
            console.error("Auth state change error:", error);
            reject(error);
          });
          return () => unsubscribe();
        });
      } catch (error) {
        console.error("Firebase initialization error:", error);
        setCargando(false);
      }
    };

    initializeAuth();
  }, []);

  if (cargando || !authInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Inicializando Firebase...</Text>
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
