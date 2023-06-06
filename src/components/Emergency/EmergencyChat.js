import React, { Component, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, FlatList, Platform, TextInpu, TextInput } from "react-native";
import bg from "./../../../assets/images/BG.png";
import messages from "../../../assets/data/messages.json";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import {collection,addDoc,serverTimestamp,orderBy,getDocs,query,limit, updateDoc, getDoc, doc} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ReactDOM from "react-dom";
import { db } from "../../features/firebaseauth";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useContextAPI } from "../../features/contextapi";

const EmergencyChat = () => {


  const router = useRoute();
  const currentDoctor = router.params

  const navigation = useNavigation();
  const {currentLoggedInUser, setCurrentLoggedInUser} =  useContextAPI()

  const dummy = useRef();
  const messagesRef = collection(db, `${currentLoggedInUser.id}with${currentDoctor.id}`);
  const queryyy = query(messagesRef, orderBy("createdAt", "desc"));
  
  const [allmsgs, setAllmsgs] = useState([]);
  console.log({allmsgs});

  const [messages, loading, error] = useCollection(queryyy, { idField: "id" });


  const [loader, setLoader] = useState(true);


  useEffect(() => {
    if (!loading) {
      const dd = messages?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log({dd});
      setAllmsgs(dd);
      setLoader(false);
    }
  }, [messages]);



  useEffect(() => {
    navigation.setOptions({ title: router.params.fullname });
  }, [router.params.name]);


  const handleMessage = async (text) => {
    
    
    console.log({currentLoggedInUser});
    console.log(currentLoggedInUser.doctors.length);

    if (!currentLoggedInUser.doctors.includes(currentDoctor.id)) {
      if(currentLoggedInUser.doctors.length == 1){
        console.log("already with one doctor");
        setAllmsgs([...allmsgs, {
          id: new Date().toString(),
          text: "You cant send a message to this doctor",
          uid: "error",
          createdAt: ""
        }])
        return;
      } else {
        const patSnapshot = doc(db, "users", currentLoggedInUser.id);
        const updatedDoctors = [...currentLoggedInUser.doctors, currentDoctor.id];
        await updateDoc(patSnapshot, { doctors: updatedDoctors });
        setCurrentLoggedInUser({ ...currentLoggedInUser, doctors: updatedDoctors });
      }
    }

    console.log(currentDoctor.patients.includes(currentLoggedInUser.id));

    if (!currentDoctor.patients.includes(currentLoggedInUser.id)) {
      if(currentLoggedInUser.doctors.length == 1){
        console.log("currentLoggedInUser.doctors.length == 1");
        return;
      }else {
        const docSnapshot = await getDoc(doc(db, "users", currentDoctor.id));
        const previousDataOfDoctor = docSnapshot.data();
      
        if (!previousDataOfDoctor.patients.includes(currentLoggedInUser.id)) {
          const updatedPatients = [...previousDataOfDoctor.patients, currentLoggedInUser.id];
          await updateDoc(docSnapshot.ref, { patients: updatedPatients });
        }
      }
    }
  
    await addDoc(messagesRef, { text, createdAt: serverTimestamp(), uid: currentLoggedInUser.id });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}>
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={allmsgs}
          renderItem={({ item }) => <Message message={item} />}
          inverted
        />
        <Text ref={dummy}></Text>
      </ImageBackground>
      <InputBox handleMessage={handleMessage}/>
    </KeyboardAvoidingView>
  );
};


const InputBox = ({handleMessage}) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [progresses, setProgresses] = useState({});

  const onSend = () => {
    if (text.trim().length > 0) {
      handleMessage(text.trim());
      setText("");
    }
  }

  const pickImage = () => {
    console.log("pick image")
  }

  return (
    <View style={inputstyles.container}>
      {/* <SafeAreaView edges={["bottom"]} style={inputstyles.container}> */}
        {/* Icon */}
        <AntDesign
          onPress={pickImage}
          name="plus"
          size={20}
          color="royalblue"
        />

        {/* Text Input */}
        <TextInput
          value={text}
          onChangeText={setText}
          style={inputstyles.input}
          placeholder="Type your message..."
        />

        {/* Icon */}
        <MaterialIcons
            onPress={onSend}
          style={inputstyles.send}
          name="send"
          size={16}
          color="white"
        />
      {/* </SafeAreaView> */}
    </View>
  );
};


const Message = ({message}) => {
  const [isMe, setIsMe] = useState(true);
  const [downloadAttachments, setDownloadedAttachments] = useState([]);

  const {currentLoggedInUser} = useContextAPI()


    const isMyMessage = async () => {
      setIsMe(message.uid ===currentLoggedInUser.id);
    };

    useEffect(()=> {
      isMyMessage()
    }, [])
  return (
    <>
    <View
      style={[
        msgsStyles.container,
        {
          backgroundColor: isMe ? "#DCF8C5" : "white",
          alignSelf: isMe ? "flex-end" : "flex-start",
        },
      ]}
    >
      {downloadAttachments.length > 0 && (
        <View style={[{ width: imageContainerWidth }, msgsStyles.images]}>
          <ImageAttachments attachments={imageAttachments} />

          <VideoAttachments
            attachments={videoAttachments}
            width={imageContainerWidth}
          />
        </View>
      )}
      <Text>{message.text}</Text>
      {/* <Text style={msgsStyles.time}>{message.createdAt.toDate().toLocaleString()}</Text> */}
    </View>
    </>
  )
}


const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
})

const inputstyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,

    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: "royalblue",
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
  },

  attachmentsContainer: {
    alignItems: "flex-end",
  },
  selectedImage: {
    height: 100,
    width: 200,
    margin: 5,
  },
  removeSelectedImage: {
    position: "absolute",
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});

const msgsStyles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",

    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  time: {
    color: "gray",
    alignSelf: "flex-end",
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "50%",
    aspectRatio: 1,
    padding: 3,
  },
  image: {
    flex: 1,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
});


export default EmergencyChat;
