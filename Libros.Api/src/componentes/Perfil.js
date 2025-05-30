import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirebase } from '../../FirebaseContext';

export default function Perfil() {
  const { db, usuario, cargando } = useFirebase();
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [librosLeidos, setLibrosLeidos] = useState(0);
  const [librosPorLeer, setLibrosPorLeer] = useState(0);
  const uid = usuario?.uid;

  useEffect(() => {
    if (cargando || !uid) return;
    const traerDatos = async () => {
      try {
        const docRef = doc(db, 'usuarios', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || '');
          setFecha(data.fecha || '');
          setTelefono(data.telefono || '');
          setLibrosLeidos(data.librosLeidos || 0);
          setLibrosPorLeer(data.librosPorLeer || 0);
        } else {
          Alert.alert('Usuario no encontrado');
        }
      } catch (error) {
        Alert.alert('Error al obtener datos');
      }
    };
    traerDatos();
  }, [db, uid, cargando]);

  const actualizarDatos = async () => {
    try {
      const docRef = doc(db, 'usuarios', uid);
      await updateDoc(docRef, {
        nombre,
        fecha,
        telefono,
      });
      Alert.alert('Datos actualizados');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al actualizar');
    }
  };

  if (cargando) return <Text style={styles.cargando}>Cargando...</Text>;
  if (!uid) return <Text style={styles.cargando}>Debes iniciar sesión para ver tu perfil.</Text>;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Perfil del Usuario</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Fecha de nacimiento (YYYY-MM-DD)" value={fecha} onChangeText={setFecha} />
      <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      <Text style={styles.stats}>Libros Leídos: {librosLeidos}</Text>
      <Text style={styles.stats}>Libros por Leer: {librosPorLeer}</Text>
      <Button title="Guardar cambios" onPress={actualizarDatos} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: 20, flex: 1, backgroundColor: '#fff' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, margin: 10, marginBottom: 15, borderRadius: 10, padding: 8 },
  stats: { fontSize: 16, marginVertical: 10 },
  cargando: { marginTop: 50, textAlign: 'center' },
});