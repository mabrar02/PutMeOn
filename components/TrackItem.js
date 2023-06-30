import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert, Modal} from 'react-native'
import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faCircleArrowUp} from '@fortawesome/free-solid-svg-icons/faCircleArrowUp'


const TrackItem = ({item, onConfirmPost, onPlaySong, onPauseSong, backgroundColor}) => {
    const [paused, setPaused] = useState(true);

    const artistNames = item.artists.map(artist => artist.name).join(', ');
    const maxLength = 27;
    const maxArtistLength = 35;


    let displayedTrackTitle = item.name;
    if(displayedTrackTitle.length > maxLength){
        displayedTrackTitle = displayedTrackTitle.substring(0, maxLength - 3) + "..."
    }

    let displayedTrackArtists = artistNames;
    if(displayedTrackArtists.length > maxArtistLength){
        displayedTrackArtists = displayedTrackArtists.substring(0, maxArtistLength - 3) + "..."
    }

    const confirmPost = () => {
        onConfirmPost(item)
    }

    const play = () => {
        const pauseState = onPlaySong(item);
        setPaused(pauseState);
    }

  return (
    <TouchableOpacity style={[styles.container, {backgroundColor}]} onPress={() => play()} activeOpacity={0.9}>
        <Image source={item.album.images[2]} style={styles.trackImage}/>
        <View style={styles.trackDetails}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.songTitle}>{displayedTrackTitle}</Text>
                {(item.explicit) && <Text style={{color: "#515151", backgroundColor: "#fff", width: 15, height: 15, textAlign: "center", fontFamily: "Rubik-Medium", marginHorizontal: 8}}>E</Text>
}
            </View>

            <Text style={styles.songArtists}>{displayedTrackArtists}</Text>
        </View>
        <TouchableOpacity style={styles.postButton} onPress={confirmPost}>
            <FontAwesomeIcon icon={faCircleArrowUp} size={40} color='#fff'/>
        </TouchableOpacity>

    </TouchableOpacity>

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