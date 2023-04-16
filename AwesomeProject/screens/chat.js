import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load initial messages
    // You can load messages from a database or API call here
    setMessages([
      { id: 1, text: 'Hello!' },
      { id: 2, text: 'How are you?' },
      { id: 3, text: 'I am doing well, thank you.' },
      { id: 4, text: 'How about you?' },
    ]);
  }, []);

  const sendMessage = () => {
    if (message) {
      // Add new message to state
      const newMessage = { id: messages.length + 1, text: message };
      setMessages([...messages, newMessage]);
      // Clear message input
      setMessage('');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
        <TextInput
          placeholder="Type your message here"
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, marginRight: 10 }}
        />
        <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
