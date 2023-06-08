import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import { FIREBASE_DB } from '../../firebaseConfig';
import {ref, get} from "firebase/database";
import WebView from 'react-native-webview';

export default HomeScreen = ({navigation}) => {
  const [chosenSong, setChosenSong] = useState("");

  useEffect(() => {
    setUpPlayer();

  }, []);

  const setUpPlayer = async () => {
    const dbKey = await SecureStore.getItemAsync("db_key");
    const dbRef = ref(FIREBASE_DB, `users/${dbKey}/Music/YourMusic`);
    const snapshot = await get(dbRef);
    if(snapshot.exists()){
      setChosenSong(existingUser = Object.keys(snapshot.val())[0]);
    }
  }

  const playSong = async () => {
    const token = await SecureStore.getItemAsync("access_token");
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [`spotify:track:${chosenSong}`],
      }),
    };

    await fetch('https://api.spotify.com/v1/me/player/play', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    
  }

  return (
    <View style={{flex:1}}>
        <SafeAreaView style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.putMeText}>PutMe</Text>
            <Text style={styles.onText}>ON!</Text>
          </View>
      </SafeAreaView>
      <View style={styles.body}>
        <TouchableOpacity style={{backgroundColor: "red", width: 200, height: 100, }} onPress={() => playSong()}>
          <Text>Play Song</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3E6F38",
    flex: 0.18,
  },

  putMeText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4},
  },

onText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ECF39E",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4},

  },

headerText: {
    alignItems: 'center',
    marginTop: 25,
  },

body: {
  backgroundColor: "#EBFFE9",
  flex: 0.82,
  alignItems: "center"
  },
  

})