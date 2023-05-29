import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../features/firebaseauth";
import { useContextAPI } from "../../features/contextapi";

const Patients = () => {
  const { users, setUsers } = useContextAPI();

  const [patients, setPatients] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const filterPatients = () => {
      let filteredPatients = users.filter((item) => item.patient);

      console.log({filteredPatients});

      if (filter === "emergency") {
        filteredPatients = filteredPatients.filter((item) => item.emergency);
      } else if (filter === "regular") {
        filteredPatients = filteredPatients.filter((item) => !item.emergency);
      }

      setPatients(filteredPatients);
    };

    filterPatients();
  }, [users, filter]);

  const countAll = () => {
    const allPatients = users.filter((item) => item.patient);
    return allPatients.length;
  };

  const countEmergency = () => {
    const emergencyPatients = users.filter((item) => item.patient && item.emergency);
    return emergencyPatients.length;
  };

  const countRegular = () => {
    const regularPatients = users.filter((item) => item.patient && !item.emergency);
    return regularPatients.length;
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const renderPatientItem = ({ item }) => {
    return (
      <>
        {item.patient && item.emergency &&
          <View style={styles.Item}>
            <Text style={styles.fullname}>{item.fullname}</Text>
            <Text style={styles.category}>Phone number: {item.phoneNumber}</Text>
          </View>
        }
        {item.patient && !item.emergency && (
          <View style={styles.Item}>
            <Text style={styles.fullname}>{item.fullname}</Text>
            <Text style={styles.category}>Phone number: {item.phoneNumber}</Text>
            <Text style={styles.infoText}>Email: {item.email}</Text>
            <Text style={styles.infoText}>Phone Number: {item.phoneNumber}</Text>
            <Text style={styles.infoText}>House Address: {item.houseAddress}</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>List of Patients</Text>
        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === "all" && styles.activeFilterButton]}
            onPress={() => setFilter("all")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterButtonText, filter === "all" && styles.activeFilterButtonText]}>All ( {countAll()} )</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === "regular" && styles.activeFilterButton]}
            onPress={() => setFilter("regular")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterButtonText, filter === "regular" && styles.activeFilterButtonText]}>Regular ( {countRegular()} )</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === "emergency" && styles.activeFilterButton]}
            onPress={() => setFilter("emergency")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterButtonText, filter === "emergency" && styles.activeFilterButtonText]}>Emergency ( {countEmergency()} )</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={patients}
        renderItem={renderPatientItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item.id}
        style={styles.doctorList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  heading: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#4caf50",
  },
  filterButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  Item: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  fullname: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "#777",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 12,
  },
  doctorList: {},
});

export default Patients;
