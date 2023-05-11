import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated} from "react-native";
import HomeScreen from '../app/screens/HomeScreen';
import SavedMusicScreen from "../app/screens/SavedMusicScreen";
import FriendsScreen from '../app/screens/FriendsScreen';
import SettingsScreen from '../app/screens/SettingsScreen';
import PostScreen from '../app/screens/PostScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse'
import {faMusic} from '@fortawesome/free-solid-svg-icons/faMusic'
import {faSquarePlus} from '@fortawesome/free-solid-svg-icons/faSquarePlus'
import {faUserGroup} from '@fortawesome/free-solid-svg-icons/faUserGroup'
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear'

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#D1E1CF",
            borderRadius: 15,
            height: 90,
            ... styles.shadow

        }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({focused}) => (
            <View style={{alignItems: "center", justifyContent: "center",}}>
                <FontAwesomeIcon icon={ faHouse } size={30} color={focused ? "#3E6F38" : "#515151"} />
                <Text style={[styles.tabBarText, {color: focused ? "#3E6F38" : "#515151"}]}>HOME</Text>
            </View>
        ),
      }} />
      <Tab.Screen name="Music" component={SavedMusicScreen}  options={{
        tabBarIcon: ({focused}) => (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <FontAwesomeIcon icon={ faMusic } size={30} color={focused ? "#3E6F38" : "#515151"} />
                <Text style={[styles.tabBarText, {color: focused ? "#3E6F38" : "#515151"}]}>SONGS</Text>
            </View>
        ),
      }} />
      <Tab.Screen name="Post" component={PostScreen}  options={{
        tabBarIcon: ({focused}) => (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <FontAwesomeIcon icon={ faSquarePlus } size={30} color={focused ? "#3E6F38" : "#515151"} />
                <Text style={[styles.tabBarText, {color: focused ? "#3E6F38" : "#515151"}]}>POST</Text>
            </View>
        ),
      }} />
      <Tab.Screen name="Friends" component={FriendsScreen}  options={{
        tabBarIcon: ({focused}) => (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <FontAwesomeIcon icon={ faUserGroup } size={30} color={focused ? "#3E6F38" : "#515151"} />
                <Text style={[styles.tabBarText, {color: focused ? "#3E6F38" : "#515151"}]}>FRIENDS</Text>
            </View>
        ),
      }} />
      <Tab.Screen name="Settings" component={SettingsScreen}  options={{
        tabBarIcon: ({focused}) => (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <FontAwesomeIcon icon={ faGear } size={30} color={focused ? "#3E6F38" : "#515151"} />
                <Text style={[styles.tabBarText, {color: focused ? "#3E6F38" : "#515151"}]}>SETTINGS</Text>
            </View>
        ),
      }} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },

    tabBarText: {
        fontFamily: "Rubik-Regular",
        fontSize: 10,
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 5,
    },

});