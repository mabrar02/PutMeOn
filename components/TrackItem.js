import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faCircleArrowUp} from '@fortawesome/free-solid-svg-icons/faCircleArrowUp'
import { FIREBASE_DB } from '../firebaseConfig';
import {ref, child, get, set} from 'firebase/database';
import * as SecureStore from 'expo-secure-store'

const TrackItem = ({item}) => {
    const artistNames = item.artists.map(artist => artist.name).join(', ');
    const maxLength = 30;
    const maxArtistLength = 35;

    let displayedTrackTitle = item.name;
    if(displayedTrackTitle.length > maxLength){
        displayedTrackTitle = displayedTrackTitle.substring(0, maxLength - 3) + "..."
    }

    let displayedTrackArtists = artistNames;
    if(displayedTrackArtists.length > maxArtistLength){
        displayedTrackArtists = displayedTrackArtists.substring(0, maxArtistLength - 3) + "..."
    }

    const postSong = async () => {
        await SecureStore.getItemAsync("user_id").
        then(userId => postToDatabase(userId));
    }

    const postToDatabase = (profileId) => {
        const dbRef = ref(FIREBASE_DB, `users/${profileId}/Music/YourMusic/${item.id}`);
        set(dbRef, {
            title: item.name,
            artists: item.artists,
            image: item.album.images[2],
            likes: 0,
        });
    }

    const confirmPost = () => {
        Alert.alert(
          'Post',
          'Are you sure you want to post: ' + item.name + ' by: ' + artistNames + '?',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Post', style: 'default', onPress: postSong}
          ],
          {cancelable: true}
        )
      }


  return (
    <View style={styles.container}>
        <Image source={item.album.images[2]} style={styles.trackImage}/>
        <View style={styles.trackDetails}>
            <Text style={styles.songTitle}>{displayedTrackTitle}</Text>
            <Text style={styles.songArtists}>{displayedTrackArtists}</Text>
        </View>
        <TouchableOpacity style={styles.postButton} onPress={() => confirmPost()}>
            <FontAwesomeIcon icon={faCircleArrowUp} size={40} color='#fff'/>
        </TouchableOpacity>
    </View>
  )
}

export default TrackItem

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 80,
        backgroundColor: "#515151",
        marginVertical: 10,
        flex: 1,
        flexDirection: "row",
    },

    songTitle : {
        fontFamily: "Rubik-Medium",
        color: "#fff",
        fontSize: 15,
    },

    songArtists : {
        fontFamily: "Rubik-Regular",
        color: "#fff",
        fontSize: 12,
        marginTop: 8,
    },

    trackImage : {
        margin: 5,
        resizeMode: "contain",
        height: 60,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
    },

    trackDetails: {
        margin: 12,
    },

    postButton : {
        height: 40,
        width: 40,
        alignSelf: "center",
        position: "absolute",
        right: 0,
        marginHorizontal: 20,
    },

});