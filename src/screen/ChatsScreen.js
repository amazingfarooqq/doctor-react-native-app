import React from "react";
import { View, Text, FlatList } from "react-native";
import chats from "./../../assets/data/chats.json";
import ChatListItem from "../components/ChatListItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChatsScreen = () => {
  const navigation = useNavigation();

  const router = useRoute()
  const filterOutDoctors = router?.params.filterOutDoctors

  console.log({filterOutDoctors});
  return (
    <>
      <FlatList
        data={filterOutDoctors}
        renderItem={(item) => <ChatListItem filteredDoctor={item} />}
      />
    </>
  );
};

export default ChatsScreen;
