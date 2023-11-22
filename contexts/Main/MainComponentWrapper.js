import React from 'react';
import MainContextProvider from './MainContextProvider';
import MainScreen from '../../Screens/Main';




const MainComponentWrapper = ({ navigation, route }) => {
    return (
        <MainContextProvider>
            <MainScreen navigation={navigation} route={route}/>
        </MainContextProvider>
    );
};

export default MainComponentWrapper;