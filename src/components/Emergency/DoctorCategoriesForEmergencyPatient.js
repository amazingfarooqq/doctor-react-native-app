import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ChatListItem from "./ChatListItem";
import { useContextAPI } from "../../features/contextapi";

const DoctorCategoriesForEmergencyPatient = () => {
  const navigation = useNavigation();

  const router = useRoute()
  const [filterOutDoctors, setFilterOutDoctors] = useState([])

  const { users } = useContextAPI()
  // const filterOutDoctors = router?.params.filterOutDoctors

  console.log({filterOutDoctors});

  useEffect(() => {
    navigation.setOptions({ title: `General Specialist Doctors` });
  }, [router.params.name]);


  useEffect(() => {

    const fetch = () => {
      const dat = users.filter(it => it.doctor && it.approval && it.category?.includes("General Specialist"))
      setFilterOutDoctors(dat)
    }

    fetch()

  }, [])


  return (
    <>
      <FlatList
        data={filterOutDoctors}
        renderItem={(item) => <ChatListItem filteredDoctor={item} />}
      />
    </>
  );
};

export default DoctorCategoriesForEmergencyPatient;