import React, { useState, useEffect } from 'react';
  import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
  import { useNavigation } from '@react-navigation/native';

  export default function Lista() {
    const [books, setBooks] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch('http://gutendex.com/books');
          const data = await response.json();
          setBooks(data.results);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
      fetchBooks();
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
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id.toString()}
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