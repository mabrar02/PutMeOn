import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';

const PostScreen = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.putMeText}>PutMe</Text>
            <Text style={styles.onText}>ON!</Text>
          </View>
          <View style={styles.searchBar}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color='#fff' />
            <TextInput style={styles.searchInput} inputMode='search' maxLength={22} placeholder='Put your friends on to a song!' placeholderTextColor="#a7a7a7" />
          </View>
        </SafeAreaView>
        <View style={styles.body}>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3E6F38",
    flex: 0.25,
    alignItems: "center",
  },

  putMeText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },

  onText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 30,
    color: "#ECF39E",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },

  headerText: {
    alignItems: 'center',
    marginTop: 25,
  },

  body: {
    backgroundColor: "#EBFFE9",
    flex: 0.75,
    alignItems: "center",
  },

  searchBar: {
    backgroundColor: "#A9D2A4",
    marginTop: 20,
    padding: 5,
    width: "80%",
    borderRadius: 10,
    flexDirection: "row",
  },

  searchInput: {
    marginHorizontal: 10,
    width: "100%",
    height: "100%",
    fontFamily: "Rubik-Regular",
  },
});
