import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { default as IconFeather } from 'react-native-vector-icons/Feather';
import { windowWidth } from '../../variables';
import AdminContext from '../../contexts/Admin/AdminContext';
import { default as IconAnt } from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
//import { Picker } from '@react-native-picker/picker';





const AdminUserModal = () => {

    const { visibleUserSetUp, handleUserPopup, updateStudent, isUpdating } = useContext(AdminContext);
    const { isVisible, item, start, end } = visibleUserSetUp;

    const [activeEdit, setEdit] = useState(false);
    const [student, setStudent] = useState(item);



    const handleStudentChange = (e) => {
        const { name, value } = e;
        setStudent((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }


    const handleStudentDates = (e) => {
        const { name, value } = e;
        setStudent((prevFormData) => ({
            ...prevFormData,
            [name]: {
                seconds: value / 1000,
                nanoseconds: value / 1000 * 3.52361
            },
        }));
    }



    useEffect(() => {
        if (item) {
            setStudent(item);
        }
    }, [item]);



    return (isVisible ?
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}

        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={styles.modalTitle}>Settings</Text>
                            <IconFeather name="settings" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
                        </View>
                    </TouchableOpacity>

                    {activeEdit ?
                        <View style={styles.studentWrapper}>
                            <TextInput style={styles.input} value={student.name}
                                placeholderTextColor="#000" placeholder="Name" autoCapitalize="none" clearButtonMode="always"
                                onChangeText={(value) => handleStudentChange({ name: "name", value: value })}>
                            </TextInput>
                            <TextInput style={styles.input} value={student.lastname}
                                placeholderTextColor="#000" placeholder="Name" autoCapitalize="none" clearButtonMode="always"
                                onChangeText={(value) => handleStudentChange({ name: "lastname", value: value })}>
                            </TextInput>
                            <View style={styles.itemEditWrapper}>
                                <Text style={styles.itemText}>Year of study:</Text>

                                <View style={styles.pickerStyles}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Select year", value: "" }}
                                        value={`${student.currentYear}`}
                                        onValueChange={(value) => handleStudentChange({
                                            name: "currentYear", value: value
                                        })}
                                        items={
                                            [
                                                { label: "1", value: `${1}` },
                                                { label: "2", value: `${2}` },
                                                { label: "3", value: `${3}` },
                                                { label: "4", value: `${4}` },
                                                { label: "5", value: `${5}` }
                                            ]}
                                    />
                                </View>
                            </View>



                            <View style={styles.itemEditWrapper}>
                                <Text style={styles.itemText}>Degree:</Text>

                                <View style={styles.pickerStyles}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Select degree", value: "" }}
                                        value={`${student.degree}`}
                                        onValueChange={(value) => handleStudentChange({
                                            name: "degree", value: value
                                        })}
                                        items={
                                            [
                                                { label: "bachelor", value: `bachelor` },
                                                { label: "master", value: `master` },
                                            ]}
                                    />
                                </View>
                            </View>
                            <View style={styles.itemEditWrapper}>
                                <Text style={styles.itemText}>Group:</Text>

                                <View style={styles.pickerStyles}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Select group", value: "" }}
                                        value={`${student.group}`}
                                        onValueChange={(value) => handleStudentChange({
                                            name: "group", value: value
                                        })}
                                        items={
                                            [
                                                { label: "03", value: `03` },
                                                { label: "04", value: `04` },
                                                { label: "05", value: `05` },
                                                { label: "06", value: `06` },
                                                { label: "07", value: `07` },
                                            ]}
                                    />
                                </View>
                            </View>
                            <View style={styles.pickerWrapper}>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={120}
                                    value={new Date(student.startDate.seconds * 1000)}
                                    mode={"date"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(e, value) => {
                                        handleStudentDates({ name: "startDate", value: value })
                                    }}
                                />

                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={120}
                                    value={new Date(student.endDate.seconds * 1000)}
                                    mode={"date"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(e, value) => {
                                        handleStudentDates({ name: "endDate", value: value })
                                    }}
                                />
                            </View>
                        </View>

                        :

                        <View style={styles.studentWrapper}>
                            <Text style={styles.itemText}>Name: {student.name}</Text>
                            <Text style={styles.itemText}>Lastname: {student.lastname}</Text>
                            <Text style={styles.itemText}>Year of study: {student.currentYear}</Text>
                            <Text style={styles.itemText}>Degree: {student.degree}</Text>
                            <Text style={styles.itemText}>Group: {student.group}</Text>
                            <Text style={styles.itemText}>Start fo study: {start}</Text>
                            <Text style={styles.itemText}>End of study: {end}</Text>
                        </View>
                    }
                    {
                        isUpdating ?
                            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 15 }} />
                            :
                            <View style={{ display: "flex", flexDirection: "row", width: 100, height: 65, justifyContent: 'space-between' }}>
                                <Pressable
                                    style={{ width: 40, height: 40 }}
                                    onPress={() => {
                                        setEdit(false);
                                        handleUserPopup(false, student);
                                    }}>
                                    <IconAnt name="close" size={24} color="#000" style={{ textAlign: 'center', marginTop: 25, height: 40 }} />
                                </Pressable>


                                {activeEdit ?
                                    <Pressable
                                        style={{ width: 40, height: 40 }}
                                        onPress={() => {
                                            setEdit(false);
                                            updateStudent(item, student);
                                        }}>
                                        <IconFeather name="save" size={24} color="#000" style={{ textAlign: 'center', marginTop: 25, height: 40 }} />
                                    </Pressable>
                                    :
                                    <Pressable
                                        style={{ width: 40, height: 40 }}
                                        onPress={() => {
                                            setEdit(true);
                                        }}>
                                        <IconAnt name="edit" size={24} color="#000" style={{ textAlign: 'center', marginTop: 25, height: 40 }} />
                                    </Pressable>
                                }
                            </View>
                    }
                </View>
            </View>
        </Modal >
        : <></>

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
    input: {
        marginTop: 15,
        marginBottom: 5,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        width: windowWidth * 0.75,
        marginLeft: 10,
        paddingVertical: 5
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
})

export default AdminUserModal