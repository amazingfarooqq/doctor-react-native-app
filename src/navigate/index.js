import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screen/ChatScreen';
import ChatsScreen from '../screen/ChatsScreen';
import MainTabNavigator from './MainTabNavigator';

const Navigator = () => {

    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
        <Stack.Screen name="Home" component={MainTabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator