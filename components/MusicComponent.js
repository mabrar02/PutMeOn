import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default MusicComponent = ({item, savedSongs}) => {
    const artistNames = item.artists;
    const maxLength = 25;
    const maxArtistLength = 30;
    let displayedTrackTitle = item.title;
    if(displayedTrackTitle.length > maxLength){
        displayedTrackTitle = displayedTrackTitle.substring(0, maxLength - 3) + "..."
    }

    let displayedTrackArtists = artistNames;
    if(displayedTrackArtists.length > maxArtistLength){
        displayedTrackArtists = displayedTrackArtists.substring(0, maxArtistLength - 3) + "..."
    }

  return (
    <View style={styles.container}>
        <Image source={item.image} style={styles.trackImage}/>
        <View style={styles.trackDetails}>
            <Text style={styles.songTitle}>{displayedTrackTitle}</Text>
            <Text style={styles.songArtists}>{displayedTrackArtists}</Text>
        </View>
        <View style={styles.extraDetails}>
            {savedSongs && (
                <View style={[styles.trackDetails, {alignItems: "flex-end"}]}>
                    <Text style={styles.songTitle}>Put On By</Text>
                    <Text style={styles.songArtists}>@{item.putOnBy}</Text>
                </View>
            )}

            {!savedSongs && (
                <View style={[styles.trackDetails, {alignItems: "flex-end"}]}>
                    <Text style={styles.songTitle}>Liked By</Text>
                    <Text style={styles.songArtists}>{item.likes} Friends</Text>
                </View>
            )}

        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 80,
        backgroundColor: "#515151",
        marginVertical: 10,
        flex: 1,
        flexDirection: "row",
    },

    extraDetails: {
        flex: 1,
        justifyContent: "flex-end",
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
        width: 60,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
    },

    trackDetails: {
        margin: 12,
    },

});