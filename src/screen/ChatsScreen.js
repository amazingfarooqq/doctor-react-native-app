import React from "react";
import { View, Text, FlatList } from "react-native";
import chats from "./../../assets/data/chats.json";
import ChatListItem from "../components/ChatListItem";
import { useNavigation } from "@react-navigation/native";

const ChatsScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <FlatList
        data={chats}
        renderItem={(item) => <ChatListItem chat={item} />}
      />
    </>
  );
};

export default ChatsScreen;
