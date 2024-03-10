import React, { useState } from 'react';
import LoginContext from './LoginContext';
import { dayInSeconds, startCounting, yearInSeconds } from '../../constants';

const LoginContextProvider = ({ children, navigation }) => {

    const [loading, setLoading] = useState(false);

    const handleLoading = (state) => {
        setLoading(state);
    }

    const [error, setError] = useState("CSS");

    const handleError = (state) => {
        setError(state);
    }

    
    let calculation = (param) => {
        if (param === "start") {
            let currentYear = new Date().getFullYear()
            let YearsBetween = currentYear - new Date(startCounting).getFullYear();
            let plusDays = Math.floor(YearsBetween / 4);
            return (startCounting + (yearInSeconds * YearsBetween + dayInSeconds * plusDays)) / 1000
        }
        if (param === "end") {
            let currentYear = new Date(Date.now() + yearInSeconds * 3).getFullYear()
            let YearsBetween = currentYear - new Date(startCounting).getFullYear();
            let plusDays = Math.floor(YearsBetween / 4);
            return (startCounting + (yearInSeconds * YearsBetween + dayInSeconds * plusDays)) / 1000
        }
    }



    return (
        <LoginContext.Provider value={{ loading, error, handleError, calculation, handleLoading }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;