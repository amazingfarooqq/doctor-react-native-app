import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContextAPI } from "../../features/contextapi";
import ChatListItem from "./ChatListItem";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../features/firebaseauth";

const DoctorChats = () => {
  const navigation = useNavigation();

  const {currentLoggedInUser} = useContextAPI()

  const [patients, setPatients] = useState([])
  // const { chats } = currentLoggedInUser

  console.log({patients});

  useEffect(() => {
    const fetchDocuments = async () => {
      const docSnapshot = await getDoc(doc(db, "users", currentLoggedInUser.id));
      const previousDataOfDoctor = docSnapshot.data();
      const idsOfPatients = previousDataOfDoctor.patients
      // Create a reference to the collection
      const collectionRef = collection(db, 'users');

      // Iterate through the array of IDs
      for (const id of idsOfPatients) {
        try {
          // Fetch document by ID
          const docRef = doc(collectionRef, id.toString());
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Document exists
            const data = docSnap.data();
            const documentId = docSnap.id;
            setPatients([...patients,{...data, id: documentId}])
            
          } else {
            // Document doesn't exist
            console.log(`Document with ID ${id} does not exist.`);
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      }
    };

    fetchDocuments();
  }, []);



  // const router = useRoute();
  // const {currentLoggedInUser: {chats}} = router?.params;
  // console.log({ chats });

  return (
    <View>
      <FlatList
        data={patients}
        renderItem={(item) => <ChatListItem chat={item} />}
      />
    </View>
  );
};

export default DoctorChats;
