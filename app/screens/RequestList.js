import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import FriendComponent from '../../components/FriendComponent';
import TestFriends from '../../components/TestFriends';
import * as SecureStore from 'expo-secure-store';
import { ref, child, query, orderByChild, onValue, equalTo, get, set, remove } from 'firebase/database';
import { FIREBASE_DB } from '../../firebaseConfig';

export default RequestList = () => {
  const [friends, setFriends] = useState([]);
  const [isDatabaseEmpty, setDatabaseEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dbKey = await SecureStore.getItemAsync('db_key');
      const dbRef = ref(FIREBASE_DB, `users/${dbKey}/Friends/Requests`);

      const listener = onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const friendList = Object.values(data);
          setFriends(friendList);
          setDatabaseEmpty(false);
        } else {
          setFriends([])
          setDatabaseEmpty(true);
        }
      });

      return () => {
        
        listener();
      };
    };

    fetchData();
  }, []);

  const acceptRequest = async (id, userInfo) => {


    const userId = await SecureStore.getItemAsync("db_key");
    const username = await SecureStore.getItemAsync("user_id");
    const displayName = await SecureStore.getItemAsync("user_display_name");
    const image = await SecureStore.getItemAsync("user_pfp_url");

    const userRef = ref(FIREBASE_DB, `users/${userId}/Friends/Added/${id}`)
    set(userRef, {
      displayName: userInfo.displayName,
      username: userInfo.username,
      image: userInfo.image,
    })

    const friendRef = ref(FIREBASE_DB, `users/${id}/Friends/Added/${userId}`);
    set(friendRef, {
      displayName: displayName,
      username: username,
      image: image,
  });

  const removeReqRef = ref(FIREBASE_DB, `users/${userId}/Friends/Requests/${id}`);
  remove(removeReqRef);
  }

  return (
    <View style={styles.body}>
    <FlatList
    data={friends}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => <FriendComponent item={item} adding={false} requesting={true} onConfirmRequest={acceptRequest}/>}
    contentContainerStyle={styles.flatListContainer} 
    />
  </View>
  )
};

const styles = StyleSheet.create({
  
    addFriendButton: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginVertical: 10,
    },
  
    addFriendText: {
      fontFamily: "Rubik-Medium",
      color: "#707070",
      marginHorizontal: 10,
      alignContent: "flex-end"
    },


  body: {
    backgroundColor: "#EBFFE9",
    flex: 1,
    alignItems: "center",
    },

    flatListContainer : {
      paddingBottom: 175,
    }
  
  
  })