import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Linking } from 'react-native';
import { sendWhatsapp } from 'react-native-send-intent';

// const DATA = [
//     { id: '1', name: 'John Doe' },
//     { id: '2', name: 'Jane Smith' },
//     { id: '3', name: 'Bob Johnson' },
//     // Add more contacts as needed
// ];

// const renderItem = ({ item }) => (
//     <View style={styles.item}>
//         <Text style={styles.title}>{item.name}</Text>
//     </View>
// );

export default function MentorsChat() {
    const [selectedId, setSelectedId] = useState(null);
    const [users, setUsers] = useState([]);
    console.log(sendWhatsapp);

    useEffect(() => {
        axios.get('http://10.100.102.23:3002/api/users')
            .then(response => {
                const filteredUsers = response.data.filter(user => user.isMentor === true);
                setUsers(filteredUsers);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    console.log(users); // Add this line to log the users state variable to the console


    const onZoomPress = (item) => {
        // Open a Zoom meeting here
    }

    const onWhatsAppPress = (item) => {
        const message = 'Hello, I would like to chat with you.';
        const phoneNumber = item.whatsappNumber;
        const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
        Linking.openURL(url);
      }


    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

        return (
            <TouchableOpacity onPress={() => setSelectedId(item.id)} style={[styles.item, { backgroundColor }]}>
                <Text style={styles.title}>{item.fullName}</Text>
                <TouchableOpacity onPress={() => onZoomPress(item)}>
                    <Text>Open Zoom Meeting</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onWhatsAppPress(item)}>
                    <Text>Open WhatsApp Chat</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );

    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.fullName}
                extraData={selectedId}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});