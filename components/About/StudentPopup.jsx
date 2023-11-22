import { View, Text, Modal, StyleSheet, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { default as IconAnt } from 'react-native-vector-icons/AntDesign';
import AboutContext from '../../contexts/About/AboutContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import { windowHeight, windowWidth } from '../../variables';
import { default as IconFeather } from 'react-native-vector-icons/Feather';



const StudentPopup = () => {
    const { studentPopup, handleStudentPopup, plannedDates, handleSetUserWeek, userWeek, pressedID, handlePickerChange, loading } = useContext(AboutContext);


    return (
        studentPopup.isVisible ?
            <Modal
                animationType="slide"
                transparent={true}
                visible={studentPopup.isVisible}
                onRequestClose={() => {
                    handleStudentPopup({ isVisible: !studentPopup.isVisible });
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 80 }} >
                                <Text style={styles.modalTitle}>Choose time</Text>
                            </View>
                        </TouchableOpacity>




                        <View style={styles.items__wrapper}>

                            <View style={styles.date__rows}>
                                <View style={styles.date__row}>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={120}
                                        value={plannedDates.from}
                                        mode={"time"}
                                        is24Hour={true}
                                        display="default"
                                        onChange={(e, value) => {
                                            console.log(value);
                                            handlePickerChange({ name: "from", value: value });
                                        }}
                                    />
                                </View>
                                <View style={styles.date__row}>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={120}
                                        value={plannedDates.to}
                                        mode={"time"}
                                        is24Hour={true}
                                        display="default"
                                        onChange={(e, value) => handlePickerChange({ name: "to", value: value })}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 50, flex: 1, alignItems: 'center' }}>
                                {userWeek[pressedID].from != "" ?
                                    < Text style={{ color: "#000", width: 200, textAlign: 'center' }}>
                                        From: {`${new Date(userWeek[pressedID].from * 1000).getHours()}.${new Date(userWeek[pressedID].from * 1000).getMinutes() === 0 ? "00" :
                                            new Date(userWeek[pressedID].from * 1000).getMinutes()
                                            }`}
                                    </Text>
                                    :
                                    < Text style={{ color: "#000", width: 200, textAlign: 'center' }}></Text>
                                }
                                {userWeek[pressedID].from != "" ?

                                    <Text style={{ color: "#000", width: 200, textAlign: 'center' }}>
                                        To: {`${new Date(userWeek[pressedID].to * 1000).getHours()}.${new Date(userWeek[pressedID].to * 1000).getMinutes() === 0 ? "00" : new Date(userWeek[pressedID].to * 1000).getMinutes()}`}
                                    </Text>
                                    :
                                    <Text style={{ color: "#000", width: 200, textAlign: 'center' }}></Text>
                                }
                                <Text style={{ color: "#000", width: 200, textAlign: 'center' }}>{userWeek[pressedID].day}</Text>
                            </View>
                        </View>



                        <View style={{ width: 40, height: 65, marginTop: -60 }}>
                            {
                                !loading ?
                                    <View style={{display: "flex", flexDirection: "row", justifyContent: 'center'}}>
                                        <Pressable
                                            style={{ width: 40, height: 40 }}
                                            onPress={() => {
                                                handleSetUserWeek(pressedID)
                                            }}>
                                            <IconFeather name="save" size={24} color="#000" style={{ textAlign: 'center', height: 40 }} />
                                        </Pressable>
                                        <Pressable
                                            style={{ width: 40, height: 40 }}
                                            onPress={() => {
                                                handleStudentPopup({ isVisible: !studentPopup.isVisible });
                                            }}>
                                            <IconAnt name="close" size={24} color="#000" style={{ textAlign: 'center', height: 40 }} />
                                        </Pressable>
                                    </View>
                                    :
                                    <ActivityIndicator size="large" color="#0000ff" />
                            }
                        </View>

                    </View>
                </View>
            </Modal>
            : <>
            </>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    studentWrapper: {
        width: windowWidth * 0.85,
        marginHorizontal: 'auto',
        marginTop: 25
    },
    pickerWrapper: {
        display: "flex",
        flexDirection: 'row',
        marginTop: 10
    },
    itemText: {
        fontSize: 14,
        marginVertical: 5,
        color: "#000",
        paddingBottom: 5
    },
    date__row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        maxHeight: 30
    },
    button: {
        color: "#fff",
        fontSize: 16,
        padding: 5,
        backgroundColor: "#000",
        borderRadius: 10,
        textAlign: 'center'
    },
    itemEditWrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: 35,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 5,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        width: 0.75 * windowWidth
    },
    pickerStyles: {
        marginTop: 5,
        marginLeft: 10,
        width: windowWidth * 0.5,
        height: 25
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        padding: 35,
        paddingTop: 20,
        width: windowWidth,
        height: 0.5 * windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 28
    },
    date__rows: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default StudentPopup;