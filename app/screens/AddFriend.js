import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, Image, Dimensions, Modal, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import TestFriends from '../../components/TestFriends';
import FriendComponent from '../../components/FriendComponent';
import * as SecureStore from 'expo-secure-store';
import { ref, child, query, orderByChild, onValue, equalTo, get, set } from 'firebase/database';
import { FIREBASE_DB } from '../../firebaseConfig';



const AddFriend = ({navigation}) => {
  const [searchText, setSearchText] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [existingFriends, setExistingFriends] = useState([]);


const search = async () => {
  if (searchText.length > 0) {
    const dbRef = ref(FIREBASE_DB, "users");
    const searchQuery = query(dbRef, orderByChild("displayName"));
    const snapshot = await get(searchQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const search = Object.entries(data).map(([key, user]) => ({
        ...user,
        userId: key, 
      })).filter(user =>
        (user.displayName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.username.toLowerCase().includes(searchText.toLowerCase()))
        && !existingFriends.includes(user.userId)
      );
      setSearchResults(search);
      console.log(search);
    } else {
      setSearchResults([]);
    }
  } 
  else{
    setSearchResults([]);
  }
};

    useEffect(() => {
      fetchRequestExclusions();
    }, []);


    const fetchRequestExclusions = async () => {
      const key = await SecureStore.getItemAsync("db_key");
      const dbRef = ref(FIREBASE_DB, `users/${key}/Friends/Added`);
      const snapshot = await get(dbRef);

      if(snapshot.exists()){
        setExistingFriends(Object.keys(snapshot.val()));
      }

      setExistingFriends(prevFriends => [...prevFriends, key]);
    };

    const addFriends = (friendId, friendInfo) => {
      Alert.alert(
        'Add Friend',
        `Add ${friendInfo.displayName} as a friend?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Confirm', style: "default", onPress: (() => confirmAdd(friendId))}
        ],
        {cancelable: true}
      )
    }

    const confirmAdd = async (id) => {
      const userId = await SecureStore.getItemAsync("db_key");
      const username = await SecureStore.getItemAsync("user_id");
      const displayName = await SecureStore.getItemAsync("user_display_name");
      const image = await SecureStore.getItemAsync("user_pfp_url");

      const friendRef = ref(FIREBASE_DB, `users/${id}/Friends/Requests/${userId}`);
      set(friendRef, {
        displayName: displayName,
        username: username,
        image: image,
        userId: userId,
    });
    }


  const clearSearchText = () => {
    setSearchText("");
    setShowClearButton(false);
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

  const swapToFriendsMain = () => {
    Keyboard.dismiss();
    navigation.navigate("FriendsSreen");
  }


  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.putMeText}>PutMe</Text>
          <Text style={styles.onText}>ON!</Text>
        </View>
        <View style={{flexDirection: "row",}}>
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
                    placeholder='Find your friends!'
                    placeholderTextColor="#a7a7a7"
                    onSubmitEditing={search}
                    onFocus={() => {
                    setShowClearButton(searchText.length > 0)
                    }}
                    onBlur={() => handleBlur()}
                />
                {showClearButton && (
                    <TouchableOpacity style = {{width:20, height: 20,}} onPress={clearSearchText}>
                    <FontAwesomeIcon icon={faTimes} size={20} color='#fff' />
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity style={{marginTop: 20, alignItems: "center", justifyContent: "center", marginLeft: 20,}} onPress={() => swapToFriendsMain()}>
                <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>

        </View>

      </SafeAreaView>
      <View style={styles.body}>
        <FlatList
        data={searchResults}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <FriendComponent item={item} adding={true} requesting={false} onConfirmAdd={addFriends}/>}
        contentContainerStyle={styles.flatListContainer} 
        />

        {/* <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.displayName}</Text>
            <Text>{item.username}</Text>
          </View>

        )}/> */}

      </View>
    </View>
  );
};

export default AddFriend;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3E6F38",
    flex: 1,
    alignItems: "center",
  },

  cancelButton: {
    fontFamily: "Rubik-Medium",
    fontSize: 17,
    color: "#fff",
  },

  flatListContainer : {
    paddingBottom: 175,
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
    width: "70%",
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
