import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import React, {useEffect} from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { CLIENT_ID, CLIENT_SECRET } from '../components/hidden/clientSecret';
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

  const storeTokenInfo = async (tokenJson) => {
    await SecureStore.setItemAsync("access_token", tokenJson.access_token);
    await SecureStore.setItemAsync("refresh_token", tokenJson.refresh_token);
    const tokenExpireTime = new Date().getTime + tokenJson.expires_in * 1000;
    await SecureStore.setItemAsync("token_expire", tokenExpireTime);
  };

  const storeUserInfo = async (userData) => {
    await SecureStore.setItemAsync("user_id", userData.id);
    await SecureStore.setItemAsync("user_display_name", userData.display_name);
    await SecureStore.setItemAsync("user_email", userData.email);
    await SecureStore.setItemAsync("user_pfp_url", userData.images[0].url);
  }

  const getUserInfo = async () => {
    const expirationDate = await SecureStore.getItemAsync("token_expire");
    if(!expirationDate) {
      const expirationNumber = parseInt(expirationDate, 10);
      if(new Date().getTime() > expirationNumber){
        await refreshTokens();
      }
    }

    const token = await SecureStore.getItemAsync("access_token");

    const profile = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const profileJson = await profile.json();
    storeUserInfo(profileJson);
  };

  const checkUserInfo = async () => {
    console.log("testing");
    const expirationDate = await SecureStore.getItemAsync("token_expire");
    const expirationNumber = parseInt(expirationDate, 10);
    const userInfo = await SecureStore.getItemAsync("user_id");
    if(expirationNumber < new Date().getTime() && userInfo){
      console.log("fresh user");
    }
    else{
      getUserInfo();
    }
  }

  const refreshTokens = async () => {
    const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    const refreshResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${SecureStore.getItemAsync("refresh_token")}`,
    });

    const refreshJson = refreshResponse.json();
    storeTokenInfo(refreshJson);
    return refreshJson;
  };

  useEffect(() => {
    checkUserInfo();
  }, []);

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