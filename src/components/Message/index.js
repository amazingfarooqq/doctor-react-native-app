import { View, Text } from 'react-native'
import React from 'react'

const Message = ({message}) => {
    console.log({message});
  return (
    <View>
      <Text>{message.text}</Text>
    </View>
  )
}

export default Message