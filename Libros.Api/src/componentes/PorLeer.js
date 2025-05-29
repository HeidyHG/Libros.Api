import React, { useState, useEffect } from 'react';
  import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useNavigation } from '@react-navigation/native';

  export default function PorLeer() {
    const [porLeer, setPorLeer] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
      const loadPorLeer = async () => {
        try {
          const storedPorLeer = await AsyncStorage.getItem('porLeer');
          if (storedPorLeer) {
            setPorLeer(JSON.parse(storedPorLeer));
          }
        } catch (error) {
          console.error('Error loading porLeer:', error);
        }
      };
      loadPorLeer();
    }, []);

    const renderBook = ({ item }) => (
      <TouchableOpacity
        style={styles.bookItem}
        onPress={() => navigation.navigate('Libro', { book: item })}
      >
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text>{item.authors[0]?.name || 'Unknown Author'}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={porLeer}
          renderItem={renderBook}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No hay libros por leer.</Text>}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    bookItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    bookTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });