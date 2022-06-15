import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Weather from './src/components/WeatherApp'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: "white",
      primary: "white",
    },
  roundness: 10,
};


export default function App() {

  const apiKey = "64cb32446a65379eb254418bede05f06"
  const url = "http://api.openweathermap.org/data/2.5/weather?lat=48.85&lon=2.35&units=metric&appid={apiKey}";
  return (
                  <PaperProvider theme={theme}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      
    <Weather  />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

