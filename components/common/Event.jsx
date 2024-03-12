import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { windowWidth } from '../../constants'
import SubjectsContext from '../../contexts/Subjects/SubjectsContext'
import { useSelector } from 'react-redux'

const Event = ({ props, height, width, left, show, subjects }) => {


    let time = {
        start: props.item.startDate.getHours() + (props.item.startDate.getMinutes() / 60),
        end: props.item.endDate.getHours() + (props.item.endDate.getMinutes() / 60),
        //title: props.item.startDate.getDay() //props.item.title
    }

    const {userInfo} = useSelector((store) => store.state);


    const {handleModes, handleActiveTimetable, setTimeForPicker} = userInfo.status === "admin" && show && useContext(SubjectsContext)
    
    let subject;
    
    if(show){
        subject = subjects.filter(item => item.id === props.item.subjectID)[0]
    }

    return (
        < View 
                style={{
                marginLeft: 0.15 * windowWidth,
                zIndex: 100,
                position: 'absolute',
                backgroundColor: show ? '#CEA2FD' : "#0087FF",
                borderRadius: 10,
                width: windowWidth * width,
                left: windowWidth * left,
                top: height * (time.start - 8) + 18,
                height: ((height * (time.end - 8)) - (height * (time.start - 8))),
                padding: 10,
            }}>
                <TouchableOpacity onPress={() => {
                    userInfo.status === "admin" && 
                    handleModes({ viewMode: false, editMode: true, createMode: false }); 
                    show && handleActiveTimetable({subject: subject.subject, from: props.item.from, to: props.item.to, id: props.item.id});
                    setTimeForPicker({
                        from: new Date(props.item.from * 1000 + (new Date(Date.now()).getTimezoneOffset() * 60000)),
                        to: new Date(props.item.to * 1000 + (new Date(Date.now()).getTimezoneOffset() * 60000))
                })
                }}    
                >
                {show 
                    ? 
                    <Text style={{ fontSize: 16, color: "#000", textAlign: 'center' }}>{
                        subject.subject}</Text>
                    :
                    <Text style={{ fontSize: 16, color: "#000", textAlign: 'center' }}>{
                        props.item.subject}</Text>
                }
                </TouchableOpacity>
            </View>
    )
}

export default Event