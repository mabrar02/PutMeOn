import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import {faPlayCircle} from '@fortawesome/free-regular-svg-icons/faPlayCircle'
import {faPauseCircle} from '@fortawesome/free-regular-svg-icons/faPauseCircle'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FIREBASE_DB } from '../../firebaseConfig';
import { ref, child, get, remove, onValue, set, update } from 'firebase/database';
import Swiper from "react-native-deck-swiper";
import MusicSwipeable from '../../components/MusicSwipeable';
import Toast from 'react-native-toast-message';
import { Audio } from 'expo-av';

export default HomeScreen = ({ navigation }) => {
  const [allSongs, setAllSongs] = useState([]);
  const [currentSongs, setCurrentSongs] = useState([]);
  const [currentUsersSongsIndex, setCurrentUsersSongsIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentRecUser, setCurrentRecUser] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);

  const [songObjects, setAllSongObjects] = useState([]);
  const [excludedSongs, setExcludedSongs] = useState([]);
  const [paused, setPaused] = useState(true);
  const [noMoreSongs, setNoMoreSongs] = useState(false);
  const swiperRef = useRef(null);
  const playingSongRef = useRef(playingSong);

  useFocusEffect(
    React.useCallback(() => {
      refreshHomePage();

      return () => {
        if(playingSongRef.current){
          unloadSongEnd(playingSongRef.current);
        }
      };
    }, [])
  );

  const unloadSongEnd = async (song) => {
    await song.stopAsync();
    await song.unloadAsync();
  }

  useEffect(() => {
    playingSongRef.current = playingSong;
  }, [playingSong]);

  const refreshHomePage = async () => {
    setAllSongs([]);
    setCurrentSongs([]);
    setCurrentUsersSongsIndex(0);
    setCurrentSongIndex(0);
    setCurrentRecUser(null);
    setAllSongObjects([]);
    setExcludedSongs([]);
    setPlayingSong(null);
    setPaused(true);
    setNoMoreSongs(false);
    await getFriends();
  };



  const getFriends = async () => {
    setAllSongs([]);
    setCurrentSongs([]);
    setCurrentUsersSongsIndex(0);
    setCurrentSongIndex(0);
    setCurrentRecUser(null);
    setAllSongObjects([]);
    setExcludedSongs([]);
    
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
        
        if(Object.keys(filteredSongData).length == 0){
          return null;
        }
        else{
          console.log(Object.keys(filteredSongData));
          newExclusions = newExclusions.concat(Object.keys(filteredSongData));
          return { user: friend, songs: filteredSongData };
        }
      } else {
        return null;
      }
    });

  
    const friendSongs = await Promise.all(songsPromises);
    const filteredFriendSongs = friendSongs.filter((friend) => friend !== null && friend.songs !== null);

    console.log(filteredFriendSongs);
    if(filteredFriendSongs.length > 0){
      setAllSongs(filteredFriendSongs);
      setCurrentSongs(Object.values(filteredFriendSongs[0].songs));
      setCurrentRecUser(filteredFriendSongs[0].user);
      setAllSongObjects(filteredFriendSongs.flatMap((friend) => Object.values(friend.songs)));
    }

  };

  const saveToDatabase = async () => {
    const dbRef = await SecureStore.getItemAsync("db_key");
    const friendRef = ref(FIREBASE_DB, `users/${currentRecUser}`);
    const friendSnapshot = await get(friendRef);

    const friend = friendSnapshot.val();
    const songToSave = currentSongs[currentSongIndex];
    const increasedLikes = songToSave.likes + 1;


    const savedSongsRef = ref(FIREBASE_DB, `users/${dbRef}/Music/SavedSongs/${songToSave.songId}`);
    if(savedSongsRef){
      set(savedSongsRef, {
        title: songToSave.title,
        artists: songToSave.artists,
        images: songToSave.images,
        putOnBy: friend.displayName,
        songId: songToSave.songId,
      });

    }
    else{
      console.log("errror with saving song");
    }


    const updateSongRef = ref(FIREBASE_DB, `users/${currentRecUser}/Music/YourMusic/${songToSave.songId}`);
    get(updateSongRef).then((snapshot) => {
      if(snapshot.exists()){
        update(updateSongRef, {
          likes: increasedLikes,
        });
      }
      else{
        console.log("error with updating song");
      }
    })

  }

  const dislikeToDatabase = async () => {
    const dbRef = await SecureStore.getItemAsync("db_key");
    const songToSave = currentSongs[currentSongIndex];


    const savedSongsRef = ref(FIREBASE_DB, `users/${dbRef}/Music/DislikedSongs/${songToSave.songId}`);
    set(savedSongsRef, {
        title: songToSave.title,
    });
  }
  

  const dislikeButtonOnPress = () => {
    swiperRef.current.swipeLeft();
  }

  const likeButtonOnPress = () => {
    swiperRef.current.swipeRight();
  }

  const like = () => {
    console.log("like");
    saveToDatabase();
    nextSong();
  }

  const dislike = () => {
    console.log("like");
    dislikeToDatabase();
    nextSong();
  }

  const unloadSong = async () => {
    await playingSong.stopAsync();
    await playingSong.unloadAsync();
    setPlayingSong(null);
    setPaused(true);
  }

  const nextSong = () => {
    if(playingSong) {
      unloadSong();
    }

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
      setCurrentRecUser(allSongs[currentUsersSongsIndex+1].user);
    }
    else{
      setNoMoreSongs(true);
    }
  }

  const fetchPlaySong = async () => {
    if(playingSong == null){
      console.log(currentSongs[currentSongIndex].songId);
      const token = await SecureStore.getItemAsync("access_token");
      const result = await fetch(`https://api.spotify.com/v1/tracks/${currentSongs[currentSongIndex].songId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      ).then(res => res.json());
  
      const sound = new Audio.Sound();
  
      await sound.loadAsync({
        uri: result.preview_url
      });

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.replayAsync();
        }
      });
  
      setPlayingSong(sound);
      await sound.playAsync();
      setPaused(false);
    }
    else{
      console.log("Song already playing");
    }
  }

  const playSong = async () => {
    if (playingSong == null) {
      await fetchPlaySong();
    } else {

      if (!paused) {
        console.log(playingSong._loaded);
        playingSong.pauseAsync().then(() => {
          setPaused(true);
        });
      } else {
        console.log(playingSong._loaded);
        playingSong.playAsync().then(() => {
          setPaused(false);
        });
      }
    }
  };

  const noMoreCards = () => {
    return (
      <View>
        <Text>No more songs!</Text>
      </View>
    )
  }
  

  return (
    <View style={{ flex: 1, backgroundColor: '#EBFFE9'}}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.putMeText}>PutMe</Text>
          <Text style={styles.onText}>ON!</Text>
        </View>
      </SafeAreaView>
      {(allSongs.length != 0 && currentSongs.length != 0 && songObjects.length != 0 && !noMoreSongs) && (
      <View style={[styles.body]}>
        <View style={{flex: 0.8, justifyContent: "center", alignItems: "center"}}> 

          <Swiper cards={songObjects} animateCardOpacity={true} ref={swiperRef} renderCard={(card) => <MusicSwipeable item={card}/>} backgroundColor='#EBFFE9'
          stackSize={2} cardIndex={0} verticalSwipe={false} onSwipedRight={() => like()} onSwipedLeft={() => dislike()}
          />

        </View>
        <View style={[styles.buttonsContainer, {marginVertical: 20,}]}>
          <TouchableOpacity style={styles.dislikeButton} onPress={() => dislikeButtonOnPress()}>
            <FontAwesomeIcon icon={faX} color='#FF8282' size={40}/>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: "center", justifyContent: "center"}} onPress={() => playSong()}>
            {(paused) && <FontAwesomeIcon icon={faPlayCircle} color='#6D6D6D' size={70}/>}
            {(!paused) && <FontAwesomeIcon icon={faPauseCircle} color='#6D6D6D' size={70}/>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeButton} onPress={() => likeButtonOnPress()}>
            <FontAwesomeIcon icon={faHeart} color='#6BD645' size={40}/>
          </TouchableOpacity>
        </View>
      </View>
      )}

      {(allSongs.length == 0 || currentSongs.length == 0 || songObjects.length == 0 || noMoreSongs)  && (
        <View style={styles.body}>
          <View style={{alignSelf: "center", alignItems: "center", justifyContent:"center", alignContent: "center", top: 150, width: (Dimensions.get("window").width * 0.8)}}> 
            <Text style={styles.emptylistText}>No new songs to be put on to!</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3E6F38',
    flex: 0.16,
  },

  emptylistText: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: '#A7A7A7',
    textAlign: "center"
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.8,
    alignSelf: "center"
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

  },
  
  songInfo: {
    alignItems: "flex-start",
    marginBottom: 10,
    width: 300,
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
    flex: 0.84,
  },
});
