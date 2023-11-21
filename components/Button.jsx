import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';




export const CustomButton = ({ onPress, title, type, state }) => {
    return (
        state === "active" ?
            <TouchableOpacity style={type === "rounded" ? styles(state).buttonContainer : styles(state).transparentButton} onPress={onPress}>
                <Text style={type === "rounded" ? styles(state).text : styles(state).lightText}>{title}</Text>
            </TouchableOpacity>
            :
            state === "danger" ?
                <TouchableOpacity style={type === "rounded" ? styles(state).buttonContainer : styles(state).transparentButton} onPress={onPress}>
                    <Text style={type === "rounded" ? styles(state).text : styles(state).lightText}>{title}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles(state).buttonContainer}>
                    <Text style={styles(state).text}>{title}</Text>
                </TouchableOpacity>

    )
}

const styles = (state) => StyleSheet.create({
    buttonContainer: {
        backgroundColor: state === "active" ? "#000" : state === "danger" ? "transparent" : "#bcbdbe",
        height: 40,
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    text: {
        color: state === "active" ? "#fff" : state === "danger" ? "#E3242b" : "#000",
        fontSize: 24,
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 5
    },
    transparentButton: {
        width: 250,
        height: 40,
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: 'auto'
    },
    lightText: {
        fontWeight: 400,
        color: "#141F31",
        fontSize: 24,
        alignSelf: 'center',
        textTransform: 'uppercase',
        paddingTop: 5
    }
});
