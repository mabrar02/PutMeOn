import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import * as SecureStore from 'expo-secure-store';
import TrackItem from '../../components/TrackItem';

const PostScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [trackData, setTrackData] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);
  const [showBlankPrompt, setShowBlankPrompt] = useState(true);
  const [showUnknownPrompt, setShowUnknownPrompt] = useState(false);

  const searchImage = require("../assets/images/search.png");
  const unknownSongImage = require("../assets/images/unknown.png");

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

  return (
    <View style={{ flex: 1 }}>
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
          renderItem={({ item }) => <TrackItem item={item} />}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
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
