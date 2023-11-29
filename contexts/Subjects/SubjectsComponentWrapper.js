import React from 'react';
import SubjectsContextProvider from './SubjectsContextProvider';
import SubjectsScreen from '../../Screens/Subjects';
import SubjectsModal from '../../components/Subjects/SubjectsModal';




const SubjectsComponentWrapper = ({ navigation, route }) => {
    return (
       <SubjectsContextProvider>
        <SubjectsScreen  navigation={navigation} route={route}/>
        <SubjectsModal />
       </SubjectsContextProvider>
    );
};

export default SubjectsComponentWrapper;