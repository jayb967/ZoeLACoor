import React, { useEffect } from 'react';
import { Home, OrganizationList } from './src'
import { Login } from './src/views/Login'
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import firebase from 'react-native-firebase';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    firebase.auth()
      .signInAnonymously()
      .then(credential => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON());
        }
      });
  })
  return (
    <NavigationNativeContainer>
      <Stack.Navigator 
      headerMode="none"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Organization" component={OrganizationList} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationNativeContainer>
    // <Home />
  );
};

export default App;
