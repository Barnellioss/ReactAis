import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AboutContext from '../../contexts/About/AboutContext'
import Timetable from 'react-native-calendar-timetable'
import { range, windowHeight, windowWidth } from '../../constants'
import Event from '../common/Event'
import Header from '../common/Header'




const StudentView = ({ navigation, route }) => {

    const { userWeek, days, handlePressedID, filterDays, filteredCalendarDays, userInfo, pressedID, handlePlannedDates, handleStudentPopup, studentPopup } = useContext(AboutContext)

    useEffect(() => {
        filterDays(userWeek, pressedID);
    }, [userWeek[pressedID].from, userWeek[pressedID].to])



    return (

        userInfo.status === "student"
            ?
            <View style={styles.container}>

                < ImageBackground style={styles.bg} source={require('../../images/Books.jpg')} blurRadius={1}>
                    <Header navigation={navigation} status={userInfo.status} />
                    <ScrollView>

                        <View>
                            {userWeek != "undefined" ?
                                <View style={{ ...styles.item__wrapper, marginBottom: 30, width: windowWidth, flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.days__container}>
                                        {
                                            days != "undefined" ?
                                                days.map((item, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onLongPress={() => {
                                                                handlePressedID(i);
                                                                handlePlannedDates(i);
                                                                filterDays(userWeek, i);
                                                                handleStudentPopup({ isVisible: !studentPopup.isVisible });
                                                            }}
                                                            onPress={() => { handlePressedID(i); handlePlannedDates(i); filterDays(userWeek, i) }}
                                                            style={{
                                                                height: 50
                                                            }}
                                                            key={i}>
                                                            <Text
                                                                style={pressedID === i ? styles.days__item_active : styles.days__item}>
                                                                {item.slice(0, 1)}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                :
                                                <></>
                                        }
                                    </View>

                                    <View style={{ width: windowWidth * 0.85 }}>
                                        <Timetable
                                            fromHour={7.30}
                                            toHour={20.00}
                                            scrollViewProps={{ scrollEnabled: false }}
                                            items={filteredCalendarDays}
                                            hideNowLine={true}
                                            columnWidth={windowWidth * 0.85}
                                            style={{ width: windowWidth * 0.85, marginLeft: 'auto', marginRight: 'auto' }}
                                            renderItem={props => <Event props={props} key={Math.random() * 10000} height={60} width={0.5} left={0.2}/>}
                                            // provide only one of these
                                            range={range}
                                        />
                                    </View>
                                </View>
                                : <></>
                            }
                        </View>
                    </ScrollView>
                </ImageBackground>

            </View>
            :
            <></>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    bg: {
        width: windowWidth,
        height: windowHeight,
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    item__wrapper: {
        marginTop: 5,
        width: windowWidth - 40
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
    days__container: {
        maxHeight: 150,
        width: windowWidth * 0.85,
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
})


export default StudentView