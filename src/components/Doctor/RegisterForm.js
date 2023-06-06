import { Link, useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { useContextAPI } from "../../features/contextapi";
import { Picker } from "react-native";
import { doctorsData } from "../data/doctorsdata";
import { Ionicons } from "@expo/vector-icons"; // or any other icon library you prefer
import DateTimePicker from "@react-native-community/datetimepicker";
import {GMCInputs, PMDCInputs, USLMEInputs} from "./InputsForDoctor"

const DoctorRegisterForm = (props) => {
  const router = useRoute();

  const { phoneNumber } = router?.params;

  const { registerToCollection, setCurrentLoggedInUser } = useContextAPI();

  const [fullname, onChangeFullName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [houseAddress, sethouseAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [licenseExpiration, setLicenseExpiration] = useState(new Date());
  const [ssn, setSSN] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [registerNumber, setRegisterNumber] = useState("")
  const [country, setCountry] = useState('pak');


  const onSubmit = async () => {
    const formdata = {
      fullname,
      email,
      phoneNumber,
      houseAddress,
      gender,
      dateOfBirth,
      category: selectedCategories,
      doctor: true,
      patient: false,
      admin: false,
      patients: [],
      doctors: [],
      id: phoneNumber,
      licenseExpiration,
      socialSecurityNumber: ssn,
      medicalLicenseNumber: licenseNumber,
      registerNumber: {
        registerNumber,
        country
      },
      dealingPatients: []
    };
    setCurrentLoggedInUser(formdata);

    console.log({ formdata });

    await registerToCollection("users", phoneNumber, formdata);

    navigation.replace("DoctorNavigator", {
      currentLoggedInUser: formdata,
    });
  };

  const [text, setText] = useState("");

  const handleClear = () => {
    setText("");
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Register as a Doctor</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Full Name</Text>
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
            <Text style={styles.inputLabel}>houseAddress</Text>
            <TextInput
              style={styles.inputControl}
              onChangeText={sethouseAddress}
              value={houseAddress}
              placeholder=""
            />
          </View>

          <View style={styles.input}>
            <ComponentForNumber registerNumber={registerNumber} setRegisterNumber={setRegisterNumber} country={country} setCountry={setCountry}/>
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.radio,
                  { backgroundColor: gender === "male" ? "#007aff" : "#fff" },
                ]}
                onPress={() => setGender("male")}
              >
                <Text
                  style={[
                    styles.radioText,
                    { color: gender === "male" ? "#fff" : "#000" },
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radio,
                  { backgroundColor: gender === "female" ? "#007aff" : "#fff" },
                ]}
                onPress={() => setGender("female")}
              >
                <Text
                  style={[
                    styles.radioText,
                    { color: gender === "female" ? "#fff" : "#000" },
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            {Platform.OS === "web" ? (
              <input
                type="date"
                value={dateOfBirth.toISOString().slice(0, 10)}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setDateOfBirth(selectedDate);
                }}
              />
            ) : (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dateOfBirth;
                  setDateOfBirth(currentDate);
                }}
              />
            )}
          </View>
          {selectedCategories.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {selectedCategories.map((item) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 2,
                      padding: 2,
                      borderRadius: 5,
                      backgroundColor: "#ECF9FF",
                    }}
                    key={item}
                  >
                    <Text>{item} </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedCategories((categories) =>
                          categories.filter((cat) => cat !== item)
                        );
                      }}
                    >
                      <Text>X</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Select Category</Text>
            <Picker
              selectedValue={selectedCategories}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategories([...selectedCategories, itemValue])
              }
            >
              <Picker.Item label="Select a category" value="" />
              {doctorsData.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={category.category}
                  value={category.category}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>License Expiration</Text>
            {Platform.OS === "web" ? (
              <input
                type="date"
                value={licenseExpiration.toISOString().slice(0, 10)}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setLicenseExpiration(selectedDate);
                }}
              />
            ) : (
              <DateTimePicker
                value={licenseExpiration}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || licenseExpiration;
                  setLicenseExpiration(currentDate);
                }}
              />
            )}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Social Security Number</Text>
            <TextInput
              style={styles.inputControl}
              onChangeText={setSSN}
              value={ssn}
              placeholder=""
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Medical License Number</Text>
            <TextInput
              style={styles.inputControl}
              onChangeText={setLicenseNumber}
              value={licenseNumber}
              placeholder=""
            />
          </View>
          <View>
  <Text style={{ marginBottom: 8 }}>By Clicking Register, you agree to</Text>

  <Pressable
    onPress={() => navigation.navigate("DoctorTermsAndConditions")}
    style={{ color: "skyblue" }}
  >
    <Text>Terms and Conditions</Text>
  </Pressable>
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


const ComponentForNumber = ({registerNumber, setRegisterNumber, country,setCountry}) => {
  

  const renderInputs = () => {
    if (country === 'pak') {
      return (
        <PMDCInputs setRegisterNumber={setRegisterNumber}/>
      );
    } else if (country === 'uk') {
      return (
        <GMCInputs setRegisterNumber={setRegisterNumber}/>
      );
    } else if (country === 'us') {
      return (
        <USLMEInputs setRegisterNumber={setRegisterNumber}/>
      );
    }
    return null;
  };

  return (
    <View style={ComponentForNumberStyles.container}>
      <Text style={styles.label}>Select Country:</Text>
      <Picker
        selectedValue={country}
        onValueChange={(value) => setCountry(value)}
        style={ComponentForNumberStyles.picker}
      >
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Pak ( pmdc number )" value="pak" />
        <Picker.Item label="UK ( GMC )" value="uk" />
        <Picker.Item label="US ( USLME )" value="us" />
      </Picker>

      {renderInputs()}
    </View>
  );
};

const ComponentForNumberStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 40,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});




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
  radio: {
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  radioText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default DoctorRegisterForm;
