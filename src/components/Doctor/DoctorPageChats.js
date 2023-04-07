import React from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContextAPI } from "../../features/contextapi";
import ChatListItem from "./ChatListItem";

const Chats = () => {
  const navigation = useNavigation();

  const router = useRoute();
  const {currentLoggedInUser: {chats}} = router?.params;
  console.log({ chats });

  return (
    <>
      <FlatList
        data={chats}
        renderItem={(item) => <ChatListItem chat={item} />}
      />
    </>
  );
};

export default Chats;
