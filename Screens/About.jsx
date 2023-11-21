import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput, Button, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowHeight, windowWidth } from '../variables';
import { CustomButton } from '../components/Button';
import Header from '../components/Header';
import Timetable from 'react-native-calendar-timetable';
import { useContext } from 'react';
import AboutContext from '../contexts/About/AboutContext';



export default function AboutScreen({ navigation, route }) {

    let { user, userInfo } = useContext(AboutContext);


    useEffect(() => {
    }, [user])


    return (
        <View>
            <ImageBackground style={styles.bg} source={require('../images/Books.jpg')} blurRadius={1}>
                <Header navigation={navigation} status={userInfo.status} />
            </ImageBackground>
        </View >
    )
}


const styles = StyleSheet.create({
    days__container: {
        maxHeight: 150,
        width: windowWidth - 50,
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 5
    },
    moveUp: {
        marginTop: -25
    },
    items__wrapper: {
        marginBottom: 50
    },
    item__wrapper: {
        marginTop: 5,
        width: windowWidth - 40
    },
    label: {
        color: "#fff",
        fontSize: 20
    },
    text: {
        color: "#fff",
        fontSize: 16,
    },
    button: {
        color: "#fff",
        fontSize: 16,
        padding: 5,
        backgroundColor: "#000",
        borderRadius: 10
    },
    wrapper: {
        marginTop: 20,
        marginLeft: 20
    },
    days__item: {
        height: 40,
        width: 40,
        borderRadius: 20,
        color: "#fff",
        backgroundColor: "#005dff",
        textAlign: "center",
        paddingTop: 8,
        overflow: 'hidden'
    },
    days__item_active: {
        height: 40,
        width: 40,
        borderRadius: 20,
        color: "#fff",
        backgroundColor: "#00286C",
        textAlign: "center",
        paddingTop: 8,
        overflow: 'hidden'
    },
    date__row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        maxHeight: 30
    },
    input: {
        width: windowWidth * 0.8,
        height: 42,
        color: "#000",
        borderColor: "#fff",
        borderWidth: 1,
        borderStyle: 'solid',
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "#fff"
    },
    button__bg: {
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 35,
        width: 35
    },
    bg: {
        width: windowWidth,
        height: windowHeight,
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    icon: {
        height: 25,
        width: 25,
        borderRadius: 50,
        zIndex: 10,
        marginRight: 5,
    },
    buttons__wrapper: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flex: 1,
        marginTop: 30,
        height: 50,
        width: windowWidth - 30
    },
    invisibleText: {
        opacity: 0
    },
    graphStyles: {
        marginTop: 20
    },
    menu__wrapper: {
        width: windowWidth * 0.8,
        padding: 5,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    menu__item: {
        width: 0.25 * windowWidth
    }
})

