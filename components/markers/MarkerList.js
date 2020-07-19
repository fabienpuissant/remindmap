import React, { useState, useEffect, createRef } from 'react';
import {
    FlatList, View, StyleSheet, Text, StatusBar, TextInput, Button
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default function MarkerList(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: StatusBar.currentHeight || 0,
        },
        textinput: {
            marginTop: 10,
            borderRadius: 5,
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 5,
            height: 50,
            borderColor: 'grey',
            borderWidth: 1,
            paddingLeft: 5
        }, main_container: {
            height: 'auto',
            padding: 10,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'grey',
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            borderRadius: 5
        },
        content_container: {
            flex: 1,
            margin: 5,
        },
        header_container: {
            flex: 3,
            flexDirection: 'row'
        },
        title_text: {
            fontWeight: 'bold',
            fontSize: 20,
            flex: 1,
            flexWrap: 'wrap',
            paddingRight: 5
        },
        description_container: {
            flex: 7
        },
        description_text: {
            fontStyle: 'italic',
            color: '#666666'
        },
        button: {
            marginRight: 30,
            color: 'grey'
        },
        searchButton: {
            marginLeft: 30,
            marginRight: 30,
        }
    });

    const isFocused = useIsFocused();

    const [data, setData] = useState([])

    const [dataToDisplay, setDataToDisplay] = useState([])

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        getMarkers()
    }, [isFocused])

    const handleTextChange = (e) => {
        setInputValue(e)
        var newDataToDisplay = []
        for (let i = 0; i < data.length; i++) {
            if ((data[i].title).includes(e) ||
                data[i].description.includes(e)) {
                newDataToDisplay.push(data[i])
            }
        }
        setDataToDisplay(newDataToDisplay)
    }


    const handleFind = () => {

    }


    const getMarkers = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('markers').then(res => {
                setData(JSON.parse(res))
                setDataToDisplay(JSON.parse(res))
            })
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log("error")
            // error reading value
        }
    }

    const onEndReached = () => {

    };

    const renderItem = ({ item }) => (
        <>
            <View style={styles.main_container}>
                <View style={styles.content_container}>
                    <View style={styles.header_container}>

                        <Text style={styles.title_text}>{item.title}</Text>
                        <Button
                            style={styles.button}
                            onPress={handleFind}
                            title="find"


                        />
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{item.description}</Text>
                    </View>


                </View>

            </View>
        </>
    );

    return (

        <View style={styles.container}>
            <TextInput style={styles.textinput} placeholder='Search' value={inputValue} onChangeText={handleTextChange} />
            <FlatList
                data={dataToDisplay}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>

    );

}


