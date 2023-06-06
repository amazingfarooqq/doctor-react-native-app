import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useContextAPI } from '../../features/contextapi';
import { db } from '../../features/firebaseauth';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const { currentLoggedInUser, setCurrentLoggedInUser } = useContextAPI();

  const navigation = useNavigation();

  const logout = () => {
    navigation.navigate("OnBoardScreen")
    setCurrentLoggedInUser({})
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://wallpapers.com/images/hd/aesthetic-profile-picture-nybkp4c7hgasdo5j.jpg',
          }}
          style={styles.profileImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{currentLoggedInUser?.fullname}</Text>
          <Text style={styles.contactLine}>Phone: {currentLoggedInUser?.phoneNumber}</Text>
        </View>
      </View>
       <TouchableOpacity style={styles.editButton} onPress={logout}>
          <Text style={styles.editButtonText}>Logout</Text>
        </TouchableOpacity>
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
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameInput: {
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    flex: 1,
  },
  contactInfo: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  contactLine: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    // width:"100%",
    borderRadius: 5,
    padding: 5,
    flex: 1,
  },
  editButton: {
    height: 40,
    backgroundColor: '#0066CC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    height: 40,
    backgroundColor: '#00CC66',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
