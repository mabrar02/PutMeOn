import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FriendsScreen from './FriendsScreen';
import AddFriend from './AddFriend';

export default FriendsModule = ({}) => {

const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="FriendsSreen" component={FriendsScreen}/>
        <Stack.Screen name="AddFriend" component={AddFriend} options={{
            animation: "slide_from_bottom"
        }}/>
    </Stack.Navigator>
  )
}



const styles = StyleSheet.create({})