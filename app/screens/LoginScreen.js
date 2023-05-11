import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify'
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import { CLIENT_ID, CLIENT_SECRET } from '../../components/hidden/clientSecret';
import * as SecureStore from 'expo-secure-store';

export default LoginScreen = ({ navigation }) => {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: CLIENT_ID,
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: false,
      redirectUri: "exp://192.168.2.21:19000",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const code = response.params?.code;
      if (code) {
        exchangeAuthorizationCode(code);
      } else {
        console.log("Authorization code missing");
      }
    }
  }, [response]);

  const exchangeAuthorizationCode = async (code) => {
    try {
      const tokenEndpoint = discovery.tokenEndpoint;
      const body = {
        grant_type: "authorization_code",
        code,
        redirect_uri: "exp://192.168.2.21:19000",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET, // Provide your client secret here
      };

      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: Object.entries(body)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&"),
      });

      const data = await response.json();
      if (data.access_token) {
        const accessToken = data.access_token;
        console.log("accessToken", accessToken);
        storeAccessToken(accessToken);
        getCurrentUser(accessToken);
      } else {
        console.error("Error exchanging authorization code for access token:", data);
      }
    } catch (error) {
      console.error("Error exchanging authorization code for access token:", error);
    }
  };

  const getCurrentUser = async (access_token) => {
    if (!access_token) {
      console.log("Access token missing")
      return;
    }

    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((response) => {
        const userString = JSON.stringify(response);
        storeUserData(response);
      })
      .catch((error) => {
        console.error("Error retrieving current user:", error);
      });
  };


  const storeUserData = async (userData) => {
    await SecureStore.setItemAsync("user_id", userData.id);
    await SecureStore.setItemAsync("user_display_name", userData.display_name);
    await SecureStore.setItemAsync("user_email", userData.email);
    await SecureStore.setItemAsync("user_pfp_url", userData.images[0].url);


    console.log(userData.id + " " + userData.email + " " + userData.display_name + " " + userData.images[0].url);
    navigation.navigate("HomePage");
  }

  const storeAccessToken = async (accessToken) => {
    await SecureStore.setItemAsync("access_token", accessToken);
    console.log("stored token");
  }

  const removeAccessToken = async () => {
    await SecureStore.deleteItemAsync("access_token");
    console.log("removed");
  }

  const getAccessToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (token) {
        return token;
      } else {
        console.log('no token found');
        return null;
      }
    } catch (e) {
      console.log('failed to get token');
      return null;
    }
  }


  return (
    <View style={{flex:1}}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerText}>
            <Text style={styles.putMeText}>PutMe</Text>
            <Text style={styles.onText}>ON!</Text>
        </View>
      </SafeAreaView>

      
      <View style={styles.body}>

        <View style={{width: "75%",}}>
            <Text style={styles.bodyCaption}>It's time to put your friends ON!</Text>
        </View>


        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <FontAwesomeIcon icon={ faSpotify } size={50} color='#fff' />
            <Text style={styles.buttonText}>Login With Spotify</Text>
        </TouchableOpacity>


        <View style={{flex: 1, justifyContent: "flex-end", marginBottom: 10, width: "85%"}}>
            <Text style={styles.disclaimerText}>PutMeON is not officially affiliated with Spotify. Use with discretion.</Text>
        </View>




      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3E6F38",
        flex: 0.3,
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },

    putMeText: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 48,
        color: "#ffffff",
    },

    onText: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 48,
        color: "#ECF39E"

    },

    headerText: {
        alignItems: 'center',
        marginTop: 55,
    },

    body: {
        backgroundColor: "#EBFFE9",
        flex: 0.7,
        alignItems: "center"
    },

    bodyCaption: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 32,
        color: "#3E6F38",
        textAlign: 'center',
        marginVertical: 40,
        
    },

    button: {
        backgroundColor: "#1DB954",
        flexDirection: "row",
        width: "85%",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 8,
        borderRadius: 41,
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4},
        
    },

    buttonText: {
        color: "#fff",
        fontFamily: "Rubik-Medium",
        fontSize: 22,
        marginHorizontal: 10,
    },

    disclaimerText: {
        color: "#545454",
        opacity: 0.6,
        textAlign: "center",
        fontFamily: "Rubik-Regular",
        fontSize: 13,
    },

});