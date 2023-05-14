import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, SafeAreaView, Button, View, Text } from 'react-native';
import {useFonts} from 'expo-font';
import Onboarding from "./components/Onboarding";
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BottomTabNavigator from './components/BottomTabNavigator';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('./app/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('./app/assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Medium': require('./app/assets/fonts/Rubik-Medium.ttf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (token) {
          setIsLoggedIn(true);
        } else {
          console.log('No token found');
          setIsLoggedIn(false);
        }

      } catch (e) {
        console.log('Failed to get token:', e);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkToken();
  }, []);


  if (isCheckingToken || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }


  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={!isLoggedIn ? 'Onboarding' : null}>
        <Stack.Screen name="HomePage" component={BottomTabNavigator} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBFFE9",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
