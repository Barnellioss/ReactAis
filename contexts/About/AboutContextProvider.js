import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AboutContext from './AboutContext';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseUserDatesColumn, firebaseUserInfo } from '../../firebaseConfig';
import { setUserInfo, setWeek } from '../../redux/reducers/reducers';
import { dayInSeconds, hourInSeconds, weekEnd, weekStart } from '../../constants';


const AboutContextProvider = ({ children }) => {

    const auth = firebaseAuth;

    let dispatch = useDispatch();

    //day handling
    const [pressedID, setPressed] = useState(0);

    const handlePressedID = (id) => {
        setPressed(id);
    }


    let { user, userInfo, userWeek } = useSelector((store) => store.state);


    //Activity indicator
    const [isActive, setActiveMode] = useState(false);

    const handleActiveMode = (active) => {
        setActiveMode(active);
    }


    //Week days names
    let days = userWeek.map(a => a.day);

    //Error handling
    const [error, setError] = useState("CSS");

    const handleError = (error) => {
        setError(error);
    }


    //Filtered days
    const [filteredCalendarDays, setFilteredDays] = useState([]);

    const handleFilteredDays = (calendar) => {
        setFilteredDays(calendar)
    }


    //Image set
    const [image, setImage] = useState("");

    const handleImage = (img) => {
        setImage(img)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleImage(result.assets[0].uri);
        }
    }



    //Name and surname control
    const [nameData, setNameData] = useState({
        name: userInfo.name,
        lastname: userInfo.lastname,
    });


    const handleNameChange = (e) => {
        const { name, value } = e;
        setNameData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    //Update user

    const [loading, setLoading] = useState(false);

    const handleLoading = (flag) => {
        setLoading(flag);
    }

    const updateUser = async (name, lastname) => {
        handleLoading(true);
        const userInfoDocRef = doc(firebaseUserInfo, `${userInfo.userID}`);
        await updateDoc(userInfoDocRef, userInfo);

        try {
            await updateDoc(userInfoDocRef, { name: name, lastname: lastname }).then(() => {
                dispatch(setUserInfo({ ...userInfo, name: name, lastname: lastname }));
            })
        } catch (error) {
            handleError(error.message);
        }
        finally {
            handleLoading(false);
            handleActiveMode(false);
            //alert("Profile has been updated");
        }
    }


    

    function filterDays(userWeek, index) {
        if (userWeek.length > 0) {
            let filteredDays = [];
            userWeek.filter(a => {
                let americanDay = new Date(a.from * 1000).getDay();
                if (americanDay === 0 && index === 6) {
                    filteredDays.push({ title: a.title, startDate: new Date(a.from * 1000), endDate: new Date(a.to * 1000) });
                }
                else if (americanDay === index + 1) {
                    filteredDays.push({ title: a.title, startDate: new Date(a.from * 1000), endDate: new Date(a.to * 1000) });
                }
            });
            setFilteredDays(filteredDays);
        }
    }

    /*
    const data = {
        labels: userWeek.map(a => a.day), // optional
        data: [0.6, 0.7, 0.5, 0.8, 0.9]
    };
    */


    //Planned dates


    const [plannedDates, setDates] = useState({
        from: new Date(userWeek[pressedID].from * 1000 + (new Date(Date.now()).getTimezoneOffset() * 60000)),
        to: new Date(userWeek[pressedID].to * 1000 + (new Date(Date.now()).getTimezoneOffset() * 120000))
    });

    console.log(userWeek)



    const handlePlannedDates = (pressedID) => {
        setDates((prevDatesData) => ({
            ...prevDatesData,
            from: new Date(userWeek[pressedID].from * 1000 + (new Date(Date.now()).getTimezoneOffset() * 60000)),
            to: new Date(userWeek[pressedID].to * 1000 + (new Date(Date.now()).getTimezoneOffset() * 60000))
        }));
    }


    const handlePickerChange = (e) => {
        const { name, value } = e;
        setDates((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }



    //Set localy User day
    const handleSetUserWeek = async (pressedID) => {

        handleLoading(true);
        let dateFrom = new Date(plannedDates.from.getTime());
        let dateTo = new Date(plannedDates.to.getTime());


        let fromFirebase = new Date(weekStart + ((pressedID) * dayInSeconds) + (dateFrom.getHours() * hourInSeconds) + (dateFrom.getMinutes() * 60000)).getTime();
        let toFirebase = new Date(weekStart + ((pressedID) * dayInSeconds) + (dateTo.getHours() * hourInSeconds) + (dateTo.getMinutes() * 60000)).getTime();

        //Change
        let newUserWeek = [...userWeek];
        newUserWeek[pressedID] = {
            ...userWeek[pressedID],
            from: fromFirebase / 1000,
            to: toFirebase / 1000,
        }
        //


        let date = {
            day: days[pressedID],
            userID: auth.currentUser.uid,
            title: "",
            from: new Date(fromFirebase),
            to: new Date(toFirebase)
        }

        try {
            if (userWeek[pressedID].docID != "") {
                const datesDocRef = doc(firebaseUserDatesColumn, `${userWeek[pressedID].docID}`);
                await setDoc(datesDocRef, date);
            }
            else {
                await addDoc(firebaseUserDatesColumn, date);
            }
            dispatch(setWeek(newUserWeek));
        } catch (error) {
            handleError(error.message);
        }
        handleLoading(false);
    }

    //Student planning date state. Popup opens on long press

    const [studentPopup, setPopupData] = useState(
        { isVisible: false }
    );

    const handleStudentPopup = (e) => {
        setPopupData(e);
    }


    return (
        <AboutContext.Provider value={{
            user, userInfo, days,
            handleFilteredDays, image, handleImage,
            updateUser, error, nameData,
            loading, handlePressedID, filterDays,
            pressedID, pickImage, isActive, handleActiveMode,
            handlePlannedDates, userWeek, filteredCalendarDays,
            handleSetUserWeek, plannedDates,
            studentPopup, handleStudentPopup,
            handlePickerChange, handleNameChange
        }}>
            {children}
        </AboutContext.Provider>
    );
};

export default AboutContextProvider;