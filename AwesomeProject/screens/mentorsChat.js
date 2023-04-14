import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const DATA = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' },
    // Add more contacts as needed
];

const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
    </View>
);

export default function MentorsChat() {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

        return (
            <TouchableOpacity onPress={() => setSelectedId(item.id)} style={[styles.item, { backgroundColor }]}>
                <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
        );

    };

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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