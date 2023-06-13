import { Dimensions, StyleSheet, Text, View, Image, Alert } from 'react-native';
import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default MusicComponent = ({ item, savedSongs, onDelete, onAdd }) => {
  const artistNames = item.artists.map((artist) => artist.name).join(', ');
  const maxLength = 25;
  const maxArtistLength = 30;
  const screenWidth = Dimensions.get('window').width;
  let displayedTrackTitle = item.title;
  if (displayedTrackTitle.length > maxLength) {
    displayedTrackTitle = displayedTrackTitle.substring(0, maxLength - 3) + '...';
  }

  let displayedTrackArtists = artistNames;
  if (displayedTrackArtists.length > maxArtistLength) {
    displayedTrackArtists = displayedTrackArtists.substring(0, maxArtistLength - 3) + '...';
  }

  const translateXThreshold = -screenWidth * 0.3;
  const maxSwipeAmount = -screenWidth * 0.4; 


  const translateX = useSharedValue(0);
  const translateY = useSharedValue(80);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const handleSwipeComplete = () => {
    translateX.value = withTiming(-screenWidth);
    translateY.value = withTiming(0);
  };

  const handleDeleteConfirmation = () => {
    Alert.alert(
      'Delete Song',
      'Are you sure you want to delete this song?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            translateX.value = withTiming(0);
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            translateX.value = withTiming(-screenWidth, undefined);
            translateY.value = withTiming(0);
            marginVertical.value = withTiming(0);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event) => {
      if (event.translationX >= 0) {
        translateX.value = 0; 
      } else if (event.translationX >= maxSwipeAmount) {
        translateX.value = event.translationX; 
      } else {
        translateX.value = maxSwipeAmount; 
      }
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < translateXThreshold;

      if (shouldBeDismissed) {
        runOnJS(handleDeleteConfirmation)();
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rDelete = useAnimatedStyle(() => {
    return {
      height: translateY.value,
    }
  })


const rContainerStyle = useAnimatedStyle(() => {
  return {
    height: translateY.value,
    marginVertical: marginVertical.value
  }
})

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
        <Animated.View style={[styles.deleteContainer, rDelete]}>
          <FontAwesomeIcon icon={faTrashCan} size={40} color='#fff'/>
        </Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[{flex: 1, flexDirection: "row", backgroundColor: "#515151",},rStyle]}>

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
            </Animated.View>
        </PanGestureHandler>


    </Animated.View>


  )
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 80,
        flex: 1,
        flexDirection: "row",
    },

    deleteContainer: {
      height: 80,
      width: Dimensions.get('window').width * 0.4,
      backgroundColor: '#F06363',
      position: 'absolute',
      right: 0,
      alignItems: "center",
      justifyContent: "center"
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