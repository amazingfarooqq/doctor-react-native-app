import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput , Button} from 'react-native';

const Register = () => {

  const navigation = useNavigation()

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
        onPress={() => navigation.navigate("RegisterDoctorCategories")}>
        <Text style={styles.textStyle}>Register as a Doctor</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => navigation.navigate("RegisterPatient")}>
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