import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import FriendComponent from '../../components/FriendComponent';
import TestFriends from '../../components/TestFriends';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import RequestList from './RequestList';
import FriendsList from './FriendsList';

const Tab = createBottomTabNavigator();

export default FriendsScreen = () => {
  return (
<View style={{ flex: 1 }}>
  <SafeAreaView style={styles.header}>
    <View style={styles.headerText}>
      <Text style={styles.putMeText}>PutMe</Text>
      <Text style={styles.onText}>ON!</Text>
    </View>
  </SafeAreaView>

  <View style={{ flex: 0.82, }}>
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: [styles.tabBar, {alignContent: "center"}],
      tabBarActiveTintColor: '#3E6F38',
      tabBarInactiveTintColor: '#707070',
      tabBarShowLabel: false,
      tabBarAllowFontScaling: true,

    }}
    >
      <Tab.Screen
        name="FriendsList"
        component={FriendsList}
        options={{
          tabBarIcon: ({focused}) => (
            <Text style={styles.tabLabel}>Friends</Text>
          ),
        }}
      />
      <Tab.Screen
        name="RequestList"
        component={RequestList}
        options={{
          tabBarStyle: {flex: 2, borderWidth: 2},
          tabBarIcon: ({focused}) => (
            <Text style={styles.tabLabel}>Requests</Text>
          ),
        }}
      />
    </Tab.Navigator>
  </View>
</View>

  )
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3E6F38",
    flex: 0.18,
  },

  tabBar: {
    backgroundColor: '#515151',
    height: 40,
    width: "50%",
    bottom: 125,
    left: "25%",
    position: "absolute",
    borderRadius: 50,
  },
  tabLabel: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    color: "#fff",
    marginHorizontal: 10,
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