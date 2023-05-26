import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useContextAPI } from '../../features/contextapi';

const DoctorScores = () => {
  const { users, setUsers } = useContextAPI();

  const [doctors, setDoctors] = useState([
    { id: '1', name: 'Doctor 1', money: '', score: 0 },
    { id: '2', name: 'Doctor 2', money: '', score: 0 },
    { id: '3', name: 'Doctor 3', money: '', score: 0 },
    // Add more doctors as needed
  ]);

  const handleAllocation = (doctorId) => {
    // Perform allocation logic here for the specific doctor
    // You can access the allocated money for each doctor from the 'doctors' state
    // and update the score accordingly
    const doctors = users.filter(item => item.doctor)
    console.log({doctors});
    const updatedDoctors = [...doctors];
    const doctorIndex = updatedDoctors.findIndex((doctor) => doctor.id === doctorId);
    // Update the score based on the allocated money (e.g., increment by 1 for each $10)
    const allocatedMoney = parseFloat(updatedDoctors[doctorIndex].money);
    if (!isNaN(allocatedMoney)) {
      const allocatedScore = Math.floor(allocatedMoney / 10);
      updatedDoctors[doctorIndex].score += allocatedScore;
    }
    setDoctors(updatedDoctors);
  };

  const renderDoctorItem = ({ item }) => {
    console.log({item});
   return  (
    <>
      {item.doctor &&
      <View style={styles.doctorItem}>
      <View>
        <Text>{item.fullname}</Text>
        <Text style={styles.scoreText}>Handely Total Patients: {item.patients.length}</Text>
      </View>
      <View style={styles.allocateButton}>
        <TextInput
          style={styles.moneyInput}
          placeholder="Enter allocated money"
          value={item.money}
          onChangeText={(value) => {
            const updatedDoctors = [...doctors];
            const doctorIndex = updatedDoctors.findIndex((doctor) => doctor.id === item.id);
            updatedDoctors[doctorIndex].money = value;
            setDoctors(updatedDoctors);
          }}
        />
        <Button
          title="Allocate"
          onPress={() => handleAllocation(item.id)}
          disabled={!item.money} // Disable button if no money is allocated
        />
      </View>
    </View>
      }
    </>
   )

  }
    
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Allocate Money to Doctors</Text>
      <FlatList
        data={users}
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
    backgroundColor: "white"
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  doctorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 16,
  },
  allocateButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moneyInput: {
    height: 40,
    width: 100,
    marginRight: 8,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  doctorList: {
    marginBottom: 16,
  },
});

export default DoctorScores;
