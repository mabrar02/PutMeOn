import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

const FriendComponent = ({item, requesting, adding}) => {
    const maxDisplayLength = 30;
    const maxEmailLength = 35;

    let shownDisplayName = item.displayName;
    if(shownDisplayName.length > maxDisplayLength){
        shownDisplayName = shownDisplayName.substring(0, maxDisplayLength-3) + "..."
    }

    let shownEmail = item.email;
    if(shownEmail.length > maxEmailLength) {
        shownEmail = shownEmail.substring(0, maxEmailLength -3) + "..."
    }

  return (
    <View style={styles.container}>
        <Image source={item.image} style={styles.friendIcon}/>
        <View style={{marginHorizontal: 8, marginVertical: 15}}>
            <Text style={styles.displayName}>{shownDisplayName}</Text>
            <Text style={styles.email}>{shownEmail}</Text>
        </View>
        
        <View style={styles.rightSideContainer}>
            {requesting && (
                <TouchableOpacity style={styles.requestButton}>
                    <Text style={styles.buttonText}>Accept?</Text>
                </TouchableOpacity>
            )}
            {!adding && (
                <TouchableOpacity style={styles.timesButton}>
                    <FontAwesomeIcon icon={faTimes} size={20} color='#949494'/>
                </TouchableOpacity>
            )}
            {adding && (
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            )}

        </View>

    </View>
  )
}

export default FriendComponent

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width*0.9,
        height: 80,
        backgroundColor: "#D1E1CF",
        marginVertical: 10,
        flex: 1,
        flexDirection: "row",
        borderRadius: 50,
    },

    addButton: {
        width: 80,
        height: 30,
        borderRadius: 50,
        backgroundColor: "#636363",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
    },
    
    requestButton: {
        width: 80,
        height: 30,
        borderRadius: 50,
        backgroundColor: "#636363",
        alignItems: "center",
        justifyContent: "center"
    },
    
    buttonText: {
        fontFamily: "Rubik-Regular",
        color: "#fff"
    },

    rightSideContainer: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        
    },

    displayName: {
        fontFamily: "Rubik-Medium",
        color: "#515151",
        fontSize: 15,
    },

    email: {
        fontFamily: "Rubik-Regular",
        color: "#919191",
        fontSize: 12,
        marginTop: 4,
    },


    friendIcon: {
        margin: 5,
        resizeMode: "contain",
        height: 70,
        width: 70,
        alignSelf: "center",
        borderRadius: 50,
    },

    timesButton: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    }
})