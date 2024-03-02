import React, { useEffect, useState } from 'react';
import AdminContext from './AdminContext';
import { useSelector } from 'react-redux';
import { firebaseGroupsInfo, firebaseUserDatesColumn, firebaseUserInfo } from '../../firebaseConfig';
import { doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setGroups, setUsersDates, setUsersInfo } from '../../redux/reducers/reducers';

const AdminContextProvider = ({ children }) => {

    let { usersInfo, groups, usersDates, userWeek } = useSelector((store) => store.state);

    //Updating loading
    const [isUpdating, setUpdating] = useState(false);
    const dispatch = useDispatch();


    //Filter popup column visibility settings
    const [visibleState, setVisibleState] = useState({
        Name: true,
        Year: true,
        Degree: true,
        Group: false,
        Start: false,
        End: false,
        Graph: false
    });


    const handleFilterVisibleState = (state) => {
        setVisibleState(state);
    }


    const handleVisibileColumnsChange = (e) => {
        setVisibleState({
            ...visibleState,
            [e]: !visibleState[e]
        })
    }

    //Admin user modal setup. Changes visibility for admin page in Popup 
    const [visibleUserSetUp, setUserVisibility] = useState({
        isVisible: false,
        item: {},
        start: "",
        end: "",
    });


    const handleUserPopup = (visibility, item) => {
        let startDate = new Date(item.startDate.seconds * 1000);
        let start = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`;

        let endDate = new Date(item.endDate.seconds * 1000);
        let end = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`;


        setUserVisibility(
            {
                ...visibleUserSetUp,
                isVisible: visibility,
                item: item,
                start: start,
                end: end
            }
        )
    }

    //Filter state, stores chosen filters
    const [filterState, setFilterState] = useState({
        students: [],
        names: "",
        currentYear: "",
        filterModalVisible: false,
        degree: "",
        group: ""
    });

    const handleFilterState = (activeState) => {
        setFilterState(activeState);
    }

    const handleFilterChange = (e) => {
        const { name, value, method, sortParam } = e;

        if (method === "filter") {
            if (isNaN(value) === false) {
                if (+value > 0) {
                    let copy = [...filterState.students];
                    let filtered = copy.filter(item => item[`${sortParam}`] == value);
                    handleFilterState({ ...filterState, students: [...filtered] });
                }
                else {
                    handleFilterState({ ...filterState, students: [...usersInfo] });
                }
            }
            else {
                if (value.length > 0) {
                    let copy = [...filterState.students];
                    let filtered = copy.filter(item => item[`${sortParam}`] === value);
                    handleFilterState({ ...filterState, students: [...filtered] });
                }
                else {
                    handleFilterState({ ...filterState, students: [...usersInfo] });
                }
            }
        }

        if (method === "Sort") {
            if (value === "down") {
                if (typeof filterState.students[0][`${sortParam}`] === "string") {
                    let copy = [...filterState.students];
                    let sorted = copy.sort((a, b) => b[`${sortParam}`].localeCompare(a[`${sortParam}`]));
                    handleFilterState({ ...filterState, [`${sortParam}`]: value, students: [...sorted] });
                }
                else {
                    let copy = [...filterState.students];
                    let sorted = copy.sort((a, b) => b[`${sortParam}`] - (a[`${sortParam}`]));
                    handleFilterState({ ...filterState, [`${sortParam}`]: value, students: [...sorted] });
                }
            }
            else {
                if (typeof filterState.students[0][`${sortParam}`] === "string") {
                    let copy = [...filterState.students];
                    let sorted = copy.sort((a, b) => a[`${sortParam}`].localeCompare(b[`${sortParam}`]));
                    handleFilterState({ ...filterState, [`${sortParam}`]: value, students: [...sorted] });
                }
                else {
                    let copy = [...filterState.students];
                    let sorted = copy.sort((a, b) => a[`${sortParam}`] - b[`${sortParam}`]);
                    handleFilterState({ ...filterState, [`${sortParam}`]: value, students: [...sorted] });
                }
            }
        }

        if (value === "") {
            handleFilterState({ students: usersInfo, names: "", currentYear: "", degree: "", group: "", filterModalVisible: true })
        }

        handleFilterState((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }



    const updateStudent = async (item, data) => {

        setUpdating(true)

        const { userID } = item;
        const userInfoDocRef = doc(firebaseUserInfo, `${userID}`);
        await setDoc(userInfoDocRef, item);


        try {
            await updateDoc(userInfoDocRef, data).then(() => {
                dispatch(setUsersInfo(data));
            })
            getStudents();
        } finally {
            setUpdating(false);
            handleUserPopup(false, data);
            //alert("Profile has been updated");
        }
    }


    const getStudents = () => {
        let res = []
        getDocs(query(firebaseUserInfo, where("status", "==", "student")))
            .then((data) => {
                data.docs.forEach((item) => {
                    res.push(({ ...item.data() }));
                })
            })
            .then((data) => {
                dispatch(setUsersInfo(JSON.parse(JSON.stringify(res))));
                handleFilterState({
                    ...filterState,
                    students: JSON.parse(JSON.stringify(res)),
                })
            })
    }

    const getDatesForStudents = () => {
        let res = [];
        getDocs(query(firebaseUserDatesColumn))
            .then((data) => {
                data.docs.forEach((item) => {
                    res.push(({ ...item.data() }));
                });
                dispatch(setUsersDates(JSON.parse(JSON.stringify(res))));
            });
    }


    function findIndexByKeyValue(array, key, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return -1; 
    }

    const getGroups = () => {
		let res = [];
		getDocs(query(firebaseGroupsInfo, where("year", "==", +visibleUserSetUp.item.currentYear))).then((data) => {
			data.docs.forEach((item) => {
				res.push({...item.data(), id: item.id});
			})
			dispatch(setGroups(JSON.parse(JSON.stringify(res))));
		});
	}


    return (
        <AdminContext.Provider value={{
            visibleUserSetUp, handleUserPopup, filterState,
            setUserVisibility, handleFilterState, handleFilterChange,
            visibleState, handleVisibileColumnsChange,
            getGroups,
            handleFilterVisibleState, updateStudent, isUpdating,
            getStudents, groups, getDatesForStudents, userWeek,
            usersDates, findIndexByKeyValue
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;