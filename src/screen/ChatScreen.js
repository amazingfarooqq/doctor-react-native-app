import React, { Component, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Platform,
} from "react-native";
import bg from "./../../assets/images/BG.png";
import messages from "./../../assets/data/messages.json";
import { KeyboardAvoidingView } from "react-native";
import InputBox from "../components/InputBox";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChatScreen = () => {
  console.log({ messages });

  const router = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: router.params.name });
  }, [router.params.name ])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}>
      <ImageBackground source={bg} style={styles.bg}>
        {/* <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          inverted
        /> */}
      </ImageBackground>
      <InputBox chatroom={messages} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
export default ChatScreen;
