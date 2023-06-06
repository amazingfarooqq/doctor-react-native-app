import { useNavigation, useRoute } from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput , Button} from 'react-native';
import { useContextAPI } from '../features/contextapi';

const Register = () => {

  const navigation = useNavigation()
  const {registerToCollection, setCurrentLoggedInUser} = useContextAPI()
  const router = useRoute();
  
  const {phoneNumber} = router?.params


  const EmergencyBtn = async () => {

    const data = {
      fullname: `Emergency Contact - ${phoneNumber}`,
      email: "",
      houseAddress: "",
      phoneNumber,
      doctor: false,
      patient: true,
      admin: false,
      emergency: true,
      patients: [],
      doctors: [],
      id: phoneNumber
    };
    setCurrentLoggedInUser(data);
    await registerToCollection("users", phoneNumber, data);
    navigation.navigate("EmergencyNavigator", {currentLoggedInUser: data})
  }


  return (
    <View style={styles.centeredView}>

      <Text style={styles.brandName}>Doctor Clinico!</Text>

      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Emergency for patient</Text>
      </Pressable> */}
       <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={EmergencyBtn}>
        <Text style={styles.textStyle}>Emergency Contact</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => navigation.navigate("RegisterDoctor", {phoneNumber: phoneNumber})}>
        <Text style={styles.textStyle}>Register as a Doctor</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => navigation.navigate("RegisterPatient", {phoneNumber: phoneNumber} )}>
        <Text style={styles.textStyle}>Register as a Patient</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: "1px"
  },
  buttonOpen: {
    backgroundColor: '#0B2447',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default Register;