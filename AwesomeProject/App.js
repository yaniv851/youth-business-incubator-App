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

function MainTabNavigator() {
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
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: "#D36B0D",
        inactiveTintColot: "#898989"

      }}
    >
      <Tab.Screen name="דף הבית" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="חממות קרובות" component={SettingsScreen} options={{headerShown: false}}/>
      <Tab.Screen name="פרופיל" component={ProfileScreen} options={{headerShown: false}} />
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
        <MainTabNavigator/>
      ) : (
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={MainTabNavigator} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
