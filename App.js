import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';



export default function App() {

  const [latitude, setLatitude] = useState(0)

  const [longitude, setLongitude] = useState(0)

  const [accuracy, setAccuracy] = useState(0)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });


  const initPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setAccuracy(position.coords.accuracy)
      }
    )
  }
  initPosition()

  const regionFrom = () => {
    const { width, height } = Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const latDelta = 0.05;
    const lngDelta = latDelta * ASPECT_RATIO;

    return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta
    };
  }

  const region = regionFrom();

  console.log(region)
/*
  const region = {
    "latitude": 40.4152855,
    "latitudeDelta": 0.0922,
    "longitude": -3.7006722,
    "longitudeDelta": 0.04815087040618956,
  }
*/
  return(
    <>
    <View style={styles.container}>
    <MapView
    style={styles.mapStyle}
    initialRegion={region}
  />
  </View>
  </>
  )
}


