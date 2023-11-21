import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AboutContext from './AboutContext';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseUserInfo } from '../../firebaseConfig';
import { setUserInfo } from '../../redux/reducers/reducers';
import { weekEnd, weekStart } from '../../variables';


const AboutContextProvider = ({ children }) => {

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
            setError(error.message);
        }
        finally {
            handleLoading(false);
            handleActiveMode(false);
            //alert("Profile has been updated");
        }
    }


    //Range for calendar. From Monday: 5.01.1970, to Monday: 12.01.1970
    const range = { from: new Date(weekStart), till: new Date(weekEnd) };


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



    return (
        <AboutContext.Provider value={{
            user, userInfo, days,
            handleFilteredDays, image, handleImage,
            updateUser, error, nameData,
            loading, handlePressedID, filterDays,
            pressedID, pickImage, isActive, handleActiveMode,
            handleNameChange, userWeek, filteredCalendarDays
        }}>
            {children}
        </AboutContext.Provider>
    );
};

export default AboutContextProvider;