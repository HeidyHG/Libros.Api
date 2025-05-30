import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // <-- Corrección aquí
import { useNavigation } from '@react-navigation/native';
import { useFirebase } from '../../FirebaseContext';

export default function Registro() {
  const { auth, db } = useFirebase();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigation = useNavigation();

  const handleRegistro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;
      await setDoc(doc(db, 'usuarios', user.uid), {
        nombre,
        correo,
        fecha,
        telefono,
        librosLeidos: 0,
        librosPorLeer: 0,
      });
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error al registrarse', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={styles.input} />
      <TextInput placeholder="Contraseña" value={contrasena} onChangeText={setContrasena} style={styles.input} secureTextEntry />
      <TextInput placeholder="Fecha de nacimiento" value={fecha} onChangeText={setFecha} style={styles.input} />
      <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" style={styles.input} />
      <Button title="Registrarse" onPress={handleRegistro} />
      <View style={{ marginTop: 10 }} />
      <Button title="¿Ya tienes cuenta? Inicia sesión" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 6 },
});