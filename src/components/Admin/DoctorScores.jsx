import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useContextAPI } from '../../features/contextapi';

const DoctorScores = () => {
  const { users, setUsers } = useContextAPI();

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const filterDoctors = () => {
      const filteredDoctors = users.filter((item) => item.doctor && item.approval);
      setDoctors(filteredDoctors);
    };

    filterDoctors();
  }, [users]);

  const handleAllocation = (doctorId) => {
    // Perform allocation logic here for the specific doctor
    // You can access the allocated money for each doctor from the 'doctors' state
    // and update the score accordingly
  };

  const renderDoctorItem = ({ item }) => {
    return (
      <>
        {item.doctor && (
          <View style={styles.doctorItem}>
            <View>
              <Text style={styles.doctorName}>{item.fullname}</Text>
              <Text style={styles.patientText}>Total Patients: {item.patients.length}</Text>
            <View style={styles.buttonContainer}>
            <TextInput
                style={styles.moneyInput}
                placeholder="Enter allocated money"
                value={item.money}
                onChangeText={(value) => {
                  // Update the allocated money for the specific doctor
                  // const updatedDoctors = [...doctors];
                  // const doctorIndex = updatedDoctors.findIndex((doctor) => doctor.id === item.id);
                  // updatedDoctors[doctorIndex].money = value;
                  // setDoctors(updatedDoctors);
                }}
              />
              <Button
                title="Allocate"
                onPress={() => handleAllocation(item.id)}
                disabled={!item.money} // Disable button if no money is allocated
              />
            </View>
            </View>

          </View>
        )}
      </>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Allocate Money to Doctors</Text>
      <Text style={styles.totalDonations}>Total Donations: 100</Text>
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item.id}
        style={styles.doctorList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  totalDonations: {
    fontSize: 16,
    marginBottom: 16,
    color: '#777',
    textAlign: 'center',
  },
  doctorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  patientText: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  allocateButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moneyInput: {
    height: 40,
    // width: 100,
    marginRight: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  doctorList: {},
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default DoctorScores;
