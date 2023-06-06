import React, { useState, useEffect } from "react";
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../features/firebaseauth";
import { useContextAPI } from "../../features/contextapi";

const Doctors = () => {
  const { users, setUsers } = useContextAPI();

  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const filterDoctors = () => {
      let filteredDoctors = users.filter((item) => item.doctor);
      if (filter === "accepted") {
        filteredDoctors = filteredDoctors.filter((item) => item.doctor && item.approval);
      } else if (filter === "nonAccepted") {
        filteredDoctors = filteredDoctors.filter((item) => item.doctor && !item.approval);
      }
      
      setDoctors(filteredDoctors);
    };

    filterDoctors();
  }, [users, filter]);

  const takeAction = async (docId, action) => {
    try {
      const docRef = doc(db, "users", docId);
      await updateDoc(docRef, { approval: action });
      const updatedList = users.map((item) => {
        if (item.id === docId) {
          return { ...item, approval: action };
        } else {
          return item;
        }
      });
      setUsers(updatedList);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };



  const countAll = () => {
    const allDoctors = users.filter((item) => item.doctor);
    return allDoctors.length;
  };

  const countNotAccepted = () => {
    const emergencyDoctors = users.filter((item) => item.doctor && !item.approval);
    return emergencyDoctors.length;
  };

  const countAccepted = () => {
    const regularDoctors = users.filter((item) => item.doctor && item.approval);
    return regularDoctors.length;
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const renderDoctorItem = ({ item }) => {

    const formatDate = (timestamp) => {
      const date = timestamp?.toDate();
      const year = date?.getFullYear();
      const month = date?.toLocaleString('default', { month: 'long' });
      const day = date?.getDate();
      return `${month} ${day}, ${year}`;
    };

    return (
      <>
        {item.doctor && (
          <View style={styles.doctorItem}>
            <Text style={styles.fullname}>{item.fullname}</Text>
            <Text style={styles.category}>Category: {item.category.join(",")}</Text>
            <Text style={styles.infoText}>Email: {item.email}</Text>
            <Text style={styles.infoText}>Phone Number: {item.phoneNumber}</Text>
            <Text style={styles.infoText}>House Address: {item.houseAddress}</Text>
            <Text style={styles.infoText}>Date of Birth: {formatDate(item.dateOfBirth)}</Text>
            <Text style={styles.infoText}>Gender: {item.gender}</Text>
            <Text style={styles.infoText}>License Expiration: {formatDate(item.licenseExpiration)}</Text>
            <Text style={styles.infoText}>Social Security Number: {item.socialSecurityNumber}</Text>
            <Text style={styles.infoText}>Medical License Number: {item.medicalLicenseNumber}</Text>
            {/* Include other fields here */}
            
            <View style={styles.buttonContainer}>
              {!item.approval ? (
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => takeAction(item.id, true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Accept Doctor</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <View style={styles.acceptedButton}>
                    <Text style={styles.buttonText}>Accepted</Text>
                  </View>
                  <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => takeAction(item.id, false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Reject Doctor</Text>
                </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      </>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>List of Doctors</Text>
        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === "all" && styles.activeFilterButton]}
            onPress={() => setFilter("all")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterButtonText, filter === "all" && styles.activeFilterButtonText]}>All ( {countAll()} )</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === "accepted" && styles.activeFilterButton]}
            onPress={() => setFilter("accepted")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterButtonText, filter === "accepted" && styles.activeFilterButtonText]}>Accepted ( {countAccepted()} )</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === "nonAccepted" && styles.activeFilterButton]}
            onPress={() => setFilter("nonAccepted")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterButtonText, filter === "nonAccepted" && styles.activeFilterButtonText]}>Non-Accepted ( {countNotAccepted()} )</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
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
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
  },
  heading: {
    marginTop: "5px",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
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
  doctorItem: {
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
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  rejectButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  acceptedButton: {
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 12,
  },
  doctorList: {},
});

export default Doctors;
