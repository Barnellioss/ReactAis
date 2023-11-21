import React from 'react';
import AboutScreen from '../../Screens/About';
import AboutContextProvider from './AboutContextProvider';
import AdminView from '../../components/About/AdminView';
import StudentView from '../../components/About/StudentView';
import { ScrollView } from 'react-native';



const AboutComponentWrapper = ({ navigation, route }) => {

    return (
        <AboutContextProvider>
            <AboutScreen navigation={navigation} route={route} />
            <ScrollView>
                <AdminView navigation={navigation} route={route} />
                <StudentView navigation={navigation} route={route} />
            </ScrollView>
        </AboutContextProvider>
    );
};

export default AboutComponentWrapper;