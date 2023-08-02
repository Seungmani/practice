import { StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";

const SCREEN_WIDTH = Dimensions.get('window').width;
const API_weather = '7452e72254fd632db669b7421c0d350d';

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState('Loading ...');
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); // 권한을 가져옴, 구조분해를 통해 권한을 받았는지 확인

    if (!granted) {
      setOk(false);
    }

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 }); // 내 좌표, 위도 경도가 표시
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false }) // 위도 경도를 가지고 내 위치를 표현
    setCity(location[0].city)

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_weather}`);
    const json = await response.json();
    setDays(json.daily);
  }

  useEffect(() => {
    getWeather();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView horizontal pagingEnabled
        showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
        {days?.length === 0 ?
          <View style={{ ...styles.day, alignItems: 'center' }}>
            <ActivityIndicator color="white" size="large" style={{ marginTop: 10 }} />
          </View>
          : days?.map((day, index) => {
            <View key={index} style={styles.day}>
              <View style={{
                flexDirection: "row", alignItems: 'center',
                justifyContent: 'space-between', width: "100%"
              }}>
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={24} color="black" />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          })
        }
      </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 100,
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
});