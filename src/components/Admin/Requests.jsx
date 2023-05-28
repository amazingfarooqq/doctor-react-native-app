import React, { useState , useEffect } from "react";
import { Button, FlatList, Modal, Pressable } from "react-native";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../features/firebaseauth";
import { useContextAPI } from "../../features/contextapi";

const Requests = () => {
  const { users, setUsers } = useContextAPI();

  const [doctors, setdoctors] = useState([])

  useEffect(() => {
    
    const aa = async () => {
      setdoctors(users.filter(item => item.doctor))
    }

    aa()
  },[])

  const acceptUser = async (docId) => {
    try {
      const docRef = doc(db, "users", docId);
      await updateDoc(docRef, { approval: true });
      const newList = users.map((item) => {
        if (item.id == docId) {
          return { ...item, approval: true };
        } else {
          return item;
        }
      });
      console.log({ newList });
      setUsers(newList);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  console.log({ users });

  const renderSeparator = () => <View style={styles.separator} />;

  const renderDoctorItem = ({ item }) => {
    console.log({ item });
    return (
      <>
        {item.doctor && (
          <View style={styles.doctorItem}>
            <View>
              <Text style={{fontWeight: "900"}}>{item.fullname}</Text>
              <Text style={styles.scoreText}>
                Category: {item.category.join(",")}
              </Text>
              <Text style={styles.scoreText}>Email: {item.email}</Text>
              <Text style={styles.scoreText}>
                Phone Number: {item.phoneNumber}
              </Text>
            </View>
            <View style={styles.allocateButton}>
              {!item.approval ? (
                <Button
                title="Accept Doctor"
                onPress={() => acceptUser(item.id)}
                disabled={false}
              />
              ) : (
                <Button
                title="Accepted"
                onPress={() => {}}
                disabled={true}
              />
              )}
            </View>
          </View>
        )}
        
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
      <Text style={styles.heading}>List of requests for registration</Text>
        <FlatList
          data={doctors}
          renderItem={renderDoctorItem}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item) => item.id}
          style={styles.doctorList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginVertical: 36,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },

  doctorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 16,
  },
  allocateButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  moneyInput: {
    height: 40,
    width: 100,
    marginRight: 8,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 8,
  },
  doctorList: {
    marginBottom: 16,
  },
});

export default Requests;
