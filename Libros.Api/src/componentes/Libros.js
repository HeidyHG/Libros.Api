import React, { useState, useEffect } from 'react';
  import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  export default function Libros({ route, navigation }) {
    const { book } = route.params;
    const [loading, setLoading] = useState(false);

    const saveToLeidos = async () => {
      try {
        setLoading(true);
        const existingLeidos = await AsyncStorage.getItem('leidos');
        const leidos = existingLeidos ? JSON.parse(existingLeidos) : [];
        if (!leidos.some(item => item.id === book.id)) {
          leidos.push(book);
          await AsyncStorage.setItem('leidos', JSON.stringify(leidos));
        }
        setLoading(false);
        navigation.navigate('Leidos');
      } catch (error) {
        setLoading(false);
        console.error('Error saving to leidos:', error);
      }
    };

    const saveToPorLeer = async () => {
      try {
        setLoading(true);
        const existingPorLeer = await AsyncStorage.getItem('porLeer');
        const porLeer = existingPorLeer ? JSON.parse(existingPorLeer) : [];
        if (!porLeer.some(item => item.id === book.id)) {
          porLeer.push(book);
          await AsyncStorage.setItem('porLeer', JSON.stringify(porLeer));
        }
        setLoading(false);
        navigation.navigate('PorLeer');
      } catch (error) {
        setLoading(false);
        console.error('Error saving to porLeer:', error);
      }
    };

    if (loading) {
      return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Autor: {book.authors[0]?.name || 'Desconocido'}</Text>
        <Text style={styles.detail}>Idioma: {book.languages[0] || 'No disponible'}</Text>
        <Text style={styles.detail}>Descargas: {book.download_count}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Agregar a Leídos" onPress={saveToLeidos} />
          <View style={styles.buttonSpacer} />
          <Button title="Agregar a Por Leer" onPress={saveToPorLeer} />
        </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    author: {
      fontSize: 18,
      marginBottom: 10,
    },
    detail: {
      fontSize: 16,
      marginBottom: 5,
    },
    buttonContainer: {
      marginTop: 20,
    },
    buttonSpacer: {
      height: 10,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
    },
  });