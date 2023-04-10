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
    container: {
      flexDirection: "row",
      backgroundColor: "whitesmoke",
      padding: 5,
      paddingHorizontal: 10,
      alignItems: "center",
    },
    input: {
      flex: 1,
      backgroundColor: "white",
      padding: 5,
      paddingHorizontal: 10,
      marginHorizontal: 10,
  
      borderRadius: 50,
      borderColor: "lightgray",
      borderWidth: StyleSheet.hairlineWidth,
    },
    send: {
      backgroundColor: "royalblue",
      padding: 7,
      borderRadius: 15,
      overflow: "hidden",
    },
  
    attachmentsContainer: {
      alignItems: "flex-end",
    },
    selectedImage: {
      height: 100,
      width: 200,
      margin: 5,
    },
    removeSelectedImage: {
      position: "absolute",
      right: 10,
      backgroundColor: "white",
      borderRadius: 10,
      overflow: "hidden",
    },
  });
  
export default InputBox;
