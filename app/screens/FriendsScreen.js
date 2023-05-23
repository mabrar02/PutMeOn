import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import FriendComponent from '../../components/FriendComponent';
import TestFriends from '../../components/TestFriends';

export default FriendsScreen = () => {
  return (
    <View style={{flex:1}}>
        <SafeAreaView style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.putMeText}>PutMe</Text>
            <Text style={styles.onText}>ON!</Text>
          </View>
      </SafeAreaView>
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
    </View>
  )
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3E6F38",
    flex: 0.18,
  },

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

  putMeText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4},
  },

onText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ECF39E",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4},

  },

headerText: {
    alignItems: 'center',
    marginTop: 25,
  },

body: {
  backgroundColor: "#EBFFE9",
  flex: 0.82,
  alignItems: "center"
  },


})