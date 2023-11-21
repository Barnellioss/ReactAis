import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { windowHeight, windowWidth } from '../variables';
import { useContext } from 'react';
import DatesContext from '../contexts/Dates/DatesContext';
import Header from '../components/Header';


function UserDatesScreen({ navigation, route }) {


    const { userWeek, user, pressedID, handlePressedID, handleSetUserWeek, handleInputChange, plannedDates } = useContext(DatesContext);


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bg} source={require('../images/Books.jpg')} blurRadius={1}>
                <Header navigation={navigation} route={route} />
                {userWeek != "undefined" ?
                    <ScrollView>
                        <View style={styles.items__wrapper}>
                            <View style={styles.days__container}>
                                {
                                    userWeek.map((item, i) => {
                                        return (
                                            <View style={{ height: 50 }} key={i}>
                                                <Text onPress={() => { handlePressedID(i) }} style={pressedID === i ? styles.days__item_active : styles.days__item}>{item.acronym}</Text>
                                            </View>
                                        )
                                    })

                                }
                            </View>

                            {/*
                        <View>
                            <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={date}
                                mode={"date"}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        </View>
                        */
                            }
                            <View style={styles.date__row}>
                                <Text style={{ fontSize: 16, color: "#fff", maxHeight: 30 }}>Od: </Text>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={120}
                                    value={plannedDates.from}
                                    mode={"time"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(e, value) => {
                                        console.log(value);
                                        handleInputChange({ name: "from", value: value });
                                    }}
                                />
                            </View>
                            <View style={styles.date__row}>
                                <Text style={{ fontSize: 16, color: "#fff", maxHeight: 30 }}>Do: </Text>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={120}
                                    value={plannedDates.to}
                                    mode={"time"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(e, value) => handleInputChange({ name: "to", value: value })}
                                />
                            </View>
                            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => {
                                handleSetUserWeek(pressedID)
                            }}>
                                <Text style={styles.button}>Save</Text>
                            </TouchableOpacity>
                            {/*
                            <View>
                                <ProgressChart
                                    data={data}
                                    width={windowWidth}
                                    height={320}
                                    strokeWidth={16}
                                    radius={32}
                                    chartConfig={chartConfig}
                                    hideLegend={false}
                                />
                            </View>
                        */}

                            <View style={{ marginTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {userWeek[pressedID].from != "" ?
                                    < Text style={{ color: "#fff", width: 200, textAlign: 'center' }}>{`${new Date(userWeek[pressedID].from * 1000).getHours()}. ${new Date(userWeek[pressedID].from * 1000).getMinutes()}`}</Text>
                                    :
                                    < Text style={{ color: "#fff", width: 200, textAlign: 'center' }}></Text>
                                }
                                {userWeek[pressedID].from != "" ?

                                    <Text style={{ color: "#fff", width: 200, textAlign: 'center' }}>{`${new Date(userWeek[pressedID].to * 1000).getHours()}. ${new Date(userWeek[pressedID].to * 1000).getMinutes()}`}</Text>
                                    :
                                    <Text style={{ color: "#fff", width: 200, textAlign: 'center' }}></Text>
                                }
                                <Text style={{ color: "#fff", width: 200, textAlign: 'center' }}>{userWeek[pressedID].day}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    :
                    <></>
                }
            </ImageBackground >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: "inherit",
    },
    bg: {
        width: windowWidth,
        height: windowHeight,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        color: "#fff",
        fontSize: 16,
        padding: 5,
        backgroundColor: "#000",
        borderRadius: 10
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
    title: {
        fontSize: 40,
        color: "#fff",
        marginBottom: 15,
        marginTop: 85
    },
    days__container: {
        maxHeight: 150,
        width: windowWidth,
        paddingHorizontal: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between'
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
    }
});



const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

export default UserDatesScreen;
