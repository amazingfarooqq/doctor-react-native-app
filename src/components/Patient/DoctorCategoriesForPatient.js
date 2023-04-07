import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doctorsData } from "../data/doctorsdata";
import { useContextAPI } from "../../features/contextapi";

const DoctorCategoriesForPatient = () => {
  const navigation = useNavigation();

  const {users} = useContextAPI()

  const router = useRoute();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Doctor Category</Text>

          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {doctorsData.map((item) => {
          return (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("PatientPageChats", { filterOutDoctors: users.filter(it => {
                    if(it.doctor && it.approval && it.category?.includes(item.category)){
                        return it
                    }
                }) })}>
                <Text style={{ fontSize: 20, color: "white" }}>{item.category}</Text>
                <Text style={{ fontSize: 16, color: "gray" }}>{item.description} </Text>
              </TouchableOpacity>
            </View>
          );
        })}
        
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
    marginVertical: 20,
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
  item: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    padding: 20,
    margin: 4,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default DoctorCategoriesForPatient;
