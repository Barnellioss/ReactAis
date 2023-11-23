import React, { useState } from 'react';
import { firebaseAuth, firebaseDB, firebaseUserInfo } from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import LoginContext from './LoginContext';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setUser } from '../../redux/reducers/reducers';
import { Switcher } from '../../functions/Firebase__error';
import { doc, setDoc } from 'firebase/firestore';
import { dayInSeconds, startCounting, yearInSeconds } from '../../variables';

const LoginContextProvider = ({ children, navigation }) => {

    const dispatch = useDispatch();

    const auth = firebaseAuth;

    const [loading, setLoading] = useState(false);

    const handleLoading = (state) => {
        setLoading(state);
    }

    const [error, setError] = useState("CSS");

    const handleError = (state) => {
        setError(state);
    }


    const signIn = async (formData) => {
        setError("CSS");
        handleLoading(true);
        try {
            const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);

            if (user != null) {
                dispatch(setUser({ displayName: user?.displayName, email: user.email, emailVerified: user.emailVerified, photoURL: user?.photoURL, uid: user.uid }));
            }

            if (!user.emailVerified) {
                handleError("Email hasn't been verified");
            }


        } catch (error) {
            handleError(Switcher(error, formData.email));
        } finally {
            handleLoading(false);
        }
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



    const signUp = async (data) => {
       
        setError("CSS");
        handleLoading(true);
        await signOut(auth);

        try {
            const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
            let userData = {
                birthDate: {
                    nanoseconds: Date.now(),
                    seconds: Date.now() / 1000
                },
                currentYear: "1",
                degree: "bachelor",
                email: data.email,
                startDate: {
                    nanoseconds: Date.now(),
                    seconds: calculation("start")
                },
                endDate: {
                    nanoseconds: Date.now(),
                    seconds: calculation("end")
                },
                group: "05",
                name: "John",
                lastname: "Doe",
                status: "student",
                subGroup: [""],
                userID: auth.currentUser.uid
            }

            await sendEmailVerification(auth.currentUser);
            await setDoc(doc(firebaseUserInfo, auth.currentUser.uid), userData);
            await signOut(auth);
            
            //Firebase doesn't provide Admin SDK, for testing only
            signIn({ email: "beautyofglassstore@gmail.com", password: "test123" });
        } catch (error) {
            console.log("Registration failed " + error.message)
            handleError(Switcher(error));
        } finally {
            handleLoading(false);
        }

    }





    return (
        <LoginContext.Provider value={{ loading, error, signIn, signUp }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;