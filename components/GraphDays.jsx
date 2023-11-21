import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { windowWidth } from './variales'
import { days } from '../variables'

const GraphDays = () => {

    return (
        <ScrollView horizontal style={styles.container}>
            {

                days.map((item, index) => {
                    return (
                        <View style={styles.days__item} key={index}>
                            <Text style={styles.text}>
                                {item.day}
                            </Text>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        marginLeft: 35,
        borderWidth: 1,
        borderColor: "#000",
        height: 100,
        marginTop: 30,
        marginBottom: 30,
        width: windowWidth * 0.75 * 7 
    },
    days__item: {
        width: windowWidth * 0.75,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: "#000"
    },
    text: {
        fontSize: 16,
        color: "#000"
    }
})

export default GraphDays