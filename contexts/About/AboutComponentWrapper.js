import React from 'react';
import AboutContextProvider from './AboutContextProvider';
import AdminView from '../../components/About/AdminView';
import StudentView from '../../components/About/StudentView';
import StudentPopup from '../../components/About/StudentPopup';



const AboutComponentWrapper = ({ navigation, route }) => {

    return (
        <AboutContextProvider>
            <AdminView navigation={navigation} route={route} />
            <StudentView navigation={navigation} route={route} />
            <StudentPopup />
        </AboutContextProvider>
    );
};

export default AboutComponentWrapper;