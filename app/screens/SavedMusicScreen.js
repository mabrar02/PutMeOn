import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import SavedSongs from './SavedSongs'
import YourMusic from './YourMusic'

const Tab = createMaterialTopTabNavigator();

export default function SavedMusicScreen() {
  const isFocused = useIsFocused();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.putMeText}>PutMe</Text>
          <Text style={styles.onText}>ON!</Text>
        </View>
      </SafeAreaView>
      <View style={{ flex: 0.82, backgroundColor: "#EBFFE9"}}>
        {isFocused && (
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: styles.tabLabel,
              tabBarIndicatorStyle: styles.tabIndicator,
              tabBarIndicatorContainerStyle: styles.indicatorContainer,
              tabBarStyle: { shadowOpacity: 0, width: "80%", alignSelf: "center", marginTop: 10, },
            }}
            initialRouteName='SavedSongs'
            
          >
            <Tab.Screen
              name="SavedSongs"
              component={SavedSongs}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text style={[styles.tabLabel, { color: focused ? '#515151' : '#B6B6B6' }]}>
                    Saved Songs
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="YourMusic"
              component={YourMusic}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text style={[styles.tabLabel, { color: focused ? '#515151' : '#B6B6B6' }]}>
                    Your Music
                  </Text>
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    color: '#515151',
  },
  tabIndicator: {
    backgroundColor: "#515151",
    width: 50,
    height: 2,
    left: (Dimensions.get('window').width * 0.8 / 2 - 50) / 2,
    bottom: 7,
  },
  indicatorContainer: {
    backgroundColor: "#EBFFE9",
  },
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
});
