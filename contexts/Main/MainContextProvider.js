import React from 'react';
import MainContext from './MainContext';
import {useSelector } from 'react-redux';

const MainContextProvider = ({ children }) => {

    let { userWeek, user, userInfo } = useSelector((store) => store.state);


    return (
        <MainContext.Provider value={{
            user, userInfo, userWeek
        }}>
            {children}
        </MainContext.Provider>
    );
};

export default MainContextProvider;