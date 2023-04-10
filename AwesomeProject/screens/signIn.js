import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/images/4.png';
import CustomInput from '../components/customInput/custumInput';
import CustomButton from '../components/customButton/customButton';
import { useNavigation } from '@react-navigation/native';
import SocialSignInButtons from '../components/socialSignInButtons/SocialSignInButtons';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn("Sign in");
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate("forgot password")
    }

    const onSignUpPressed = () => {
        navigation.navigate("sign up")
    }

    return (
        <ScrollView>
            <View style={[styles.root]}>
                <Image source={Logo} style={[styles.logo, { height: height * 0.3, resizeMode: "contain" }]} />


                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />

                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />

                <CustomButton text="Sign In" onPress={onSignInPressed} />

                <CustomButton
                    text="Forgot password?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />

                <SocialSignInButtons />

                <CustomButton
                    text="Dont have an account? Create one"
                    onPress={onSignUpPressed}
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC'
    },
    logo: {
        width: '70%',
        maxWidth: 200,
        maxHeight: 200,
    },
});