import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../../screen/NotImplementedScreen";
import DoctorChats from "./DoctorChats";
import ContactTab from "./DoctorSettings";

const DoctorNavigator = () => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Chats"  screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
      <Tab.Screen name="Chats" component={DoctorChats} options={{ title: 'Chats' }}/>
      <Tab.Screen name="Settings" component={ContactTab} options={{ title: 'Settings' }}/>
      {/* <Tab.Screen name="Register" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/>
      <Tab.Screen name="Setting" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/> */}
    </Tab.Navigator>
  );
};

export default DoctorNavigator;
