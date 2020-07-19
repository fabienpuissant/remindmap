import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'native-base'
import { TextInput, Button } from 'react-native-paper'

const styles = StyleSheet.create({
    input: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20,
        height: 70,
    },
    button: {
        marginRight: 30,
        marginLeft: 30,
        marginTop: 30
    },
    remove: {
        marginRight: 30,
        marginLeft: 30,
        marginTop: 15

    },
    edit: {
        marginRight: 30,
        marginLeft: 30,
        marginTop: 15
    }
})

export default function Formulaire(props) {
    return (
        <>

            <TextInput
                label="Title"
                style={styles.input}
                onChangeText={props.handleTitleChanged}
                value={props.title}
            />
            <TextInput
                label="Description"
                onChangeText={props.handleDescriptionChanged}
                style={styles.input}
                value={props.description}
            />

            {props.handleRemove == null ?
                <View style={styles.button}>
                    <Button mode="contained" onPress={props.handleSubmit} >Add</Button>
                </View>
                :
                <>
                    <View style={styles.edit}>
                        <Button mode="contained" onPress={props.handleSubmit} >Edit</Button>
                    </View>
                    <View style={styles.remove}>
                        <Button mode="contained" onPress={props.handleRemove} >Remove</Button>
                    </View>
                </>
            }



        </>

    )
}
