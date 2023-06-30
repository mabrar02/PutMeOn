import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

export default MusicSwipeable = ({item}) => {
  const artistNames = item.artists.map((artist) => artist.name).join(', ');
  const maxLength = 46;
  const maxArtistLength = 35;

  let displayedTrackTitle = item.title;
  if (displayedTrackTitle.length > maxLength) {
    displayedTrackTitle = displayedTrackTitle.substring(0, maxLength - 3) + '...';
  }

  let displayedTrackArtists = artistNames;
  if (displayedTrackArtists.length > maxArtistLength) {
    displayedTrackArtists = displayedTrackArtists.substring(0, maxArtistLength - 3) + '...';
  }

  return (
    <View style={{width: 300, alignSelf: "center", bottom: 40,}}>
        <View style={styles.song}> 
          <Image style={styles.songImage} source={item.images[1]}/> 
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{displayedTrackTitle}</Text>
            <Text style={styles.songArtist}>{displayedTrackArtists}</Text>
          </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    song: {
        backgroundColor: "#bac7b7",
        borderRadius: 15,
        alignItems: "center",
        height: 375,
        borderWidth: 1,
        borderColor: "#9da89b"
    },
    
    songInfo: {
      alignItems: "flex-start",
      marginBottom: 10,
      width: 250,
    },
  
    songTitle: {
      fontFamily: "Rubik-SemiBold",
      color: "#3E6F38",
      fontSize: 20,
      marginBottom: 5,
  
    },
  
    songArtist: {
      fontFamily: "Rubik-Regular",
      color: "#6C9967",
  
    },
  
    songImage: {
      height: 250,
      width: 250,
      alignSelf: "center",
      marginVertical: 10,
      borderRadius: 10,
    },

  });