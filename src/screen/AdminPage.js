import React, { useState } from "react";
import { Modal, Pressable } from "react-native";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useContextAPI } from "../features/contextapi";
const data = [
  { name: "John", category: "Sales", details: "Lorem ipsum dolor sit amet" },
  {
    name: "Mary",
    category: "Marketing",
    details: "Consectetur adipiscing elit",
  },
  {
    name: "Bob",
    category: "Engineering",
    details: "Sed do eiusmod tempor incididunt",
  },
];

const AdminPage = () => {
  const { users } = useContextAPI();

  console.log({ users });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>

          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Name</Text>
              <Text style={styles.headerCell}>Category</Text>
              <Text style={styles.headerCell}>Email</Text>
              <Text style={styles.headerCell}>Phone Number</Text>
              <Text style={styles.headerCell}>Action</Text>
            </View>
            {users.map((user, index) => (
              <>
                {user.doctor && (
                  <View key={index} style={styles.row}>
                    <Text style={styles.cell}>{user.fullname}</Text>
                    <Text style={styles.cell}>{user.category}</Text>
                    <Text style={styles.cell}>{user.email}</Text>
                    <Text style={styles.cell}>{user.phoneNumber}</Text>
                    <View style={styles.cell}>
                      <Pressable
                        style={[styles.button, styles.acceptbtn]}
                        onPress={() => {}}>
                        <Text style={styles.acceptbtn}>Accept</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.rejectbtn]}
                        onPress={() => {}}>
                        <Text style={styles.rejectbtn}>Reject</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  cell: {
    flex: 2,
    textAlign: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalTable: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  modalTableHeader: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalTableCell: {
    marginBottom: 20,
  },
  acceptButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  acceptButtonText: {
    color: "#fff",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: "1px",
    color: "white",
  },
  acceptbtn: {
    backgroundColor: "#C7E9B0",
  },
  rejectbtn: {
    backgroundColor: "#FFACAC",
  },
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

export default AdminPage;
