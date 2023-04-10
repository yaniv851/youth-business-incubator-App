import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/home';
import { Ionicons } from 'expo-vector-icons';
import Chat from './screens/chat';
import About from './screens/about';
import Nearhamamot from './screens/nearhamamot';
import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
import ForgotPasswordScreen from './screens/forgotPasswordScreen';
import NewPasswordScreen from './screens/newPasswordScreen';
import ConfirmEmailScreen from './screens/confirmEmailScreen';

const Loading = () => {
  <ActivityIndicator size="large" />
}

function OnboardingScreen() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true)
      }
    } catch (err) {
      console.log('Error @checkOnboarding: ', err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? <Loading /> : viewedOnboarding ? <HomeScreen /> : <Onboarding />}
    </View>
  );
}

function SettingsScreen() {
  return <Text>Settings</Text>;
}

function ProfileScreen() {
  return <Text>Profile</Text>;
}

const Stack = createNativeStackNavigator();

// function OnboardingStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// }

const Tab = createBottomTabNavigator();

function NestedStackNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='nestedH' component={HomeScreen}

      />
      <Stack.Screen name='login' component={SignIn} />
      <Stack.Screen name='sign up' component={SignUp} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="near" component={Nearhamamot} />
      <Stack.Screen name='forgot password' component={ForgotPasswordScreen} />
      <Stack.Screen name='new password' component={NewPasswordScreen} />
      <Stack.Screen name='confirm' component={ConfirmEmailScreen} />
    </Stack.Navigator>
  )
}

function MainTabNavigator() {
  const [accountExist, setAcount] = useState(false);

  // useEffect to check if user is signed in on app start
  useEffect(() => {
    const checkSignInStatus = async () => {
      const value = await AsyncStorage.getItem('@signedIn');
      setAccountExist(value === 'true');
    };

    checkSignInStatus();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == "דף הבית") {
            iconName = "md-home";
          }
          else if (route.name == "חממות קרובות") {
            iconName = "md-search";
          }
          else if (route.name == "פרופיל") {
            iconName = "md-person";
          }
          else if (route.name == 'login') {
            iconName = "md-person";
          }
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: "#D36B0D",
        inactiveTintColot: "#898989"
      }}
    >
      <Tab.Screen name="דף הבית" component={NestedStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="חממות קרובות" component={SettingsScreen} options={{ headerShown: false }} />
      {accountExist && <Tab.Screen name="פרופיל" component={ProfileScreen} options={{ headerShown: false }} />}
      <Tab.Screen name='login' component={SignIn} options={{ tabBarVisible: false, }} />
    </Tab.Navigator>
  );
}


export default function App() {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log('Error @checkOnboarding: ', err);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <NavigationContainer>
      {viewedOnboarding ? (
        <MainTabNavigator />
      ) : (
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={MainTabNavigator} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name='SignIn'
            component={SignIn}
            options={{ headerShown: false, tabBarVisible: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
