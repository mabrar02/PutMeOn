import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { revokeAsync } from "expo-auth-session";
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import { FIREBASE_DB } from '../../firebaseConfig';
import { ref, child, get, remove, onValue } from 'firebase/database';


const SettingsScreen = ({navigation}) => {

  const [displayName, setDisplayName] = useState('');
  const [pfpUrl, setPfpUrl] = useState("https://img.freepik.com/free-icon/user_318-804790.jpg");
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    await SecureStore.getItemAsync('user_display_name')
    .then(name => setDisplayName(name));

    await SecureStore.getItemAsync('user_pfp_url')
    .then(url => {
      if(url != "none"){
        setPfpUrl(url)
      }
      });

    await SecureStore.getItemAsync('user_id')
    .then(userName => setUserName(userName));

  };



  const clearData = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("token_expire");
    await SecureStore.deleteItemAsync("user_id");
    await SecureStore.deleteItemAsync("user_pfp_url");
    await SecureStore.deleteItemAsync("user_display_name");
  }


  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', style: 'destructive', onPress: logout}
      ],
      {cancelable: true}
    )
  }

  const confirmReset = () => {
    Alert.alert(
      'Reset Songs',
      "Are you sure you want to reset your seen songs? This means any songs you've disliked can be recommended to you again.",
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Reset', style: 'destructive', onPress: reset}
      ],
      {cancelable: true}
    )
  }

  const reset = async () => {
    const dbRef = await SecureStore.getItemAsync("db_key");
    const removeSong = ref(FIREBASE_DB, `users/${dbRef}/Music/DislikedSongs`);
    remove(removeSong);
  }

  const logout = async () => {
    const accessTok = await SecureStore.getItemAsync("access_token");
    const discovery = {
      revocationEndpoint: "https://accounts.spotify.com/api/token",
    };
    await revokeAsync({
      token: accessTok,
    }, discovery);
    clearData();
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    }));
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', alignContent: 'center', backgroundColor: '#EBFFE9' }}>
      <View style={{ flex: 0.5 }}>
        <Image style={styles.profilePic} source={{ uri: pfpUrl }} />
        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.userName}>@{userName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => confirmLogout()}>
        <Text style={styles.buttonText}>LOGOUT</Text> 
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: "#9fd0ed"}]} onPress={() => confirmReset()}>
        <Text style={styles.buttonText}>RESET SEEN SONGS</Text> 
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsScreen

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: "Rubik-SemiBold",
        color: "#fff",
        fontSize: 24,

    },

    buttonStyle: {
        width: Dimensions.get('window').width,
        height: 70,
        backgroundColor: "#F06363",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },

    profilePic: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 2,
        alignSelf: "center"
    },

    displayName: {
        fontFamily: "Rubik-SemiBold",
        color: "#3E6F38",
        fontSize: 32,
        alignSelf: "center",
        marginBottom: 5,

    },

    userName: {
      fontFamily: "Rubik-Regular",
      color: "#6C9967",

    },

})