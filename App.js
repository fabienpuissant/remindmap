import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      location: null
    }
  }

  componentWillMount() {
    Geolocation.getCurrentPosition(info => console.log(info));
  }


  render() {
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
    return(
    <>
    <View style={styles.container}>
    <MapView
    style={styles.mapStyle}
    initialRegion={{
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude,
    }}
  />
  </View>
  </>
  )
  }

 
}

