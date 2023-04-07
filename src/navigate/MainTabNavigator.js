import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../screen/ChatScreen";
import NotImplementedScreen from "../screen/NotImplementedScreen";
import { Ionicons, Entypo } from "@expo/vector-icons";

const MainTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Chats"  screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
      <Tab.Screen name="Doctors" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/>
      <Tab.Screen name="Chats" component={NotImplementedScreen} />
      <Tab.Screen name="Register" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/>
      <Tab.Screen name="Setting" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/>
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
