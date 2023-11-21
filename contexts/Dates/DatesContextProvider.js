import React, { useEffect, useState } from 'react';
import DatesContext from './DatesContext';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setWeek } from '../../redux/reducers/reducers';
import { firebaseAuth, firebaseUserDatesColumn } from '../../firebaseConfig';
import { dayInSeconds, days, hourInSeconds, weekEnd, weekStart } from '../../variables';
import { addDoc } from 'firebase/firestore';


const DatesContextProvider = ({ children }) => {

    const auth = firebaseAuth;

    let { userWeek, user } = useSelector((store) => store.state);

    let dispatch = useDispatch();

    /*
    const data = {
        labels: userWeek.map(a => a.day), // optional
        data: [0.6, 0.7, 0.5, 0.8, 0.9]
    };
    */

    //Days handling
    const [pressedID, setPressed] = useState(0);

    const handlePressedID = (id) => {
        setPressed(id);
    }


    //Planned dates

    const [plannedDates, setDates] = useState({
        from: new Date(),
        to: new Date()
    });



    const handleInputChange = (e) => {
        const { name, value } = e;
        setDates((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }





    //Set localy User day
    const handleSetUserWeek = async (pressedID) => {
        let dateFrom = new Date(plannedDates.from);
        let dateTo = new Date(plannedDates.to);

        let fromFirebase = new Date(weekStart + ((pressedID) * dayInSeconds) + (dateFrom.getHours() * hourInSeconds) + (dateFrom.getMinutes() * 60000)).getTime();
        let toFirebase = new Date(weekStart + ((pressedID) * dayInSeconds) + (dateTo.getHours() * hourInSeconds) + (dateTo.getMinutes() * 60000)).getTime();


        let newUserWeek = [...userWeek];
        newUserWeek[pressedID] = {
            day: newUserWeek[pressedID].day,
            acronym: newUserWeek[pressedID].acronym,
            from: fromFirebase / 1000,
            to: toFirebase / 1000
        }

        let date = {
            day: days[pressedID].day,
            userID: auth.currentUser.uid,
            title: "",
            from: new Date(fromFirebase),
            to: new Date(toFirebase)
        }
        try {
            await addDoc(firebaseUserDatesColumn, date);
            dispatch(setWeek(newUserWeek));
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <DatesContext.Provider value={{
            userWeek, user, pressedID,
            handlePressedID, handleSetUserWeek, plannedDates,
            handleInputChange
        }}>
            {children}
        </DatesContext.Provider>
    );
};

export default DatesContextProvider;