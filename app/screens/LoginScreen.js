
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import {React, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSpotify} from '@fortawesome/free-brands-svg-icons/faSpotify'
import {ResponseType, useAuthRequest} from 'expo-auth-session';
import {CLIENT_ID, CLIENT_SECRET} from '../../components/hidden/clientSecret';
import * as SecureStore from 'expo-secure-store';


export default LoginScreen = ({navigation}) => {


    const discovery = {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        tokenEndpoint: "https://accounts.spotify.com/api/token",
    };

    const [request, response, promptAsync] = useAuthRequest({
        ResponseType: ResponseType.Token,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
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

    }, discovery);

    useEffect(() => {

        if(response?.type === "success"){
            const access_token = Object.values(response.params)[0];
            console.log('accessToken', access_token);
            storeAccessToken(access_token);
        }

    }, [response]);

    const storeAccessToken = async(accessToken) => {
        await SecureStore.setItemAsync("access_token", accessToken);
        console.log("stored token");
        navigation.navigate("HomeScreen");
    }

    const removeAccessToken = async() => {
        await SecureStore.deleteItemAsync("access_token");
        console.log("removed");
    }

    const getAccessToken = async () => {
        try{
            const token = await SecureStore.getItemAsync("access_token");
            if(token) {
                return token;
            } else{
                console.log('no token found');
                return null;
            }
        } catch (e){
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