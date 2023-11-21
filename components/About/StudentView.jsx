import { View, Text } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import AboutContext from '../../contexts/About/AboutContext'
import Timetable from 'react-native-calendar-timetable'
import { range, windowWidth } from '../../variables'
import Event from '../Event'
import { StyleSheet } from 'react-native'
import { default as IconAnt } from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native'

const StudentView = ({ navigation, route }) => {

    const { userWeek, days, handlePressedID, filterDays, filteredCalendarDays, userInfo, pressedID } = useContext(AboutContext)

    return (
        <View>
            {userInfo.status === "student"
                ?
                <View>
                    {userWeek != "undefined" ?
                        <View style={{ ...styles.item__wrapper, marginBottom: 30, width: windowWidth, flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.days__container}>
                                {
                                    days != "undefined" ?
                                        days.map((item, i) => {
                                            return (
                                                <View style={{
                                                    height: 50
                                                }} key={i}>
                                                    <Text onPress={() => { handlePressedID(i); filterDays(userWeek, i) }}
                                                        style={pressedID === i ? styles.days__item_active : styles.days__item}>{item.slice(0, 1)}</Text>
                                                </View>
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
                                    renderItem={props => <Event props={props} key={Math.random() * 10000} />}
                                    // provide only one of these
                                    range={range}
                                />
                            </View>
                            <TouchableOpacity style={styles.button__bg} onPress={() => navigation.navigate('Dates')}>
                                <IconAnt name="calendar" size={24} color="#000" style={{ textAlign: 'center', height: 40 }} />
                            </TouchableOpacity>
                        </View>
                        : <></>
                    }
                    :
                    <></>
                </View>
                :
                <></>
            }
        </View>
    )
}


const styles = StyleSheet.create({
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