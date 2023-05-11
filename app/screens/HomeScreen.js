import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';

export default HomeScreen = ({navigation}) => {

  const removeAccessToken = async() => {
    await SecureStore.deleteItemAsync("access_token");
    console.log("removed");
  }

  return (
    <SafeAreaView style={{flex:1, alignItems:'center', alignContent:"center", justifyContent:"center", backgroundColor: "#EBFFE9"}}>
      <TouchableOpacity style={{width:100, height:100, backgroundColor:"blue"}} onPress={removeAccessToken}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})