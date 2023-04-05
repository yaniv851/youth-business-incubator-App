import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Animated } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding', err)
    }
  }

  const navigation = useNavigation();
  const [showView1, setShowView1] = useState(false);
  const [showView2, setShowView2] = useState(false);
  const [showView3, setShowView3] = useState(false);

  const handleTouchableOpacityClick = () => {
    setShowView1(true);
    setShowView2(true);
    setShowView3(true);
  };

  handleFClick = () => {
    navigation.navigate("פרופיל");
  }

  const animatedValue = new Animated.Value(0);

  const opacityAnimation = Animated.timing(animatedValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  });

  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, position: "relative", alignItems: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'space-evenly', padding: 8, marginTop: 50 }}>
        <TouchableOpacity style={{ borderRadius: 150, width: 250, height: 250, backgroundColor: '#D36B0D', justifyContent: 'center', alignItems: 'center' }} onPress={handleTouchableOpacityClick}>
          <Text style={{ fontSize: 20, textAlign: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>החממה- רשת חברתית- ליזמות חברתית</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          {showView1 &&
            <Animated.View style={{ width: 50, marginRight: 40, height: 50, position: 'relative', opacity: animatedValue }}>
            <Text>Home</Text>
            </Animated.View>
          }
          {showView2 &&
            <Animated.View style={{ width: 50, marginRight: 40, height: 50, backgroundColor: 'red', position: 'relative', opacity: animatedValue }} />
          }
          {showView3 &&
            <Animated.View style={{ width: 50, height: 50, backgroundColor: 'red', position: 'relative', opacity: animatedValue }} />
          }

        </View>

        <FlatList />
      </View>

      <Text>Home</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>clear</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;