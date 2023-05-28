import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
import NotImplementedScreen from "../../screen/NotImplementedScreen";
import DoctorCategoriesForPatient from "./DoctorCategoriesForPatient";
import DoctorsList from "./DoctorsList";
import { useRoute } from "@react-navigation/native";

const PatientBottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  const route = useRoute();
  const { currentLoggedInUser } = route.params;
  
  return (
    <Tab.Navigator initialRouteName="DoctorsList"  screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
      <Tab.Screen name="DoctorCategoriesForPatient" component={DoctorCategoriesForPatient} options={{ title: 'Catogories' }} initialParams={{ currentLoggedInUser }}/>
      <Tab.Screen name="DoctorsList" component={DoctorsList} options={{ title: 'Chats' }} initialParams={{ currentLoggedInUser }}/>
      <Tab.Screen name="Settings" component={NotImplementedScreen} options={{ title: 'Settings' }} initialParams={{ currentLoggedInUser }}/>
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
