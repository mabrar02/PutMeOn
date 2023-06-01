import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import FriendComponent from '../../components/FriendComponent';
import TestFriends from '../../components/TestFriends';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import RequestList from './RequestList';
import FriendsList from './FriendsList';

const Tab = createBottomTabNavigator();
const Tab2 = createMaterialTopTabNavigator();

export default FriendsScreen = () => {
  return (
<View style={{ flex: 1 }}>
  <SafeAreaView style={styles.header}>
    <View style={styles.headerText}>
      <Text style={styles.putMeText}>PutMe</Text>
      <Text style={styles.onText}>ON!</Text>
    </View>
  </SafeAreaView>

  <View style={{ flex: 0.82, backgroundColor: "#EBFFE9"}}>
    <View style={{alignItems: "center"}}>
      <TouchableOpacity style={styles.addFriendButton}>
        <Text style={styles.addFriendText}>Add Friend</Text>
        <FontAwesomeIcon icon={faUserPlus} size={20} color='#707070'/>
      </TouchableOpacity>
    </View>

    <Tab2.Navigator
    tabBarPosition='bottom'
    screenOptions={{
      headerShown: false,
      tabBarStyle: [styles.tabBar, {alignContent: "center"}],
      tabBarShowIcon: false,
      tabBarIndicatorStyle: styles.indicator,
      tabBarIndicatorContainerStyle: styles.indicatorContainer,
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#898989",
      tabBarLabelStyle: styles.tabLabel
  
    }}
    >
      <Tab2.Screen
        name="Friends"
        component={FriendsList}
        options={{
          tabBarIcon: ({focused}) => (
            <Text style={styles.tabLabel}>Friends</Text>
          ),
        }}
      />
      <Tab2.Screen
        name="Requests"
        component={RequestList}
        options={{
          tabBarIcon: ({focused}) => (
            <Text style={styles.tabLabel}>Requests</Text>
          ),
        }}
      />
    </Tab2.Navigator>
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

  indicator: {
    backgroundColor: "#898989",
    height: 28,
    borderRadius: 20,
    width: 90,
    left: (Dimensions.get('window').width * 0.55 / 2 - 90) / 2,
    bottom: 9,
  },

  indicatorContainer: {
    alignItems: "center"
  },


  tabBar: {
    bottom: 125,
    width: Dimensions.get("window").width * 0.55,
    alignSelf: "center",
    backgroundColor: "#515151",
    borderRadius: 40,
    height: 45,
  },
  tabLabel: {
    fontFamily: 'Rubik-Medium',
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
  alignItems: "center",
  justifyContent: "flex-start"
  },


})