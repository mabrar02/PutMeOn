import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import FriendComponent from '../../components/FriendComponent';
import TestFriends from '../../components/TestFriends';

export default FriendsList = () => {
  return (
    <View style={styles.body}>
    <TouchableOpacity style={styles.addFriendButton}>
      <Text style={styles.addFriendText}>Add Friend</Text>
      <FontAwesomeIcon icon={faUserPlus} size={20} color='#707070'/>
    </TouchableOpacity>

    <FlatList
    data={TestFriends}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => <FriendComponent item={item} adding={false} requesting={false}/>}
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
    flex: 2,
    alignItems: "center",
    },
  
  
  })