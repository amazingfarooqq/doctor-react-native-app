import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useContextAPI } from '../../features/contextapi';

const ContactTab = () => {
    const { currentLoggedInUser, setCurrentLoggedInUser} = useContextAPI()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://wallpapers.com/images/hd/aesthetic-profile-picture-nybkp4c7hgasdo5j.jpg",
          }}
          style={styles.profileImage}
        />
        
        <Text style={styles.name}>{currentLoggedInUser.fullname}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLine}>Phone: {currentLoggedInUser.phoneNumber}</Text>
        <Text style={styles.contactLine}>Email: {currentLoggedInUser.email}</Text>
        <Text style={styles.contactLine}>Address: {currentLoggedInUser.houseAddress}</Text>
      </View>
      <EditModal currentLoggedInUser={currentLoggedInUser}/>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  contactLine: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ContactTab;



const EditModal = ({currentLoggedInUser}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(currentLoggedInUser.fullname);
  const [phoneNumber, setPhoneNumber] = useState(currentLoggedInUser.phoneNumber);
  const [email, setEmail] = useState(currentLoggedInUser.email);
  const [address, setAddress] = useState(currentLoggedInUser.houseAddress);

  const handleSave = () => {
    // Save the edited fields
    // You can perform any desired action with the edited data here
    setModalVisible(false);
  };

  return (
    <View style={modalEditStyles.container}>

      <TouchableOpacity style={modalEditStyles.EditButton} onPress={() => setModalVisible(true)}>
            <Text style={modalEditStyles.EditButtonText}>Edit</Text>
          </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={modalEditStyles.modalContainer}>
          <Text>Edit Information</Text>
          <TextInput
            style={modalEditStyles.input}
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={modalEditStyles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TextInput
            style={modalEditStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={modalEditStyles.input}
            placeholder="Address"
            value={address}
            onChangeText={text => setAddress(text)}
          />
          <TouchableOpacity style={modalEditStyles.saveButton} onPress={handleSave}>
            <Text style={modalEditStyles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalEditStyles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={modalEditStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
};

const modalEditStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  EditButton: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#0066CC",
    alignItems: "center",
    justifyContent: "center",
  },
  EditButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});


