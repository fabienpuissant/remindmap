import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: null
        }

        Geolocation.setRNConfiguration(config);


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
        return (
            <>
                <View style={styles.container}>
                    <MapView style={styles.mapStyle}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
            </>
        )
    }

}

export default Map
