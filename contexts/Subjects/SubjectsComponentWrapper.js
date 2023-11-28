import React from 'react';
import SubjectsContextProvider from './SubjectsContextProvider';
import SubjectsScreen from '../../Screens/Subjects';




const SubjectsComponentWrapper = ({ navigation, route }) => {
    return (
       <SubjectsContextProvider>
        <SubjectsScreen  navigation={navigation} route={route}/>
       </SubjectsContextProvider>
    );
};

export default SubjectsComponentWrapper;