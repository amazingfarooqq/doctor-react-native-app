import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ChatListItem from "./ChatListItem";

const PatientPageChats = () => {
  const navigation = useNavigation();

  const router = useRoute()
  const filterOutDoctors = router?.params.filterOutDoctors

  console.log({filterOutDoctors});

  useEffect(() => {
    navigation.setOptions({ title: `Doctors for ${router?.params?.category}` });
  }, [router.params.name]);


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
