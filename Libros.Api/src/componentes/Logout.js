import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { useFirebase } from '../../FirebaseContext';

export default function Logout() {
  const { auth } = useFirebase();

  useEffect(() => {
    let isMounted = true;
    signOut(auth)
      .catch(error => {
        if (isMounted) console.error(error);
      });
    return () => { isMounted = false; };
  }, [auth]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}