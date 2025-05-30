import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFirebase } from '../../FirebaseContext';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Leidos() {
  const { db, usuario, cargando } = useFirebase();
  const [libros, setLibros] = useState([]);
  const uid = usuario?.uid;

  useEffect(() => {
    if (cargando || !uid) return;
    const fetchLibros = async () => {
      const q = query(
        collection(db, 'libros'),
        where('uid', '==', uid),
        where('leido', '==', true)
      );
      const querySnapshot = await getDocs(q);
      const librosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLibros(librosList);
    };
    fetchLibros();
  }, [db, uid, cargando]);

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!uid) {
    return (
      <View style={styles.container}>
        <Text>Debes iniciar sesión para ver tus libros leídos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Libros Leídos</Text>
      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.titulo}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No has leído ningún libro aún.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});