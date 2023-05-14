import { Text, Image, StyleSheet, Pressable, View } from "react-native";

import { AntDesign, FontAwesome } from "@expo/vector-icons";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";

dayjs.extend(relativeTime);

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

export default ChatListItem;
