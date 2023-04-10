import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../components/customInput/custumInput';
import CustomButton from '../components/customButton/customButton';
import SocialSignInButtons from '../components/socialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const onSignUpPressed = () => {
        navigation.navigate("confirm");
    };

    const onSignInPressed = () => {
        navigation.navigate("login");
    };

    const onTermsOfUsePressed = () => {
        console.warn("onTermsOfUsePressed");
    };

    const onPrivacyPressed = () => {
        console.warn("onPrivacyPressed");
    };

    return (
        <ScrollView>
            <View style={[styles.root]}>
                <Text style={styles.title}>Create an account</Text>


                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomInput
                    placeholder="Repeat Password"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
                />

                <CustomButton text="Sign up" onPress={onSignUpPressed} />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our{''}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use</Text> and{''}
                    <Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy</Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    text="Have an account? Sign in"
                    onPress={onSignInPressed}
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
        backgroundColor: '#F9FBFC',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    }
});