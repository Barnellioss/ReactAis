import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../variables';
import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { default as IconSettings } from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import AdminContext from '../contexts/Admin/AdminContext';
import { default as IconAnt } from 'react-native-vector-icons/AntDesign';




export default function AdminScreen({ navigation, route }) {

    const { userInfo, userWeek, usersDates } = useSelector((store) => store.state);
    const { filterState, handleUserPopup, handleFilterState, visibleState, getStudents, getDatesForStudents } = useContext(AdminContext);


    useEffect(() => {
        if (route.name === "Admin") {
            const unsubscribe = navigation.addListener('focus', () => {
                getStudents();
                getDatesForStudents();
                return unsubscribe;

            });
        }
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bg} source={require('../images/Books.jpg')} blurRadius={1}>

                <Header navigation={navigation} status={userInfo?.status} />

                <View style={styles.searchBar}>
                    <View style={styles.labels}>
                        <ScrollView horizontal showsVerticalScrollIndicator={false}>

                            <Text style={styles.barFirstItem}>Name</Text>
                            {visibleState.Year === true ? <Text style={{ ...styles.barItem, width: 60, textAlign: 'center' }}>Year</Text> : <></>}
                            {visibleState.Degree === true ? <Text style={{ ...styles.barItem, textAlign: 'center', marginRight: 5 }}>Degree</Text> : <></>}
                            {visibleState.Group === true ? <Text style={{ ...styles.barItem, textAlign: 'center' }}>Group</Text> : <></>}
                            {visibleState.Start === true ? <Text style={{ ...styles.barItem, textAlign: 'center', marginLeft: 5, marginRight: 10 }}>Start</Text> : <></>}
                            {visibleState.End === true ? <Text style={{ ...styles.barItem, textAlign: 'center', marginLeft: 5 }}>End</Text> : <></>}

                            <View style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                                <TouchableOpacity style={styles.barItemLastItem} onPress={() => handleFilterState({ ...filterState, filterModalVisible: true })}>
                                    <IconSettings name="settings" style={{ marginTop: 0, fontSize: 20, color: "#fff" }} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.barItemLastItem} onPress={() => { navigation.navigate('Create User') }}>
                                    <IconAnt name="adduser" style={{ marginTop: 0, fontSize: 20, color: "#fff" }} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>


                <FlatList
                    style={styles.list}
                    data={filterState.students}
                    renderItem={({ item }) => {

                        let startDate = new Date(item.startDate.seconds * 1000);
                        let start = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`;

                        let endDate = new Date(item.endDate.seconds * 1000);
                        let end = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`;

                        return (
                            <View style={styles.listItemWrapper}>
                                <ScrollView horizontal>
                                    <Pressable style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
                                        onPress={() =>
                                            handleUserPopup(true, item)
                                        }>
                                        <Text style={styles.listItemFirstChild} numberOfLines={1} ellipsizeMode="tail" >{item.lastname + " " + item.name}</Text>
                                        {visibleState.Year === true ? <Text style={{ ...styles.listItem, width: 30 }}>{item.currentYear}</Text> : <></>}
                                        {visibleState.Degree === true ? <Text style={{ ...styles.listItem, marginLeft: 17, width: 60 }}>{item.degree}</Text> : <></>}
                                        {visibleState.Group === true ? <Text style={{ ...styles.listItem, width: 20, textAlign: 'left', marginRight: 20 }}>{item.group}</Text> : <></>}
                                        {visibleState.Start === true ? <Text style={{ ...styles.listItem, textAlign: 'center', marginLeft: 0 }}>{start}</Text> : <></>}
                                        {visibleState.End === true ? <Text style={{ ...styles.listItem, marginLeft: 0, textAlign: 'center' }}>{end}</Text> : <></>}
                                        {/*<Text style={styles.listItemLastChild}>
                                        <IconAnt name="edit" style={{ marginRight: 10, marginTop: 5 }} size={20} color="#fff" />
                                    </Text>*/}
                                    </Pressable>
                                    {
                                        visibleState.Graph ?
                                            <FlatList
                                                style={styles.daysContainer}
                                                data={userWeek}
                                                renderItem={(data) => {

                                                    let day = usersDates.filter(date => date.day === data.item.day && date.userID === item.userID);
                                                    let isFree = false;
                                                    if (day.length != 0) {
                                                        let fromDate = new Date(day[0].from.seconds * 1000);
                                                        let toDate = new Date(day[0].to.seconds * 1000);
                                                        if (((toDate.getHours() - fromDate.getHours())
                                                            + Math.floor((toDate.getMinutes() - fromDate.getMinutes()) * 1.67))
                                                            >= 6
                                                        ) {
                                                            isFree = true;
                                                        }
                                                    }


                                                    return (
                                                        <View style={{ width: 20 }}>
                                                            {
                                                                isFree ?
                                                                    <IconAnt name="check" style={{ marginTop: 0, fontSize: 20, color: "#0eff0e" }} />
                                                                    :
                                                                    <IconAnt name="close" style={{ marginTop: 0, fontSize: 20, color: "#ff0000" }} />
                                                            }
                                                            <Text style={{ color: "#fff", textAlign: 'center' }}>{data.item.acronym}</Text>
                                                        </View>
                                                    )
                                                }}
                                            />
                                            :
                                            <></>
                                    }
                                </ScrollView>
                            </View>
                        )
                    }}
                />
            </ImageBackground >
        </View>
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
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 28
    },
    filterButtonText: {
        width: 60,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 20,
        fontSize: 14,
        color: "#fff"
    },

    modalView: {
        margin: 0,
        backgroundColor: 'white',
        padding: 35,
        paddingTop: 20,
        width: windowWidth,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    bg: {
        width: windowWidth,
        height: windowHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    filterButton: {
        width: 80,
        borderColor: "#464742",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 5,
        height: 35,
        paddingVertical: 5
    },

    filterButtonActive: {
        borderColor: '#384357',
        backgroundColor: '#384357',
    },

    filterButtonPermanent: {
        borderColor: '#141F31',
        backgroundColor: '#141F31',
    },

    filterList: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        width: windowWidth * 0.8
    },
    filterListItem: {
        color: "#000",
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    labels: {
        display: 'flex',
        flexDirection: 'row',
    },
    searchBar: {
        width: windowWidth * 0.9,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#fff"
    },
    header: {
        width: windowWidth,
        height: 100,
        backgroundColor: "#005dff",
        display: 'flex',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 28,
        color: "#fff",
        marginLeft: 10
    },
    listOfVisible: {
        width: windowWidth * 0.9,
        height: 100
    },
    list: {
        width: windowWidth * 0.9,
        marginHorizontal: 'auto',
        minHeight: windowHeight * 0.7
    },
    barFirstItem: {
        fontSize: 16,
        color: "#fff",
        width: 120,
        marginLeft: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    barItemLastItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 45,
        height: 25,
        color: "#fff"
    },
    barItem: {
        fontSize: 14,
        color: "#fff",
        width: 70,
        marginLeft: 0,
    },
    barItemText: {
        fontSize: 20,
        color: "#fff"
    },
    listItem: {
        color: "#fff",
        fontSize: 14,
        width: 90,
        paddingBottom: 10,
        marginLeft: 30
    },
    listItemFirstChild: {
        color: "#fff",
        fontSize: 14,
        width: 120,
        paddingBottom: 10,
        marginLeft: 0,
    },

    listItemLastChild: {
        color: "#fff",
        fontSize: 14,
        width: 30,
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'flex-end'
    },

    listItemWrapper: {
        flex: 1,
        paddingVertical: 10,
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
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
    button: {
        marginTop: 50,
        width: 200
    },
    textError: {
        fontSize: 22,
        color: "red",
        fontWeight: "bold",
        textAlign: 'center'
    },
    invisibleText: {
        opacity: 0
    },
    daysContainer: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: "flex-end"
    }
});