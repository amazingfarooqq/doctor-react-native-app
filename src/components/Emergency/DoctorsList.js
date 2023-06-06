import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContextAPI } from "../../features/contextapi";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../features/firebaseauth";
import { Image, StyleSheet, Pressable } from "react-native";

import { AntDesign, FontAwesome } from "@expo/vector-icons";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const DoctorsList = () => {
  const navigation = useNavigation();


  const router = useRoute();
  console.log("router.params", router);
  let currentLoggedInUser = router.params.currentLoggedInUser
  const [doctorsListing, setDoctorListing] = useState([])
  // const { chats } = currentLoggedInUser

  console.log({doctorsListing});

  useEffect(() => {
    const fetchDocuments = async () => {
      const docSnapshot = await getDoc(doc(db, "users", currentLoggedInUser.id));
      const patData = docSnapshot.data();
      console.log({patData});
      const ids = patData.doctors

      // Create a reference to the collection
      const collectionRef = collection(db, 'users');

      // Iterate through the array of IDs

      let doctors = []
      for (const id of ids) {
        try {
          // Fetch document by ID
          const docRef = doc(collectionRef, id.toString());
          const docSnap = await getDoc(docRef);

          console.log(">>data>>",docSnap.data());

          if (docSnap.exists()) {
            // Document exists
            const data = docSnap.data();
            const documentId = docSnap.id;
            doctors.push({...data, id: documentId})
           
          } else {
            // Document doesn't exist
            console.log(`Document with ID ${id} does not exist.`);
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      }

      setDoctorListing(doctors)
    };

    fetchDocuments();
  }, []);


  return (
    <>
      <FlatList
        data={doctorsListing}
        renderItem={(item) => <ChatListItem filteredDoctor={item} />}
      />
    </>
  );
};

export default DoctorsList;




const ChatListItem = ({
    filteredDoctor,
    onPress = () => {},
    selectable = false,
    isSelected = false,
  }) => {
    const { item } = filteredDoctor;

    console.log({item});
  
    const navigation = useNavigation();
  
    const user = []
    
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("PatientChat", item)
        }
        style={styles.container}>
        <Image source={{ uri: "https://wallpapers.com/images/hd/aesthetic-profile-picture-nybkp4c7hgasdo5j.jpg" }} style={styles.image} />
  
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {item?.fullname}
          </Text>
  
          <Text numberOfLines={2} style={styles.subTitle}>
            {item?.category}
          </Text>
        </View>
        {selectable &&
          (isSelected ? (
            <AntDesign name="checkcircle" size={24} color="royalblue" />
          ) : (
            <FontAwesome name="circle-thin" size={24} color="lightgray" />
          ))}
      </Pressable>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

