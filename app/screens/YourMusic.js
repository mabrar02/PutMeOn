import { FlatList, StyleSheet, Text, View, } from 'react-native';
import React, {useState, useEffect} from 'react';
import TestMusic from '../../components/TestMusic';
import MusicComponent from '../../components/MusicComponent';
import * as SecureStore from "expo-secure-store"
import { FIREBASE_DB } from '../../firebaseConfig';
import { ref, child, get } from 'firebase/database';

export default YourMusic = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const userId = await SecureStore.getItemAsync('user_id');
    const dbRef = ref(FIREBASE_DB, `users/${userId}/Music/YourMusic`);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const songList = Object.values(data);
      setSongs(songList);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
      data={songs}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <MusicComponent item={item} savedSongs={false}/>} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#EBFFE9"
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});