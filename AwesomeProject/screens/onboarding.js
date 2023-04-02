import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding() {
    const navigation = useNavigation();
    return (
        <View>
            <Text>onboarding</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text>Hello</Text>
            </TouchableOpacity>
        </View>
    )
}