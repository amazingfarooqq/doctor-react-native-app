import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/navigate';
import ChatScreen from './src/screen/ChatScreen';
import ChatsScreen from './src/screen/ChatsScreen';

export default function App() {
  const chat = {
    id: 1,
    user: {
      name: "farooq",
      image: "https://pbs.twimg.com/profile_images/1633423739302838273/88qCcR39_400x400.jpg",
      status:"online"
    },
    lastMessage:{
      text: "okay",
      createdAt: "07:30"
    }
  }
  return (
    <View style={styles.container}>
      {/* <ChatsScreen /> */}
      {/* <ChatScreen /> */}

      <Navigator />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
});