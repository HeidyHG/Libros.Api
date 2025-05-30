import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFirebase } from '../../FirebaseContext';
import { collection, getDocs } from 'firebase/firestore';

export default function Libros() {
  const { db, cargando } = useFirebase();
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    if (cargando) return;
    const fetchLibros = async () => {
      const querySnapshot = await getDocs(collection(db, 'libros'));
      const librosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLibros(librosList);
    };
    fetchLibros();
  }, [db, cargando]);

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Todos los Libros</Text>
      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.titulo} - {item.leido ? 'Leído' : 'Por Leer'}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay libros en la base de datos.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});