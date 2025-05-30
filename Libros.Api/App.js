import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FirebaseProvider } from './FirebaseContext';
import Login from './src/componentes/Login';
import Registro from './src/componentes/Registro';
import Leidos from './src/componentes/Leidos';
import PorLeer from './src/componentes/PorLeer';
import Lista from './src/componentes/Lista';
import Perfil from './src/componentes/Perfil';
import Logout from './src/componentes/Logout';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FirebaseProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Registro" component={Registro} />
          <Tab.Screen name="Leidos" component={Leidos} />
          <Tab.Screen name="PorLeer" component={PorLeer} />
          <Tab.Screen name="Lista" component={Lista} />
          <Tab.Screen name="Perfil" component={Perfil} />
          <Tab.Screen name="Logout" component={Logout} />
        </Tab.Navigator>
      </NavigationContainer>
    </FirebaseProvider>
  );
}