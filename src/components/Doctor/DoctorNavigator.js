import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../../screen/NotImplementedScreen";
import DoctorChats from "./DoctorChats";
import ContactTab from "./DoctorSettings";
import { Ionicons } from "@expo/vector-icons";

const DoctorNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Chats") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          // Return the corresponding icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Chats"
        component={DoctorChats}
        options={{ title: "Chats" }}
      />
      <Tab.Screen
        name="Settings"
        component={ContactTab}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
};

export default DoctorNavigator;
