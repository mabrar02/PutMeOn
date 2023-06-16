import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, Image, Dimensions, Modal } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import * as SecureStore from 'expo-secure-store';
import TrackItem from '../../components/TrackItem';
import { BlurView } from 'expo-blur';
import { FIREBASE_DB } from '../../firebaseConfig';
import {ref, child, get, set} from 'firebase/database';

const PostScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [trackData, setTrackData] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);
  const [showBlankPrompt, setShowBlankPrompt] = useState(true);
  const [showUnknownPrompt, setShowUnknownPrompt] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [displayedArtistNames, setDisplayedArtistNames] = useState("");
  const [displayedTrackName, setDisplayedTrackName] = useState("");

  const maxLength = 27;
  const maxArtistLength = 27;

  const searchImage = require("../assets/images/search.png");
  const unknownSongImage = require("../assets/images/unknown.png");

  const confirmPost = (track) => {
    setSelectedTrack(track);
    setModalVisible(true);

    const artistNames = track.artists.map(artist => artist.name).join(', ');
    let displayedTrackTitle = track.name;
    if(displayedTrackTitle.length > maxLength){
        displayedTrackTitle = displayedTrackTitle.substring(0, maxLength - 3) + "..."
    }

    let displayedTrackArtists = artistNames;
    if(displayedTrackArtists.length > maxArtistLength){
        displayedTrackArtists = displayedTrackArtists.substring(0, maxArtistLength - 3) + "..."
    }

    setDisplayedArtistNames(displayedTrackArtists);
    setDisplayedTrackName(displayedTrackTitle);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const search = async () => {
    const token = await SecureStore.getItemAsync("access_token");

    const searchResults = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchText + "&type=track&limit=20",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.tracks?.items?.length > 0) {
          const tracks = data.tracks.items;
          setTrackData(tracks);
        } else {
          setTrackData([]);
          if(searchText.length > 0){
            setShowUnknownPrompt(true);
            console.log("could not find");
          }
          else{
            setShowBlankPrompt(true);
          }
          
        }
      })
      .catch(error => {
        console.error("Error occurred while fetching search results:", error);
      });
  };

  const clearSearchText = () => {
    Keyboard.dismiss();
    setSearchText("");
    setTrackData([]);
    setShowClearButton(false);
    setShowBlankPrompt(true);
    setShowUnknownPrompt(false);
  };

  const touchElsewhere = async () => {
    Keyboard.dismiss();
    if(searchText.length > 0){
      await search();
    }
    setShowClearButton(false);
  }

  const handleBlur = () => {
    setShowClearButton(false);
  };

  const postSong = async () => {
    await SecureStore.getItemAsync("db_key").
    then(userId => postToDatabase(userId));
    closeModal();
  }

  const postToDatabase = (profileId) => {
    const dbRef = ref(FIREBASE_DB, `users/${profileId}/Music/YourMusic/${selectedTrack.id}`);
    set(dbRef, {
        title: selectedTrack.name,
        artists: selectedTrack.artists,
        images: [selectedTrack.album.images[2], selectedTrack.album.images[1]],
        likes: 0,
        songId: selectedTrack.id,
    });
}

  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.putMeText}>PutMe</Text>
          <Text style={styles.onText}>ON!</Text>
        </View>
        <View style={styles.searchBar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color='#fff' />
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => {
              setSearchText(text);
              setShowClearButton(text.length > 0);
            }}
            value={searchText}
            inputMode='search'
            maxLength={22}
            placeholder='Put your friends on to a song!'
            placeholderTextColor="#a7a7a7"
            onSubmitEditing={search}
            onFocus={() => {
              setShowClearButton(searchText.length > 0)
              setShowBlankPrompt(false);
              setShowUnknownPrompt(false);
            }}
            onBlur={() => handleBlur()}
          />
          {showClearButton && (
            <TouchableOpacity style = {{width:20, height: 20,}} onPress={clearSearchText}>
              <FontAwesomeIcon icon={faTimes} size={20} color='#fff' />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
      <View style={styles.body}>
        {showBlankPrompt && (
          <View style={styles.blankSearchContainer}>
            <Image source={searchImage} style={styles.searchImage}/>
            <Text style={styles.caption}>Search for your favourite songs!</Text>
          </View>
        )}
        {!showBlankPrompt && !showUnknownPrompt && trackData.length < 1 && (          
        
          <TouchableWithoutFeedback style={{}} onPress={() => touchElsewhere()}>
            <View style={{width: "100%", height: "100%"}}/>
          </TouchableWithoutFeedback>
        )}

        {showUnknownPrompt && (
          <View style={styles.blankSearchContainer}>
            <Image source={unknownSongImage} style={styles.searchImage}/>
            <Text style={styles.caption}>Sorry, we couldn't find that song...</Text>
          </View>
        )}
        <FlatList
          data={trackData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TrackItem item={item} onConfirmPost={confirmPost} />}
          contentContainerStyle={styles.flatListContainer}
        />

        {selectedTrack && (
          <View>
            <Modal
              style={{ alignItems: "center", justifyContent: "center", flex: 1}}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
              >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <View style={styles.postConfirm}>
                    <TouchableOpacity style={{}} onPress={closeModal}>
                      <FontAwesomeIcon icon={faChevronLeft} size={30} color='#A6A6A6'/>
                    </TouchableOpacity>
                    <View style={{alignItems: "center", alignContent: "center", marginTop: 5}}>
                      <Text style={styles.postTitle}>Ready To Share?</Text>
                      <Image source={selectedTrack.album.images[1]} style={styles.postImage}/>
                      <View style={{width: 200,}}>
                       <Text style={[styles.postTitle, {fontSize: 15}]}>{displayedTrackName}</Text>
                       <Text style={styles.postArtists}>{displayedArtistNames}</Text>
                      </View>
                      <TouchableOpacity style={{marginTop: 20}} onPress={postSong}>
                        <FontAwesomeIcon icon={faArrowRightToBracket} size={40} color='#A6A6A6'/>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>

            </Modal>
          </View>
        )}
      </View>

      {modalVisible && (
          <BlurView intensity={35} style={StyleSheet.absoluteFill} tint='dark'/>
        )}
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3E6F38",
    flex: 1,
    alignItems: "center",
  },

  postImage: {
    resizeMode: "contain",
    height: 200,
    width: 200,
    borderWidth: 2,
    margin: 10,
    alignSelf: "center"
  },
  
  postTitle: {
    fontFamily: "Rubik-SemiBold",
    color: "#3E6F38",
    fontSize: 30,
  },

  postArtists: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#818181",
  },

  postConfirm: {
    bottom: 50,
    width: Dimensions.get("window").width * 0.8,
    height: 425,
    backgroundColor: "#EBFFE9",
    borderRadius: 20,
    padding: 10,
  },


  putMeText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },

  onText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ECF39E",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },

  headerText: {
    alignItems: 'center',
    marginTop: 25,
  },

  body: {
    backgroundColor: "#EBFFE9",
    flex: 3,
    alignItems: "center",
  },

  searchBar: {
    backgroundColor: "#A9D2A4",
    marginTop: 20,
    padding: 5,
    width: "80%",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 2,
  },

  searchInput: {
    marginHorizontal: 10,
    width: "100%",
    height: "100%",
    fontFamily: "Rubik-Regular",
    flex: 1,
  },

  searchImage: {
    resizeMode: "contain",
    width: 250,
    height: 250,
    marginTop: 40,
    marginBottom: 20,
  },

  blankSearchContainer: {
    alignContent: "center",
    alignItems: "center",
  },

  caption: {
    fontFamily: "Rubik-SemiBold",
    color: "#3E6F38",
    fontSize: 20,
  },

  flatListContainer : {
    paddingBottom: 120,
  }


});
