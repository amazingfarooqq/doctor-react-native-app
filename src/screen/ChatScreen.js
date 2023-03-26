import React, { Component } from "react";
import { Text, View, StyleSheet, ImageBackground, FlatList } from "react-native";
import bg from "./../../assets/images/BG.png";
import messages from "./../../assets/data/messages.json"
import Message from "../components/Message";

const ChatScreen = () => {
    console.log({messages});
  return (
    <ImageBackground source={bg} style={styles.bg}>
      <FlatList
        data={messages}
        renderItem={({item}) => <Message message={item}/>}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
export default ChatScreen;
