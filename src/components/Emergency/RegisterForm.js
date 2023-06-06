import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useContextAPI } from "../../features/contextapi";

const PatientRegisterForm = (props) => {
  const { registerToCollection , setCurrentLoggedInUser} = useContextAPI();

  const [fullname, onChangeFullName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [houseAddress, setHouseAddress] = useState("")

  const router = useRoute();
  const { phoneNumber } = router?.params;

  const onSubmit = async () => {
    const formdata = {
      id: phoneNumber,
      fullname,
      email,
      houseAddress,
      phoneNumber,
      doctor: false,
      patient: true,
      admin: false,
      emergency: false,
      patients: [],
      doctors: []
    };

    setCurrentLoggedInUser(formdata);
    await registerToCollection("users", phoneNumber, formdata);
    console.log("added");
    navigation.replace("PatientNavigator", { currentLoggedInUser: formdata });
    console.log("next page");

  };

  const navigation = useNavigation();


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Register as Patient</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Full name</Text>
            <TextInput
              style={styles.inputControl}
              onChangeText={onChangeFullName}
              value={fullname}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.inputControl}
              onChangeText={onChangeEmail}
              value={email}
              placeholder=""
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>House Address</Text>
            <TextInput
              style={styles.inputControl}
              onChangeText={setHouseAddress}
              value={houseAddress}
              placeholder=""
            />
          </View>

          <View>
            <Text>By Clicking Register, you agree to  </Text>
            
            <Pressable onPress={() => navigation.navigate("DoctorTermsAndConditions")} style={{color:"skyblue"}}>Terms and Conditions</Pressable>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={onSubmit}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              // handle link
            }}>
            <Text style={styles.formFooter}>
              Don't have an account?{" "}
              <Text style={{ textDecorationLine: "underline" }}>Register</Text>
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});

export default PatientRegisterForm;
