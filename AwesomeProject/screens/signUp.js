import { View, Text, StyleSheet, ScrollView, useWindowDimensions, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../components/customInput/custumInput';
import CustomButton from '../components/customButton/customButton';
import SocialSignInButtons from '../components/socialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SignUp() {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    // const onSignUpPressed = () => {
    //     navigation.navigate("confirm");
    // };

    const onSignUpPressed = () => {
        axios.post('http://10.100.102.23:3002/api/users', {
            fullName: fullName,
            gmail: email,
            password: password,
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
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
        <SafeAreaView style={[styles.contis]}>
            <View style={[styles.root]}>
                <Text style={styles.title}>צרו חשבון</Text>


                <CustomInput
                    placeholder="שם מלא"
                    value={fullName}
                    setValue={setFullName}
                />
                <CustomInput
                    placeholder="אימייל"
                    value={email}
                    setValue={setEmail}
                />
                <CustomInput
                    placeholder="סיסמה"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomInput
                    placeholder="חזרו על הסיסמה"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
                />

                <CustomButton text="הירשמו" onPress={onSignUpPressed} />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our{''}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use</Text> and{''}
                    <Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy</Text>
                </Text>

                {/* <SocialSignInButtons /> */}

                <CustomButton
                    text="Have an account? Sign in"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />

            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    contis:{
        flex: 1,
        justifyContent: 'center',
    },
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC',
        height: '100%',
        flex: 1,
        justifyContent: 'center'
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