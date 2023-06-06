import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screen/ChatScreen";
import MainTabNavigator from "./MainTabNavigator";
import HomePage from "../screen/HomePage";
import PatientRegisterForm from "../components/Patient/RegisterForm";
import DoctorRegisterForm from "../components/Doctor/RegisterForm";
import OnBoardScreen from "../screen/OnBoardScreen";
import PatientPageChats from "../components/Patient/PatientPageChats";
import PatientChat from "../components/Patient/PatientChat";
import PatientBottomNavigator from "../components/Patient/PatientBottomNavigator";
import DoctorNavigator from "../components/Doctor/DoctorNavigator";
import DoctorTermsAndConditions from "../components/Doctor/DoctorTermsAndConditions";
import AdminNavigator from "../components/Admin/AdminNavigator";
import DoctorChat from "../components/Doctor/DoctorChat";
import EmergencyNavigator from "../components/Emergency/EmergencyNavigator";
import EmergencyChat from "../components/Emergency/EmergencyChat";
import EmergencyPageChats from "../components/Emergency/EmergencyPageChats";

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
          

          {/* first screen for phone number */}
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} options={{ headerShown: false, title: 'Welcome to DrClinico' }} />
        
        {/* buttons for doctor and patient to register */}
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />

        {/* admin will go here */}
        <Stack.Screen name="AdminPage" component={AdminNavigator} options={{ headerShown: false }} />


        {/* register doctor form */}
        <Stack.Screen name="RegisterDoctor" component={DoctorRegisterForm}options={{title: 'Register as Doctor' }} />

        {/* registered doctor */}
        <Stack.Screen name="DoctorNavigator" component={DoctorNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="DoctorTermsAndConditions" component={DoctorTermsAndConditions} options={{title: 'Terms and Conditions' }}/>
        <Stack.Screen name="DoctorChat" component={DoctorChat} />

        {/* register patient form */}
        <Stack.Screen name="RegisterPatient" component={PatientRegisterForm} options={{title: 'Register as Patient' }} />

        {/* registered patient */}
        <Stack.Screen name="PatientNavigator" component={PatientBottomNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="PatientPageChats" component={PatientPageChats}  options={{ title: 'Doctors' }}/>
        <Stack.Screen name="PatientChat" component={PatientChat} />


        <Stack.Screen name="EmergencyNavigator" component={EmergencyNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="EmergencyPageChats" component={EmergencyPageChats}  options={{ title: 'Doctors' }}/>
        <Stack.Screen name="EmergencyChat" component={EmergencyChat} />
        
        <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
