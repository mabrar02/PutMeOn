import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TestMusic from '../../components/TestMusic';
import MusicComponent from '../../components/MusicComponent';

export default SavedSongs = () => {
  return (
    <View style={styles.container}>
      {/* <FlatList
      data={TestMusic}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <MusicComponent item={item} savedSongs={true}/>} 
      /> */}
      <Text style={styles.text}>Saved Songs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#EBFFE9"
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});