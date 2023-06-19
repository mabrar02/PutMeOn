import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

export default MusicSwipeable = ({item}) => {
  return (
    <View style={{width: 300, alignSelf: "center", bottom: 40,}}>
        <View style={styles.song}> 
          <Image style={styles.songImage} source={item.images[1]}/> 
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>{item.artists[0].name}</Text>
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
      fontSize: 26,
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