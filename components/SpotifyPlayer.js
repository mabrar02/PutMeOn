import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import { FIREBASE_DB } from '../../firebaseConfig';
import {ref, get} from "firebase/database";

const SpotifyPlayer = () => {
  return (
    <View>
      <Text>SpotifyPlayer</Text>
    </View>
  )
}

export default SpotifyPlayer

const styles = StyleSheet.create({})