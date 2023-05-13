import React, { Component, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, FlatList, Platform, TextInpu, TextInput } from "react-native";
import bg from "./../../../assets/images/BG.png";
import messages from "./../../../assets/data/messages.json";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import {collection,addDoc,serverTimestamp,orderBy,getDocs,query,limit} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ReactDOM from "react-dom";
import { db } from "../../features/firebaseauth";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useContextAPI } from "../../features/contextapi";

const PatientChat = () => {
  console.log({ messages });


  const router = useRoute();
  const currentuser = router.params
  const navigation = useNavigation();
  const {currentLoggedInUser} =  useContextAPI()

  console.log({ routerparams: router.params });

  const dummy = useRef();
  const messagesRef = collection(db, `${currentLoggedInUser.id}with${currentuser.id}`);
  const queryyy = query(messagesRef, orderBy("createdAt", "desc"));

  const [messages, loading, error] = useCollection(queryyy, { idField: "id" });
  // const [formValue, setFormValue] = useState("");

  const [allmsgs, setAllmsgs] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      setAllmsgs(messages?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoader(false);
    }
  }, [messages]);



  useEffect(() => {
    navigation.setOptions({ title: router.params.fullname });
  }, [router.params.name]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}>
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={allmsgs}
          renderItem={({ item }) => <Message message={item} currentuser={currentuser}/>}
          inverted
        />
        <Text ref={dummy}></Text>
      </ImageBackground>
      <InputBox chatroom={messages} currentuser={currentuser}/>
    </KeyboardAvoidingView>
  );
};


const InputBox = ({currentuser}) => {
  const {currentLoggedInUser} =  useContextAPI()

  console.log({currentLoggedInUser, currentuser});
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [progresses, setProgresses] = useState({});


  const onSend = async () => {
      // const { uid, photoURL } = auth.currentUser;
      const messagesRef = collection(db, `${currentLoggedInUser.id}with${currentuser.id}`);
      await addDoc(messagesRef, {
        text:text,
        createdAt: serverTimestamp(),
        uid: "213",
        photoURL: "@!#",
      });
  
      // setFormValue("");
      // ReactDOM.findDOMNode(dummy.current).scrollIntoView({ behavior: "smooth" });
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

    console.log({message});

    const isMyMessage = async () => {
      setIsMe(message.uid === "213");
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


export default PatientChat;
