import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default DeleteSong = ({item, onDeleteSong}) => {
    const deleteSong = () => {
        onDeleteSong(item.id)
    }

  return (
    <View style={{width: 200, height: 100, backgroundColor: "red"}}>
      
    </View>
  )
}


const styles = StyleSheet.create({})