import React, { useState } from 'react';
import MainContext from './MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth, firebaseGroupsInfo, firebaseUserDatesColumn, firebaseUserInfo } from '../../firebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';
import { setGroups, setUserInfo, setWeek } from '../../redux/reducers/reducers';

const MainContextProvider = ({ children }) => {

    const dispatch = useDispatch();
    let { userWeek, user, userInfo } = useSelector((store) => store.state);


    const getUserInfo = (user) => {

        let infoRes = [];
        let usersInfoStorage = [];

        getDocs(query(firebaseUserInfo, where("userID", "==", user.uid)))
            .then((data) => {
                data.docs.forEach((item) => {
                    usersInfoStorage.push(({ ...item.data() }))
                });
                infoRes = JSON.parse(JSON.stringify(usersInfoStorage));

            //After userInfo get, get group
                getDocs(query(firebaseGroupsInfo), where("year", "==", infoRes[0]?.currentYear))
                    .then((snapshot) => {
                        let groups = []
                        snapshot.docs.forEach((item) => {
                            groups.push(({ ...item.data() }))
                        });
                        dispatch(setGroups(JSON.parse(JSON.stringify(groups))))
                    }).catch(error => {
                        console.log(error.message);
                    })

                dispatch(setUserInfo(...infoRes))
            }).catch(error => {
                console.log(error.message);
            })
    }



    const getDates = (user) => {
        if (user != null) {
            //Get dates
            let usersStorage = [];
            let res = [];
            getDocs(query(firebaseUserDatesColumn, where("userID", "==", user.uid)))
                .then((snapshot) => {
                    snapshot.docs.forEach((item) => {
                        usersStorage.push(({ ...item.data(), docID: item.id }))
                    });

                    let parsed = JSON.parse(JSON.stringify(usersStorage));
                    
                    userWeek.map((item, i) => {
                        let serverDay = parsed.filter(a => a.day === item.day);
                        if (serverDay.length === 1) {
                            res.push({ ...item, from: serverDay[0].from.seconds, to: serverDay[0].to.seconds, title: serverDay[0].title, docID: serverDay[0].docID })
                        }
                        else {
                            res.push(item)
                        }
                    })
                    dispatch(setWeek(res));

                }).catch(error => {
                    console.log(error.message);
                })
        }

        else {
            dispatch(setWeek(week));
            dispatch(setGroups([]));
        }
    }


    return (
        <MainContext.Provider value={{
            getUserInfo, getDates, user, userInfo
        }}>
            {children}
        </MainContext.Provider>
    );
};

export default MainContextProvider;