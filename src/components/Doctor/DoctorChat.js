import React, { Component, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, FlatList, Platform, TextInpu, TextInput, Modal, Button, Image, TouchableOpacity } from "react-native";
import bg from "./../../../assets/images/BG.png";
import messages from "./../../../assets/data/messages.json";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import {collection,addDoc,serverTimestamp,orderBy,getDocs,query,limit, updateDoc, getDoc, doc} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ReactDOM from "react-dom";
import { db } from "../../features/firebaseauth";
import { AntDesign, MaterialIcons , FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useContextAPI } from "../../features/contextapi";

const DoctorChat = () => {
  console.log({ messages });


  const router = useRoute();
  const currentPatient = router.params

  console.log({currentPatient});
  const navigation = useNavigation();
  const {currentLoggedInUser, setCurrentLoggedInUser} =  useContextAPI()

  const dummy = useRef();
  const messagesRef = collection(db, `${currentPatient.id}with${currentLoggedInUser.id}`);
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

  
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const [isReviewPopupVisible, setIsReviewPopupVisible] = useState(false);
const [reviewText, setReviewText] = useState("");

  const handleEndChat = () => {
    setIsSettingsVisible(false)
    setIsReviewPopupVisible(true);
  };

  useEffect(() => {
    navigation.setOptions({
      title: router.params.fullname,
      headerRight: () => (
        <>
          <TouchableOpacity onPress={() => setIsSettingsVisible(!isSettingsVisible)}>
            <FontAwesome name="cog" size={24} color="black" style={{ marginRight: 10 }} />
          </TouchableOpacity>
          {isSettingsVisible && 
              <View style={popupStyles.container}>
              <TouchableOpacity onPress={handleEndChat} style={popupStyles.option}>
                <Text style={popupStyles.optionText}>End Chat</Text>
              </TouchableOpacity>
            </View>
          }
        </>
      ),
    });
  }, [router.params.name, isSettingsVisible]);


  const handleMessage = async (text) => {
  
    await addDoc(messagesRef, { text, createdAt: serverTimestamp(), uid: currentLoggedInUser.id });
  }

  const handleSendReview = () => {
    // Handle sending the review
    console.log("Review:", reviewText);
  
    // Reset the review text and hide the review popup
    setReviewText("");
    setIsReviewPopupVisible(false);
  };
  
  const closeReviewPopup = () => {
        setReviewText("");
    setIsReviewPopupVisible(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}>
        {isReviewPopupVisible && (
            <View style={popupStyles.reviewPopup}>
              <TextInput
                value={reviewText}
                onChangeText={setReviewText}
                placeholder="Enter your review"
                style={popupStyles.reviewInput}
              />
              <TouchableOpacity onPress={handleSendReview} style={popupStyles.endChat}>
                <Text style={popupStyles.endChatText}>End Chat</Text>
              </TouchableOpacity>
                <TouchableOpacity onPress={closeReviewPopup} style={popupStyles.closeEndChatPopup}>
                <Text style={popupStyles.closeEndChatPopupText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}

      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={allmsgs}
          renderItem={({ item }) => <Message message={item} />}
          inverted
        />
        <Text ref={dummy}></Text>
      </ImageBackground>
      <InputBox handleMessage={handleMessage} currentPatient={currentPatient}/>
    </KeyboardAvoidingView>
  );
};


const InputBox = ({handleMessage, currentPatient}) => {
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


  const [modalVisible, setModalVisible] = useState(false);



  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <View style={inputstyles.container}>
      {/* <SafeAreaView edges={["bottom"]} style={inputstyles.container}> */}
        {/* Icon */}
        {/* <AntDesign
          onPress={pickImage}
          name="plus"
          size={20}
          color="royalblue"
        /> */}

        <MyModal isVisible={modalVisible} currentPatient={currentPatient} onClose={closeModal} />
        <AntDesign onPress={openModal} name="user" size={20} color="black" />

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



const MyModal = ({ isVisible, currentPatient, onClose }) => {

  const data = {
    gender: 'Male',
    profilePicture: "https://wallpapers.com/images/hd/aesthetic-profile-picture-nybkp4c7hgasdo5j.jpg",
    history: [
      'Visited Dr. Smith on 10th May 2022',
      'Underwent surgery on 25th July 2022',
      'Consulted Dr. Johnson on 5th March 2023',
    ],
  };
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={modalStylings.modalContainer}>
        <View style={modalStylings.profileContainer}>
          {/* <Image source={data.profilePicture} style={modalStylings.profilePicture} /> */}
          <Image source={{ uri: "https://wallpapers.com/images/hd/aesthetic-profile-picture-nybkp4c7hgasdo5j.jpg" }} style={modalStylings.profilePicture} />
          <Text style={modalStylings.name}>{currentPatient.fullname}</Text>
        </View>
        <View style={modalStylings.detailsContainer}>
          <Text style={modalStylings.detailText}>Phone Number: {currentPatient.phoneNumber}</Text>
          <Text style={modalStylings.detailText}>Email: {currentPatient.email}</Text>
          <Text style={modalStylings.detailText}>Gender: {data.gender}</Text>
        </View>
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Previous History</Text>
          {data.history.map((entry, index) => (
            <Text key={index} style={styles.historyText}>
              {entry}
            </Text>
          ))}
        </View>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
})

const modalStylings = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    marginBottom: 5,
  },
});


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

const popupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  option: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    color: "black",
  },

  reviewPopup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 8,
  },
  reviewInput: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  endChat: {
    backgroundColor: "royalblue",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  endChatText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeEndChatPopup: {
    backgroundColor: "royalblue",
    marginLeft: "5px",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeEndChatPopupText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
    closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeIcon: {
    fontSize: 20,
    color: "gray",
  },
});

export default DoctorChat;
