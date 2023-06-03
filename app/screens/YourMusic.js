import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import TestMusic from '../../components/TestMusic';
import MusicComponent from '../../components/MusicComponent';
import * as SecureStore from "expo-secure-store";
import { FIREBASE_DB } from '../../firebaseConfig';
import { ref, child, get, remove, onValue } from 'firebase/database';

export default YourMusic = () => {
  const [songs, setSongs] = useState([]);
  const [isDatabaseEmpty, setDatabaseEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dbKey = await SecureStore.getItemAsync('db_key');
      const dbRef = ref(FIREBASE_DB, `users/${dbKey}/Music/YourMusic`);

      const listener = onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const songList = Object.values(data);
          setSongs(songList);
          setDatabaseEmpty(false);
        } else {
          setSongs([]);
          setDatabaseEmpty(true);
        }
      });

      return () => {
        
        listener();
      };
    };

    fetchData();
  }, []);

  const clearAllSongs = async () => {
    const userId = await SecureStore.getItemAsync('db_key').then(
      (key) => clearFromDB(key)
    );
  };

  const clearFromDB = async (id) => {
    remove(ref(FIREBASE_DB, `users/${id}/Music/YourMusic`));
  };

  const confirmClear = () => {
    Alert.alert(
      'Clear Songs',
      'Are you sure you want to clear all your songs? This action is not reversible!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearAllSongs },
      ],
      { cancelable: true }
    );
  };

  const renderFooter = () => {
    return (
      songs.length > 0 &&
      !isDatabaseEmpty && (
        <TouchableOpacity style={styles.clearAllButton} onPress={() => confirmClear()}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      )
    );
  };

  return (
    <View style={styles.container}>
      {songs.length == 0 && (
        <View style={{alignItems: "center", justifyContent:"center", alignContent: "center", top: 150}}> 
          <Text style={styles.emptylistText}>You have no songs yet, start posting music for your friends!</Text>
        </View>
      )}
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MusicComponent item={item} savedSongs={false} />}
        contentContainerStyle={styles.flatListContainer}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBFFE9',

  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptylistText: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: '#A7A7A7',
    textAlign: "center"
  },

  flatListContainer: {
    paddingBottom: 140,
  },
  clearAllButton: {
    alignItems: 'center',
  },
  clearAllText: {
    fontSize: 16,
    fontFamily: 'Rubik-SemiBold',
    color: '#A7A7A7',
  },
});
