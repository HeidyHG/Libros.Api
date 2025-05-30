import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { useFirebase } from '../../FirebaseContext';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
  const { auth } = useFirebase();
  const navigation = useNavigation();

  useEffect(() => {
    signOut(auth).then(() => {
      // Navigation is handled by App.js via onAuthStateChanged
    }).catch(error => console.error(error));
  }, [auth]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}