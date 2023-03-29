import React from "react";
import { View, Text, FlatList } from "react-native";
import chats from "./../../assets/data/chats.json";
import ChatListItem from "../components/ChatListItem";
import DoctorRegister from "../components/DoctorRegister";
import { useNavigation } from "@react-navigation/native";

const ChatsScreen = () => {
  const navigation = useNavigation();
  console.log({ chats });
  const chat = {
    id: 1,
    user: {
      name: "farooq",
      image:
        "https://pbs.twimg.com/profile_images/1633423739302838273/88qCcR39_400x400.jpg",
      status: "online",
    },
    lastMessage: {
      text: "okay",
      createdAt: "07:30",
    },
  };
  return (
    <>
      <DoctorRegister />
      <FlatList
        data={chats}
        renderItem={(item) => <ChatListItem chat={item} />}
      />
    </>
  );
};

export default ChatsScreen;
