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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useContextAPI } from "../features/contextapi";

const OnBoardScreen = () => {
  const navigation = useNavigation();
  const { users } = useContextAPI();

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinuePress = () => {
    if(!users) return
    const result = users?.find((item) => item.id == phoneNumber);

    if (!result) {
      navigation.navigate("HomePage");
    } else {
      console.log(result);

      if (result.admin) {
        navigation.navigate("AdminPage");
      }

      if (result.doctor) {
        // navigation.navigate("HomePage");
      }

      if (result.patient) {
        navigation.navigate("Chats");
      }
    }
  };

  // const handleContinuePress = () => {
  //   // Add logic to verify phone number and navigate to next screen

  //   const appVerifier = window.recaptchaVerifier;

  //   const auth = getAuth();
  //   signInWithPhoneNumber(auth, "+923483027503", appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //       console.log({confirmationResult});
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Error; SMS not sent
  //       console.log({error});
  //       // ...
  //     });
  // };

  return (
    <View style={styles.container}>
      <Image
        source={
          "https://i.pinimg.com/originals/85/95/f4/8595f4b711e503bc72fe396e5043e0c2.png"
        }
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to the Doctor App!</Text>
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

      {/* <PhoneInput
        style={styles.phoneNumberInput}
        country={"pk"}
        value={phoneNumber}
        onChange={(e) => console.log(e)}
      /> */}
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
