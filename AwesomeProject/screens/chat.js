import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

export default function Chat({ route }) {
  const { mentor } = route.params;
  const [messages, setMessages] = useState([]);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    async function fetchFullName() {
      try {
        // Retrieve the user's email from the AsyncStorage
        const fullName = await AsyncStorage.getItem('@user_fullName');
        if (fullName) {
          // Fetch the user's data from the API using their email
          const response = await axios.get(`http://192.168.251.2:3002/api/users/${fullName}`);
          setFullName(response.data.fullName);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchFullName();
  }, []);



  async function onSend(newMessages = []) {
    const message = {
      text: newMessages[0].text,
      sender: fullName,
      recipient: mentor.fullName,
    };

    try {
      await axios.post(`http://192.168.251.2:3002/api/chats`, message);
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
        <Text>Chat with {mentor.fullName}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1, // replace with actual user ID
          name: fullName, // replace with actual user name
        }}
      />
    </View>
  );
}
