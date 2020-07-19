import React, { useState, useEffect } from 'react';
import Modal, { ModalContent } from 'react-native-modals';
import { View, StyleSheet } from 'react-native'
import Formulaire from './Formulaire'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: 300,
        height: 300
    }

})

export default function PopupForm(props) {


    return (
        <View style={styles.container}>
            <Modal
                visible={props.isVisible}
                onTouchOutside={props.handleCancel}
            >
                <View style={styles.modal}>
                    <Formulaire
                        title={props.title}
                        description={props.description}
                        handleSubmit={props.handleSubmit}
                        handleTitleChanged={props.handleTitleChanged}
                        handleDescriptionChanged={props.handleDescriptionChanged}
                        handleRemove={props.handleRemove}
                    />
                </View>
            </Modal>
        </View >
    );
}
