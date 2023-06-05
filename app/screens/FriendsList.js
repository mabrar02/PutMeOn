import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import FriendComponent from '../../components/FriendComponent';
import TestFriends from '../../components/TestFriends';
import * as SecureStore from 'expo-secure-store';
import { ref, child, query, orderByChild, onValue, equalTo, get, set, remove } from 'firebase/database';
import { FIREBASE_DB } from '../../firebaseConfig';

export default FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [isDatabaseEmpty, setDatabaseEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dbKey = await SecureStore.getItemAsync('db_key');
      const dbRef = ref(FIREBASE_DB, `users/${dbKey}/Friends/Added`);

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
  return (
    <View style={styles.body}>


    <FlatList
    data={friends}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => <FriendComponent item={item} adding={false} requesting={false}/>}
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