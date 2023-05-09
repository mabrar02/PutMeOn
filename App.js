import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, SafeAreaView, Button, View, Text } from 'react-native';
import {useFonts} from 'expo-font';
import Onboarding from "./components/Onboarding";
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {


  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('./app/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('./app/assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Medium': require('./app/assets/fonts/Rubik-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
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
});

