import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, SafeAreaView, Button, View, Text } from 'react-native';
import {useFonts} from 'expo-font';
import Onboarding from "./components/Onboarding";
import LoginScreen from './app/screens/LoginScreen';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('./app/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('./app/assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Medium': require('./app/assets/fonts/Rubik-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <View style={styles.container}>
      <Onboarding/>

      <StatusBar style = "auto" />
    </View>



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

