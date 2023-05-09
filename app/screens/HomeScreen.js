import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1, alignItems:'center', alignContent:"center", justifyContent:"center"}}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})