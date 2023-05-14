import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { revokeAsync } from "expo-auth-session";
import * as SecureStore from 'expo-secure-store';


const SettingsScreen = ({navigation}) => {

  const [displayName, setDisplayName] = useState('');
  const [pfpUrl, setPfpUrl] = useState("https://img.freepik.com/free-icon/user_318-804790.jpg");
  const [email, setEmail] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const name = await getDisplayName();
    const url = await getPfpUrl();
    const userEmail = await getUserEmail();

    setDisplayName(name);
    setPfpUrl(url);
    setEmail(userEmail);
  };

  const getUserEmail = async () => {
    return await SecureStore.getItemAsync('user_email');
  };

  const getPfpUrl = async () => {
    return await SecureStore.getItemAsync('user_pfp_url');
  };

  const getDisplayName = async () => {
    return await SecureStore.getItemAsync('user_display_name');
  };


  const clearData = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("token_expire");
    await SecureStore.deleteItemAsync("user_id");
    await SecureStore.deleteItemAsync("user_email");
    await SecureStore.deleteItemAsync("user_pfp_url");
    await SecureStore.deleteItemAsync("user_display_name");
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
    navigation.navigate("Onboarding");
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', alignContent: 'center', backgroundColor: '#EBFFE9' }}>
      <View style={{ flex: 0.5 }}>
        <Image style={styles.profilePic} source={{ uri: pfpUrl }} />
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => logout()}>
        <Text style={styles.buttonText}>LOGOUT</Text> 
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
    },

    profilePic: {
        resizeMode: "contain",
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 3
    },

    displayName: {
        fontFamily: "Rubik-SemiBold",
        color: "#3E6F38",
        fontSize: 32,

    },

    userName: {

    },

})