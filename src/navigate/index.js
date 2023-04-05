import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screen/ChatScreen";
import ChatsScreen from "../screen/ChatsScreen";
import MainTabNavigator from "./MainTabNavigator";
import HomePage from "../screen/HomePage";
import PatientRegisterForm from "../components/PatientRegister/RegisterForm";
import DoctorsCategories from "../screen/DoctorsCategories";
import DoctorRegisterForm from "../components/DoctorRegister/RegisterForm";
import OnBoardScreen from "../screen/OnBoardScreen";
import AdminPage from "../screen/AdminPage";
import DoctorCategoriesForPatient from "../components/PatientRegister/DoctorCategoriesForPatient";

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
          
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />

        <Stack.Screen name="RegisterDoctor" component={DoctorRegisterForm} />

        <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }} />

        <Stack.Screen name="RegisterDoctorCategories" component={DoctorsCategories} options={{ title: "Doctor Categories" }} />

        <Stack.Screen name="RegisterPatient" component={PatientRegisterForm} options={{ headerShown: false }} />
        <Stack.Screen name="DoctorCategoriesForPatient" component={DoctorCategoriesForPatient} options={{ headerShown: false }} />

        <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
