import { View, Text } from 'react-native'
import React from 'react'
import { windowWidth } from '../../constants'

const Event = ({ props, height, width, left, show, subjects }) => {


    let time = {
        start: props.item.startDate.getHours() + (props.item.startDate.getMinutes() / 60),
        end: props.item.endDate.getHours() + (props.item.endDate.getMinutes() / 60),
        //title: props.item.startDate.getDay() //props.item.title
    }



    return (
        < View style={{
            marginLeft: 0.15 * windowWidth,
            zIndex: 100,
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: 10,
            width: windowWidth * width,
            left: windowWidth * left,
            top: height * (time.start - 8) + 18,
            height: ((height * (time.end - 8)) - (height * (time.start - 8))),
            padding: 10,
        }}>
            {show 
                ? 
                    <Text style={{ fontSize: 16, color: "#000", textAlign: 'center' }}>{subjects.filter(item => item.id == props.item.subjectID)[0].subject}</Text>
                :
                <></>
            }
        </View>
    )
}

export default Event