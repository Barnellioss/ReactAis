import React from 'react';
import AdminContextProvider from './AdminContextProvider';
import AdminScreen from '../../Screens/Admin';
import AdminUserModal from '../../components/Admin/AdminUserModal';
import AdminFilterModal from '../../components/Admin/AdminFilterModal';



const AdminComponentWrapper = ({ navigation, route }) => {
    return (
        <AdminContextProvider>
            <AdminScreen navigation={navigation} route={route} />
            <AdminUserModal />
            <AdminFilterModal navigation={navigation} route={route} />
        </AdminContextProvider>
    );
};

export default AdminComponentWrapper;