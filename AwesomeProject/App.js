import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function OnboardingScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Onboarding</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text>Hello</Text>
      </TouchableOpacity>
    </View>
  );
}

function SignInScreen() {
  const handleSignIn = () => {
    // Perform sign-in logic
    setIsSignedIn(true);
  };

  return <Text>Sign in</Text>;
}

function SignUpScreen() {
  const handleSignUp = () => {
    // Perform sign-up logic
    setIsSignedIn(true);
  };

  return <Text>Sign Up</Text>;
}

function HomeScreen() {
  return <Text>Home</Text>;
}

function SettingsScreen() {
  return <Text>Settings</Text>;
}

function ProfileScreen() {
  return <Text>Profile</Text>;
}

const Stack = createNativeStackNavigator();

function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {isSignedIn ? <MainTabNavigator /> : <OnboardingStack />}
    </NavigationContainer>
  );
}
