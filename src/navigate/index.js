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
import AdminPage from "../screen/AdminPage";
import DoctorCategoriesForPatient from "../components/Patient/DoctorCategoriesForPatient";
import DoctorHome from "../components/Doctor/DoctorHome";
import PatientPageChats from "../components/Patient/PatientPageChats";
import PatientChat from "../components/Patient/PatientChat";
import DoctorChat from "../components/Doctor/DoctorChat";

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
          
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />


        <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }} />

        <Stack.Screen name="RegisterDoctor" component={DoctorRegisterForm} />

        <Stack.Screen name="DoctorHome" component={DoctorHome} options={{ headerShown: false }}/>
        <Stack.Screen name="DoctorChat" component={DoctorChat} />

        <Stack.Screen name="RegisterPatient" component={PatientRegisterForm} options={{ headerShown: false }} />
        <Stack.Screen name="DoctorCategoriesForPatient" component={DoctorCategoriesForPatient} options={{ headerShown: false }} />
        <Stack.Screen name="PatientPageChats" component={PatientPageChats} />
        <Stack.Screen name="PatientChat" component={PatientChat} />
        

        <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
