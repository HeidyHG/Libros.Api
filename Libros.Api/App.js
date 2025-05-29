import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, View, ActivityIndicator } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/native-stack';
  import { useEffect, useState } from 'react';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from './firebase/firebaseConfig';
  import Login from './src/componentes/Login';
  import Registro from './src/componentes/Registro';
  import Lista from './src/componentes/Lista';
  import Libros from './src/componentes/Libros';
  import Leidos from './src/componentes/Leidos';
  import PorLeer from './src/componentes/PorLeer';
  import Perfil from './src/componentes/Perfil';
  import Logout from './src/componentes/Logout';

  const Stack = createStackNavigator();

  export default function App() {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUsuario(user);
        setCargando(false);
      });
      return () => unsubscribe();
    }, []);

    if (cargando) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator initialRouteName={usuario ? "Lista" : "Login"}>
            {!usuario ? (
              <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Registro" component={Registro} options={{ title: 'Registro' }} />
              </>
            ) : (
              <>
                <Stack.Screen name="Lista" component={Lista} options={{ title: 'Lista de Libros' }} />
                <Stack.Screen name="Libro" component={Libros} options={{ title: 'Detalles del Libro' }} />
                <Stack.Screen name="Leidos" component={Leidos} options={{ title: 'Libros Leídos' }} />
                <Stack.Screen name="PorLeer" component={PorLeer} options={{ title: 'Libros por Leer' }} />
                <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
                <Stack.Screen name="Logout" component={Logout} options={{ title: 'Cerrando Sesión' }} />
              </>
            )}
          </Stack.Navigator>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });