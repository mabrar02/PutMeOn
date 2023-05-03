
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import {React, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSpotify} from '@fortawesome/free-brands-svg-icons/faSpotify'
import {ResponseType, useAuthRequest} from 'expo-auth-session';
import {CLIENT_ID, CLIENT_SECRET} from '../../components/hidden/clientSecret';


export default LoginScreen = () => {


    const discovery = {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        tokenEndpoint: "https://accounts.spotify.com/api/token",
    };

    const [request, response, promptAsync] = useAuthRequest({
        ResponseType: ResponseType.Token,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        scopes: [
            "user-read-currentl-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "streaming",
            "user-read-email",
            "user-read-private",
        ],
        usePKCE: false,
        redirectURI: "exp://192.168.2.21:19000",

    }, discovery);






  return (
    <View>
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


        <TouchableOpacity style={styles.button}>
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