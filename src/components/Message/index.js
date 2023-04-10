import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";

const Message = ({message}) => {
  const [isMe, setIsMe] = useState(true);
  const [downloadAttachments, setDownloadedAttachments] = useState([]);

    console.log({message});

    const isMyMessage = async () => {
      setIsMe(message.user.id === "u1");
    };

    useEffect(()=> {
      isMyMessage()
    }, [])
  return (
    <>
    <Text>
    </Text>
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? "#DCF8C5" : "white",
          alignSelf: isMe ? "flex-end" : "flex-start",
        },
      ]}
    >
      {downloadAttachments.length > 0 && (
        <View style={[{ width: imageContainerWidth }, styles.images]}>
          <ImageAttachments attachments={imageAttachments} />

          <VideoAttachments
            attachments={videoAttachments}
            width={imageContainerWidth}
          />
        </View>
      )}
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
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

export default Message