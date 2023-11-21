import { View, Text } from 'react-native'
import React from 'react'
import { windowWidth } from '../variables'

const Event = ({ props }) => {


    let time = {
        start: props.item.startDate.getHours() + (props.item.startDate.getMinutes() / 60),
        end: props.item.endDate.getHours() + (props.item.endDate.getMinutes() / 60),
        title: props.item.title
    }


    return (
        < View style={{
            zIndex: 100,
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: 10,
            width: windowWidth * 0.5,
            left: windowWidth * 0.2,
            top: 60 * (time.start - 8) + 18,
            height: ((60 * (time.end - 8)) - (60 * (time.start - 8))),
            padding: 10
        }}>
            <Text style={{ fontSize: 16, color: "#000" }}>{time.title}</Text>
        </View>
    )
}

export default Event