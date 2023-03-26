import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput , Button} from 'react-native';
import chats from "./../../../assets/data/chats.json"

const DoctorRegister = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: "",
    // image: "",
    phoneNumber: ""
  })

  const onChange = (e) => {
    const {name, value} = e.target

    setInputValues({
        ...inputValues,
        [name]: value
    })
  }

  const onSubmit = () => {
    console.log(inputValues);
    // chats.push({
    //     name: inputValues.name,
    //     phoneNumber: inputValues.phoneNumber
    // })
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {/* <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable  
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View> */}
            <>
        <TextInput
            style={styles.input}
            value={inputValues.name}
            name="name"
            placeholder={"name"}
            onChangeText={onChange}
            autoCapitalize={"none"}
        />
        {/* <TextInput
            style={styles.input}
            value={inputValues.image}
            onChangeText={onChange}
        /> */}
         <TextInput
            style={styles.input}
            name="phoneNumber"
            placeholder="phone number"
            value={inputValues.phoneNumber}
            onChangeText={onChange}
        />
        <Button title={"Register"} onPress={onSubmit} />
        </>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Register as a doctor</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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

export default DoctorRegister;