import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../../screen/NotImplementedScreen";
import Doctors from "./Doctors";
import Settings from "./Settings";
import Donations from "./Donations";
import DoctorScores from "./DoctorScores";
import Patients from "./Patients";
import { Ionicons } from "@expo/vector-icons";

const AdminNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Doctors"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Doctors") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Patients") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Scores") {
            iconName = focused ? "star" : "star-outline";
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
        name="Doctors"
        component={Doctors}
        options={{ title: "Doctors" }}
      />
      <Tab.Screen
        name="Patients"
        component={Patients}
        options={{ title: "Patients" }}
      />
      <Tab.Screen
        name="Scores"
        component={DoctorScores}
        options={{ title: "Scores" }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigator;
