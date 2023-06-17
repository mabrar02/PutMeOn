import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import Spotify from '../../components/Spotify';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FIREBASE_DB } from '../../firebaseConfig';
import { ref, child, get, remove, onValue } from 'firebase/database';

export default HomeScreen = ({ navigation }) => {
  const [allSongs, setAllSongs] = useState([]);
  const [currentSongs, setCurrentSongs] = useState([]);
  const [currentUsersSongsIndex, setCurrentUsersSongsIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentRecUser, setCurrentRecuser] = useState(null);

  const [excludedSongs, setExcludedSongs] = useState([]);


  useEffect(() => {
    getFriends();

  }, []);




  const getFriends = async () => {
    const dbKey = await SecureStore.getItemAsync('db_key');
    const friendsRef = ref(FIREBASE_DB, `users/${dbKey}/Friends/Added`);
    const snapshot = await get(friendsRef);

    if(snapshot.exists()){
      const friendsList = Object.keys(snapshot.val());
      await fetchSongs(friendsList);
    }
  };

  const fetchSongs = async (friendsList) => {
    const dbKey = await SecureStore.getItemAsync('db_key');
    const yourMusicRef = ref(FIREBASE_DB, `users/${dbKey}/Music/YourMusic`);
    const savedMusicRef = ref(FIREBASE_DB, `users/${dbKey}/Music/SavedSongs`);
    const dislikedMusicRef = ref(FIREBASE_DB, `users/${dbKey}/Music/DislikedSongs`);

    const yourMusicSnapshot = await get(yourMusicRef);
    const savedMusicSnapshot = await get(savedMusicRef);
    const dislikedMusicSnapshot = await get(dislikedMusicRef);
    let newExclusions = excludedSongs;

    if(yourMusicSnapshot.exists()){
      const yourMusicList = Object.keys(yourMusicSnapshot.val());
      newExclusions = newExclusions.concat(yourMusicList);
      setExcludedSongs(newExclusions);
    }
    if(savedMusicSnapshot.exists()){
      const savedMusicList = Object.keys(savedMusicSnapshot.val());
      newExclusions = newExclusions.concat(savedMusicList);
      setExcludedSongs(newExclusions);
    }
    if(dislikedMusicSnapshot.exists()){
      const savedMusicList = Object.keys(dislikedMusicSnapshot.val());
      newExclusions = newExclusions.concat(savedMusicList);
      setExcludedSongs(newExclusions);
    }

    const songsPromises = await friendsList.map(async (friend) => {
      const friendSongsRef = ref(FIREBASE_DB, `users/${friend}/Music/YourMusic`);
      const friendSongsSnapshot = await get(friendSongsRef);
      const songs = friendSongsSnapshot.val();

      if (songs !== null) {
        const filteredSongs = Object.keys(songs).filter((songId) => !newExclusions.includes(songId));
        const filteredSongData = filteredSongs.reduce((acc, songId) => {
          acc[songId] = songs[songId];
          return acc;
        }, {});
        console.log(filteredSongData);
  
        return { user: friend, songs: filteredSongData };
      } else {
        return null;
      }
    });

  
    const friendSongs = await Promise.all(songsPromises);
    const filteredFriendSongs = friendSongs.filter((friend) => friend !== null && friend.songs !== null);

    setAllSongs(filteredFriendSongs);
    setCurrentSongs(Object.values(filteredFriendSongs[0].songs));
  };
  

  const dislikeButtonOnPress = () => {
    if(currentSongIndex >= 1) {
      setCurrentSongIndex(currentSongIndex-1);
    }
    else if(currentSongIndex == 0){
      prevUsersSongs()
    }
  }

  const likeButtonOnPress = () => {
    if(currentSongIndex < currentSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex+1);
    }
    else if(currentSongIndex == currentSongs.length - 1){
      nextUsersSongs()
    }
  }

  const nextUsersSongs = () => {
    if(currentUsersSongsIndex < allSongs.length - 1){
      setCurrentSongIndex(0);
      setCurrentUsersSongsIndex(currentUsersSongsIndex + 1);
      setCurrentSongs(Object.values(allSongs[(currentUsersSongsIndex+1)].songs));
    }
  }

  const prevUsersSongs = () => {
    if(currentUsersSongsIndex >= 1){
      const prevNumSongsIndex = Object.keys(allSongs[(currentUsersSongsIndex-1)].songs).length-1;
      setCurrentSongIndex(prevNumSongsIndex);
      setCurrentUsersSongsIndex(currentUsersSongsIndex - 1);
      setCurrentSongs(Object.values(allSongs[(currentUsersSongsIndex-1)].songs));
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.putMeText}>PutMe</Text>
          <Text style={styles.onText}>ON!</Text>
        </View>
      </SafeAreaView>
      {allSongs.length != 0 && currentSongs.length != 0 && (
      <View style={styles.body}>
        <View style={styles.song}>
          <Image style={styles.songImage} source={currentSongs[currentSongIndex].images[1]}/> 
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{currentSongs[currentSongIndex].title}</Text>
            <Text style={styles.songArtist}>{currentSongs[currentSongIndex].artists[0].name}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.dislikeButton} onPress={() => dislikeButtonOnPress()}>
            <FontAwesomeIcon icon={faX} color='#FF8282' size={40}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeButton} onPress={() => likeButtonOnPress()}>
          <FontAwesomeIcon icon={faHeart} color='#6BD645' size={40}/>
          </TouchableOpacity>
        </View>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3E6F38',
    flex: 0.18,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.8,
  },

  likeButton: {
    backgroundColor: "rgba(126, 251, 106, 0.16)",
    height: 90,
    width: 90,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"

  },
  
  dislikeButton: {
    backgroundColor: "rgba(255, 135, 135, 0.16)",
    height: 90,
    width: 90,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"

  },

  song: {
    marginTop: 20,

  },
  
  songInfo: {
    alignItems: "flex-start",
    marginBottom: 10,
  },

  songTitle: {
    fontFamily: "Rubik-SemiBold",
    color: "#3E6F38",
    fontSize: 26,
    marginBottom: 5,

  },

  songArtist: {
    fontFamily: "Rubik-Regular",
    color: "#6C9967",

  },

  songImage: {
    height: 300,
    width: 300,
    alignSelf: "center",
    marginVertical: 10,
  },


  putMeText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },
  onText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: '#ECF39E',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },
  headerText: {
    alignItems: 'center',
    marginTop: 25,
  },
  body: {
    backgroundColor: '#EBFFE9',
    flex: 0.82,
    alignItems: 'center',
  },
});
