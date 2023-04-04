import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useContextAPI } from "../../features/contextapi";

const DoctorRegisterForm = (props) => {
  const router = useRoute();

  const { registerToCollection } = useContextAPI()

  const {category, description} = router?.params?.item

  const [fullname, onChangeFullName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [phoneNumber, onChangePhoneNumber] = useState("")


  
  const onSubmit = async () => {

    const formdata = {fullname, email, phoneNumber, category, doctor: true, patient: false}

    await registerToCollection("users", phoneNumber, formdata)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Register for {category}</Text>

        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>First and Last name</Text>
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
            <Text style={styles.inputLabel}>Phone number</Text>
            <TextInput
              style={styles.inputControl}
              onChangeText={onChangePhoneNumber}
              value={phoneNumber}
              placeholder=""
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={onSubmit}>
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

export default DoctorRegisterForm;
