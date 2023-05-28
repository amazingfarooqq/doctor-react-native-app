import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useContextAPI } from "../features/contextapi";
import logo from "./../../assets/logo.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../features/firebaseauth";
const OnBoardScreen = () => {
  const navigation = useNavigation();
  const { users, setCurrentLoggedInUser } = useContextAPI();

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinuePress = async () => {
    try {
      const docRef = doc(db, "users", phoneNumber); // Replace 'your-collection-name' with the actual name of your collection
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const documentId = docSnap.id; // Get the document ID

        const updatedDocumentWithId = { ...data, id: documentId }

        setCurrentLoggedInUser(updatedDocumentWithId); // Include document ID in the currentLoggedInUser object


        console.log({ data });
        if(data.emergency){
          navigation.navigate("PatientNavigator", {currentLoggedInUser: updatedDocumentWithId})
        }
        if (updatedDocumentWithId.admin) {
          navigation.replace("AdminPage", { currentLoggedInUser: updatedDocumentWithId });
        }

        if (data.doctor) {
          navigation.replace("DoctorNavigator", { currentLoggedInUser: updatedDocumentWithId });
        }

        if (data.patient) {
          navigation.replace("PatientNavigator", {
            currentLoggedInUser: updatedDocumentWithId,
          });
        }

      } else {
        console.log("Document does not exist!");
        navigation.navigate("HomePage", { phoneNumber });
      }
    } catch (error) {
      console.log({error});
    }
  };


  return (
    <View style={styles.container}>
      <Image
        source={
          "https://i.pinimg.com/originals/85/95/f4/8595f4b711e503bc72fe396e5043e0c2.png"
        }
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to the Doctor Clinico!</Text>
      <Text style={styles.subtitleText}>
        Please enter your phone number to continue
      </Text>
      <TextInput
        style={styles.phoneNumberInput}
        keyboardType="phone-pad"
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinuePress}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 30,
  },
  phoneNumberInput: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  continueButton: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#0066CC",
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnBoardScreen;
