import React from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ChatListItem from "./ChatListItem";

const PatientPageChats = () => {
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

export default PatientPageChats;
