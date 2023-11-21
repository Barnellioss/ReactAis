import React from 'react';
import LoginContextProvider from './LoginContextProvider';
import CreateUserScreen from '../../Screens/CreateUser';



const CreateUserComponentWrapper = ({ navigation, route }) => {
    return (
        <LoginContextProvider>
            <CreateUserScreen navigation={navigation} route={route} />
        </LoginContextProvider>
    );
};

export default CreateUserComponentWrapper;