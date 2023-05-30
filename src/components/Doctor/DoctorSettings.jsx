import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useContextAPI } from '../../features/contextapi';
import { db } from '../../features/firebaseauth';
import { doc, updateDoc } from 'firebase/firestore';

const ContactTab = () => {
  const { currentLoggedInUser, setCurrentLoggedInUser } = useContextAPI();
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(currentLoggedInUser.fullname);
  const [phoneNumber, setPhoneNumber] = useState(currentLoggedInUser.phoneNumber);
  const [email, setEmail] = useState(currentLoggedInUser.email);
  const [address, setAddress] = useState(currentLoggedInUser.houseAddress);

  const handleSave = async () => {
    // Check if any fields have changed
    if (
      name === currentLoggedInUser.fullname &&
      phoneNumber === currentLoggedInUser.phoneNumber &&
      email === currentLoggedInUser.email &&
      address === currentLoggedInUser.houseAddress
    ) {
      // No changes, exit without updating
      setEditing(false);
      return;
    }
  
    try {
      // Update the fields in Firebase database
      const userRef = doc(db, 'users', currentLoggedInUser.id);
      
      await updateDoc(userRef, {
        fullname: name,
        phoneNumber,
        email,
        houseAddress: address,
      });
  
      // Update the fields in the currentLoggedInUser state
      setCurrentLoggedInUser({
        ...currentLoggedInUser,
        fullname: name,
        phoneNumber,
        email,
        houseAddress: address,
      });
  
      setEditing(false);
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };


  const formatDate = (timestamp) => {
    const date = timestamp?.toDate();
    const year = date?.getFullYear();
    const month = date?.toLocaleString('default', { month: 'long' });
    const day = date?.getDate();
    return `${month} ${day}, ${year}`;
  };
  
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
          {!isEditing ? (
            <>
            <Text style={styles.name}>{currentLoggedInUser.fullname}</Text>

            </>
          ) : (
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={text => setName(text)}
            />
          )}
        </View>
      </View>
      <View style={styles.contactInfo}>

        {!isEditing &&
        <>
          <Text style={styles.contactLine}>
            Phone: {phoneNumber}
          </Text>
          <Text style={styles.contactLine}>Email: {email}</Text>
          <Text style={styles.contactLine}>Date of Birth: {formatDate(currentLoggedInUser.dateOfBirth)}</Text>
          <Text style={styles.contactLine}>License Expiration: {formatDate(currentLoggedInUser.licenseExpiration)}</Text>
          <Text style={styles.contactLine}>Social Security Number: {currentLoggedInUser.socialSecurityNumber}</Text>
        
        </>
        }
        <Text style={styles.contactLine}>
          Address: {isEditing ? (
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={text => setAddress(text)}
            />
          ) : (
            address
          )}
        </Text>
      </View>
      {!isEditing ? (
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
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

export default ContactTab;
