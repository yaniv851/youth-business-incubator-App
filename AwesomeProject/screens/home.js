import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Carousel from 'react-native-snap-carousel';

const movies = [
  {
    image: require('../assets/logo.png'),
  },
  {
    image: require('../assets/logo.png'),
  },
  {
    image: require('../assets/logo.png'),
  },
];

function HomeScreen() {
  const navigation = useNavigation();

  const [showView1, setShowView1] = useState(false);
  const [showView2, setShowView2] = useState(false);
  const [showView3, setShowView3] = useState(false);

  const handleTouchableOpacityClick = () => {
    setShowView1(true);
    setShowView2(true);
    setShowView3(true);
  };

  const chatnavi = () => {
    navigation.navigate("mentors")
  }

  const [loaded] = useFonts({
    DanaYadAlefAlefAlef: require("../assets/fonts/DanaYadAlefAlefAlef-Normal.ttf"),
  })

  if (!loaded) {
    return null;
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

  const handleodotpress = () => {
    navigation.navigate("אודות");
  }

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding', err)
    }
  }



  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1, position: "relative" }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8, marginTop: 30 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 40, color: '#56A309' }}>הידעת? קטשופ שימש לראשונה כתרופה</Text>
        <TouchableOpacity style={{
          borderRadius: 150,
          width: 250,
          height: 250,
          backgroundColor: '#D36B0D',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 10,
          shadowColor: '#000',
          shadowRadius: 100,
          shadowOffset: { width: 20, height: 20 },

        }}
          onPress={handleTouchableOpacityClick}>
          {/* <Text style={{  }}> */}
          <Text style={{ fontSize: 40, textAlign: 'center', justifyContent: 'center', color: 'white', fontFamily: 'DanaYadAlefAlefAlef' }}>
            החממה -
          </Text>
          <Text style={{ fontSize: 25, textAlign: 'center', justifyContent: 'center', color: 'white', fontFamily: 'DanaYadAlefAlefAlef' }}>
            רשת חברתית
          </Text>
          <Text style={{ fontSize: 25, textAlign: 'center', justifyContent: 'center', color: 'white', fontFamily: 'DanaYadAlefAlefAlef' }}>
            ליזמות חברתית
          </Text>
          {/* </Text> */}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'center', marginTop: 20, }}>
          {showView1 &&
            <Animated.View style={{ width: 70, marginRight: 20, height: 50, position: 'relative', opacity: animatedValue }}>
              <Text onPress={handleodotpress}>מי אנחנו?</Text>
            </Animated.View>
          }
          {showView2 &&
            <Animated.View style={{ width: 90, marginRight: 20, height: 50, position: 'relative', opacity: animatedValue }} >
              <Text>החממות שלנו</Text>
            </Animated.View>
          }
          {showView3 &&
            <Animated.View style={{ width: 90, height: 50, position: 'relative', opacity: animatedValue }} >
              <Text onPress={chatnavi}>הפנייה לצ'אט</Text>
            </Animated.View>
          }

          {/* how can I add here a netflix movie slider */}
        </View>
      </View>
      {/* <Text>Home</Text> */}
      {/* <TouchableOpacity onPress={clearOnboarding}>
          <Text>clear</Text>
        </TouchableOpacity> */}
      <Text style={{ color: '#62656b', marginLeft: 30, fontFamily: 'DanaYadAlefAlefAlef', fontSize: 20 }}>תתחילו ליזום!</Text>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Carousel
          data={movies}
          renderItem={({ item }) => (
            <Image source={item.image} style={{ width: 200, height: 200 }} />
          )}
          sliderWidth={350}
          itemWidth={200}
          layout={'default'}
          loop={true}
        />
      </View>

    </ScrollView>
  );
}

export default HomeScreen;