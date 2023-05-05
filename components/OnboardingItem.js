import { StyleSheet, Text, View, Image, Dimensions} from 'react-native'
import React from 'react'

const OnboardingItem = ({item}) => {

    const width = Dimensions.get('window').width;



  return (
    <View style={[styles.container, {width}]}>

        <View style={styles.header}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.caption}>{item.description}</Text>
        </View>
        <Image source={item.image} style={styles.image}/>

    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,

    },

    image: {
        flex: 0.7,
        justifyContent: "center",
        alignSelf: "center",
        width: "85%",
        height: 400,
        resizeMode: 'contain',
        marginTop: 250,
    },

    title: {
        fontFamily: "Rubik-SemiBold",
        color: "#3E6F38",
        fontSize: 24,
        marginVertical: 35,
    },

    caption: {
        fontFamily: "Rubik-Regular",
        color: "#545454",
        opacity: 0.6,
        fontSize: 14,

    },

    header: {
        flex: 0.3,
        width: "70%",
        marginTop: 30,
        marginHorizontal: 28,
        position: "absolute",
    }

});