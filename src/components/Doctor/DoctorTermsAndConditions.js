import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DoctorTermsAndConditions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.subtitle}>Please read the following terms and conditions carefully before registering as a doctor:</Text>
      <Text style={styles.text}>
        1. You must be a licensed medical practitioner with a valid medical license number.
      </Text>
      <Text style={styles.text}>
        2. You agree to provide accurate and up-to-date information during the registration process.
      </Text>
      <Text style={styles.text}>
        3. You will be responsible for maintaining the confidentiality of your account credentials and not sharing them with anyone else.
      </Text>
      <Text style={styles.text}>
        4. You agree to abide by the ethical guidelines and professional standards set forth by your respective medical board.
      </Text>
      <Text style={styles.text}>
        5. You understand that any misuse of the platform or violation of the terms and conditions may result in the termination of your account.
      </Text>
      <Text style={styles.text}>
        6. The platform does not guarantee the availability of patients or any specific number of appointments.
      </Text>
      <Text style={styles.text}>
        7. The platform reserves the right to modify the terms and conditions at any time without prior notice.
      </Text>
      <Text style={styles.text}>
        By proceeding with the registration process, you acknowledge that you have read and agree to the above terms and conditions.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  text: {
    marginBottom: 8,
  },
});