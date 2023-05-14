import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
import NotImplementedScreen from "../../screen/NotImplementedScreen";
import DoctorCategoriesForPatient from "./DoctorCategoriesForPatient";
import DoctorsList from "./DoctorsList";

const PatientBottomNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="DoctorsList"  screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
      <Tab.Screen name="DoctorCategoriesForPatient" component={DoctorCategoriesForPatient} options={{ title: 'Catogories' }}/>
      <Tab.Screen name="DoctorsList" component={DoctorsList} options={{ title: 'Chats' }}/>
      {/* <Tab.Screen name="Register" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/>
      <Tab.Screen name="Setting" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/> */}
    </Tab.Navigator>
  );
};

export default PatientBottomNavigator;
