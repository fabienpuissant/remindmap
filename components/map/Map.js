
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import PopupForm from './PopupForm';

import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-uuid'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        marginTop:30,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
    },
    input: {

        textAlign: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
});
export default function Map({ route, navigation }) {

    const [location, setLocation] = useState(null)
    const [geocode, setGeocode] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [markers, setMarkers] = useState([])
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [eventClick, setEventClick] = useState(null)
    const [isEditPopupVisible, setisEditPopupVisible] = useState(false)
    const [idMarkerPointed, setIdMarkerPointed] = useState("")
    const [navigationValue, setNavigationValue] = useState(null)

    const handleTitleChanged = (title) => {
        setTitle(title);
    }

    const handleDescriptionChanged = (description) => {
        setDescription(description)
    }

    const handleCancel = () => {
        setTitle("")
        setDescription("")
        setIsPopupVisible(false)
        setisEditPopupVisible(false)
    }

    const getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
        }

        let locate = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const { latitude, longitude } = locate.coords
        getGeocodeAsync({ latitude, longitude })
        const window = Dimensions.get('window');
        const { width, height } = window
        lat_delta = 0.0025
        long_delta = (width / height) * lat_delta
        setLocation({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: lat_delta,
            longitudeDelta: long_delta
        });
    };

    const getGeocodeAsync = async (locate) => {
        let geocode = await Location.reverseGeocodeAsync(locate)
        setGeocode(geocode)
    }

    useEffect(() => {
        getLocationAsync()
        //storeMarkers([])
        getMarkers()
    }, [])

    useEffect(() => {
        if (route.params != null) {
            const marker = route.params.marker;
            const window = Dimensions.get('window');
            const { width, height } = window
            lat_delta = 0.0025
            long_delta = (width / height) / 300
            setLocation({
                latitude: marker[0].coordinate.latitude,
                longitude: marker[0].coordinate.longitude,
                latitudeDelta: lat_delta,
                longitudeDelta: long_delta
            })
        }
    }, [route])

    const handleClick = (e) => {
        //Add a popup to describe the marker and title it 
        setEventClick({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        })
        setIsPopupVisible(true)
    }

    const handleSubmit = () => {
        setIsPopupVisible(false)
        //Create the marker
        if (title !== "" || description !== "") {
            var newMarkers = [...markers]
            const id = uuid()
            newMarkers.push({
                id: id,
                coordinate: {
                    latitude: eventClick.latitude,
                    longitude: eventClick.longitude
                },
                title: title,
                description: description
            })
            storeMarkers(newMarkers)
            setMarkers(newMarkers)
        }
        setDescription("")
        setTitle("")
    }

    const handleEditClick = (markerId) => {
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].id === markerId) {
                setTitle(markers[i].title)
                setDescription(markers[i].description)
            }
        }
        setisEditPopupVisible(true)
        setIdMarkerPointed(markerId)



    }

    const handleEdit = () => {
        setisEditPopupVisible(false)
        var newMarkers = [...markers]
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].id === idMarkerPointed) {
                newMarkers[i].title = title
                newMarkers[i].description = description
            }
        }

        storeMarkers(newMarkers)
        setMarkers(newMarkers)
        setDescription("")
        setTitle("")
    }

    const handleRemove = () => {
        setisEditPopupVisible(false)
        var newMarkers = []
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].id !== idMarkerPointed) {
                newMarkers.push(markers[i])
            }
        }
        storeMarkers(newMarkers)
        setMarkers(newMarkers)
        setDescription("")
        setTitle("")
    }

    const storeMarkers = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('markers', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const handleChangeNavigation = (value) => {
        setNavigationValue(value)
    }



    const getMarkers = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('markers').then(res => {
                if (res === null) {
                    setMarkers([])
                } else {
                    setMarkers(JSON.parse(res))

                }
            })
            return jsonValue != [] ? JSON.parse(jsonValue) : [];
        } catch (e) {
            // error reading value
        }
    }




    //TODO
    //Add a popup onLongPress
    //Add a popup on POI press

    return (
        <>
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    region={location}
                    onLongPress={handleClick}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >

                    {markers !== [] && markers.map(marker => (
                        <Marker
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                            key={marker.id}
                            onCalloutPress={() => handleEditClick(marker.id)}

                        />
                    ))}

                    <PopupForm
                        handleSubmit={handleSubmit}
                        isVisible={isPopupVisible}
                        title={title}
                        description={description}
                        handleTitleChanged={handleTitleChanged}
                        handleDescriptionChanged={handleDescriptionChanged}
                        handleCancel={handleCancel} />

                    <PopupForm
                        handleSubmit={handleEdit}
                        isVisible={isEditPopupVisible}
                        title={title}
                        description={description}
                        handleTitleChanged={handleTitleChanged}
                        handleDescriptionChanged={handleDescriptionChanged}
                        handleCancel={handleCancel}
                        handleRemove={handleRemove} />
                </MapView>

            </View>
        </>
    )

}

