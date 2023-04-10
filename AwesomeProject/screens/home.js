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
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, position: "relative", alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 8, marginTop: 50 }}>
        <TouchableOpacity style={{ borderRadius: 150, width: 250, height: 250, backgroundColor: '#D36B0D', justifyContent: 'center', alignItems: 'center' }} onPress={handleTouchableOpacityClick}>
          <Text style={{ fontSize: 20, textAlign: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>החממה- רשת חברתית- ליזמות חברתית</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'center', marginTop: 20 }}>
          {showView1 &&
            <Animated.View style={{ width: 70, marginRight: 20, height: 50, position: 'relative', opacity: animatedValue }}>
              <Text>מי אנחנו?</Text>
            </Animated.View>
          }
          {showView2 &&
            <Animated.View style={{ width: 90, marginRight: 20, height: 50, position: 'relative', opacity: animatedValue }} >
              <Text>החממות שלנו</Text>
            </Animated.View>
          }
          {showView3 &&
            <Animated.View style={{ width: 90, height: 50, position: 'relative', opacity: animatedValue }} >
              <Text>הפנייה לצ'אט</Text>
            </Animated.View>
          }

        </View>
        <Text>Home</Text>
        <TouchableOpacity onPress={clearOnboarding}>
          <Text>clear</Text>
        </TouchableOpacity>
        <FlatList />
      </View>


    </SafeAreaView>
  );
}

export default HomeScreen;