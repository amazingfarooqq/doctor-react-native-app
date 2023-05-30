import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
import NotImplementedScreen from "../../screen/NotImplementedScreen";
import DoctorCategoriesForPatient from "./DoctorCategoriesForPatient";
import DoctorsList from "./DoctorsList";
import { useRoute } from "@react-navigation/native";
import Settings from "./Settings";

const PatientBottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  const route = useRoute();
  const { currentLoggedInUser } = route.params;
  
  return (
    <Tab.Navigator 
      initialRouteName="DoctorsList"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "DoctorCategoriesForPatient") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "DoctorsList") {
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
        name="DoctorCategoriesForPatient"
        component={DoctorCategoriesForPatient}
        options={{ title: "Categories" }}
        initialParams={{ currentLoggedInUser }}
      />
      <Tab.Screen
        name="DoctorsList"
        component={DoctorsList}
        options={{ title: "Chats" }}
        initialParams={{ currentLoggedInUser }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
        initialParams={{ currentLoggedInUser }}
      />
    </Tab.Navigator>
  );
};

export default PatientBottomNavigator;
