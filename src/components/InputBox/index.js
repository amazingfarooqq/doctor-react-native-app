import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";

const InputBox = ({sendMessage}) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [progresses, setProgresses] = useState({});


  const onSend = () => {
    sendMessage()
  }

  const pickImage = () => {
    console.log("pick image")
  }

  return (
    <View style={styles.container}>
      {/* <SafeAreaView edges={["bottom"]} style={styles.container}> */}
        {/* Icon */}
        <AntDesign
          onPress={pickImage}
          name="plus"
          size={20}
          color="royalblue"
        />

        {/* Text Input */}
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Type your message..."
        />

        {/* Icon */}
        <MaterialIcons
            onPress={onSend}
          style={styles.send}
          name="send"
          size={16}
          color="white"
        />
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({

  });
  
export default InputBox;
