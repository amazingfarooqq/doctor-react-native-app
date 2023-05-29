import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../../screen/NotImplementedScreen";
import Doctors from "./Doctors";
import Settings from "./Settings";
import Donations from "./Donations";
import DoctorScores from "./DoctorScores";
import Patients from "./Patients";

const AdminNavigator = () => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Doctors"  screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}>
      <Tab.Screen name="Doctors" component={Doctors} options={{ title: 'Doctors' }}/>
      <Tab.Screen name="Patients" component={Patients} options={{ title: 'Patients' }}/>
      <Tab.Screen name="Scores" component={DoctorScores} options={{ title: 'Scores' }}/>
      {/* <Tab.Screen name="Donations" component={Donations} options={{ title: 'Donations' }}/>
      <Tab.Screen name="Settings" component={Settings} options={{ title: 'Settings' }}/> */}
      {/* <Tab.Screen name="Register" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/>
      <Tab.Screen name="Setting" component={NotImplementedScreen} options={{tabBarIcon: ({color, size}) => {
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      }}}/> */}
    </Tab.Navigator>
  );
};

export default AdminNavigator;
