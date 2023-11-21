import React from 'react';
import LoginScreen from '../../Screens/Login';
import LoginContextProvider from './LoginContextProvider';



const LoginComponentWrapper = ({ navigation, route }) => {
    return (
        <LoginContextProvider>
            <LoginScreen navigation={navigation} route={route} />
        </LoginContextProvider>
    );
};

export default LoginComponentWrapper;