import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';

export default HomeScreen = ({navigation}) => {

  return (
    <View style={{flex:1}}>
        <SafeAreaView style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.putMeText}>PutMe</Text>
            <Text style={styles.onText}>ON!</Text>
          </View>
      </SafeAreaView>
      <View style={styles.body}>

      </View>
    </View>
  )
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3E6F38",
    flex: 0.18,
  },

  putMeText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4},
  },

onText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ECF39E",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4},

  },

headerText: {
    alignItems: 'center',
    marginTop: 25,
  },

body: {
  backgroundColor: "#EBFFE9",
  flex: 0.82,
  alignItems: "center"
  },
  

})