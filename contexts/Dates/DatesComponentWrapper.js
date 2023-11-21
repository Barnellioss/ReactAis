import React from 'react';
import UserDatesScreen from '../../Screens/UserDates';
import DatesContextProvider from './DatesContextProvider';




const DatesComponentWrapper = ({ navigation, route }) => {
    return (
        <DatesContextProvider>
            <UserDatesScreen navigation={navigation} route={route} />
        </DatesContextProvider>
    );
};

export default DatesComponentWrapper;