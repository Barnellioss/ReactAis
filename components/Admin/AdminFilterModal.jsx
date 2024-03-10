import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Pressable } from 'react-native'
import { default as IconSettings } from 'react-native-vector-icons/Feather';
import { default as IconAnt } from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../../constants';
import RNPickerSelect from 'react-native-picker-select';
import { useContext } from 'react';
import AdminContext from '../../contexts/Admin/AdminContext';
import { React, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { default as Entypo } from 'react-native-vector-icons/Entypo';


const AdminFilterModal = ({ navigation }) => {

    const { handleFilterState, handleFilterChange, handleVisibileColumnsChange, filterState, visibleState } = useContext(AdminContext);
    const { usersInfo } = useSelector((store) => store.state);


    return (
        filterState.filterModalVisible ?
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterState.filterModalVisible}
                onRequestClose={() => {
                    handleFilterState(!filterState.filterModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>Settings</Text>
                            <IconSettings name="settings" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
                        </View>
                        
                        <FlatList
                            scrollEnabled={false}
                            contentContainerStyle={{ width: windowWidth * 0.8, minHeight: 150, maxHeight: 150, marginTop: 20, flex: 1, justifyContent: 'center' }}
                            data={Object.keys(visibleState)}
                            numColumns={3}
                            renderItem={({ item }) => {
                                return (
                                    item === "Name" ?
                                        <TouchableOpacity>
                                            <View style={{ ...styles.filterButton, ...styles.filterButtonPermanent }}>
                                                <Text style={styles.filterButtonText}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        visibleState[item] == true ?
                                            <TouchableOpacity onPress={() => handleVisibileColumnsChange(item)}>
                                                <View style={{ ...styles.filterButton, ...styles.filterButtonActive }}>
                                                    <Text style={styles.filterButtonText}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => handleVisibileColumnsChange(item)}>

                                                <View style={styles.filterButton}>
                                                    <Text style={{ ...styles.filterButtonText, color: "#464742" }}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                )
                            }}
                        />


                        <View style={styles.filterList}>
                            <View style={styles.filterListItem}>
                                <Text style={{ width: 50 }}>Name</Text>

                                {
                                    filterState.names == "up" ?
                                        <TouchableOpacity onPress={() => handleFilterChange({ name: "names", value: "down", method: "Sort", sortParam: "lastname" })}>
                                            <IconAnt name="down" style={{ marginTop: 0 }} size={20} color="#000" />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => handleFilterChange({ name: "names", value: "up", method: "Sort", sortParam: "lastname" })}>
                                            <IconAnt name="up" style={{ marginTop: 0 }} size={20} color="#000" />
                                        </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.filterListItem}>
                                <Text style={{ width: 50 }}>Year</Text>

                                <View style={{ width: 120 }}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Filter by year", value: "" }}
                                        value={filterState.currentYear}
                                        onValueChange={(value) => handleFilterChange({ name: "currentYear", value: value, method: "filter", sortParam: "currentYear" })}
                                        items={[...new Set(usersInfo.map(item => item.currentYear))].sort((a, b) => a - b).map(item => ({ label: `${item} Year`, value: `${item}` }))}
                                    />
                                </View>


                                {
                                    filterState.currentYear == "up" ?
                                        <TouchableOpacity onPress={() => handleFilterChange({ name: "currentYear", value: "down", method: "Sort", sortParam: "currentYear" })}>
                                            <IconAnt name="down" style={{ marginTop: 0 }} size={20} color="#000" />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => handleFilterChange({ name: "currentYear", value: "up", method: "Sort", sortParam: "currentYear" })}>
                                            <IconAnt name="up" style={{ marginTop: 0 }} size={20} color="#000" />
                                        </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.filterListItem}>
                                <Text style={{ width: 50 }}>Degree</Text>

                                <View style={{ width: 120 }}>
                                    <RNPickerSelect
                                        value={filterState.degree}
                                        placeholder={{ label: "Filter by degree", value: "" }}
                                        onValueChange={(value) => handleFilterChange({ name: "degree", value: value, method: "filter", sortParam: "degree" })}
                                        items={[...new Set(usersInfo.map(item => item.degree))].map(item => ({ label: `${item}`, value: `${item}` }))}
                                    />
                                </View>

                                <TouchableOpacity>
                                    <FontAwesome name="university" style={{ marginTop: 0 }} size={16} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.filterListItem}>

                                <Text style={{ width: 50 }}>Group</Text>

                                <View style={{ width: 120 }}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Filter by group", value: "" }}
                                        value={filterState.group}
                                        onValueChange={(value) => handleFilterChange({ name: "group", value: value, method: "filter", sortParam: "group" })}
                                        items={[...new Set(usersInfo.map(item => item.group))].sort((a, b) => a - b).map(item => ({ label: `${item}`, value: `${item}` }))}
                                    />
                                </View>

                                <TouchableOpacity>
                                    <FontAwesome name="group" style={{ marginTop: 0 }} size={20} color="#000" />
                                </TouchableOpacity>
                            </View>

                            {/*<CustomButton title='Create account' onPress={() => navigation.navigate('Create User')} type={""} state={"active"} />*/}

                        </View>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleFilterState({ ...filterState, filterModalVisible: !filterState.filterModalVisible })}>
                            <IconAnt name="close" size={20} color="#000" style={{ textAlign: 'center' }} />
                        </Pressable>
                    </View>
                </View>
            </Modal >
            :
            <></>

    )
}


const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 28
    },
    filterButtonText: {
        width: 60,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 20,
        fontSize: 14,
        color: "#fff"
    },

    modalView: {
        margin: 0,
        backgroundColor: 'white',
        padding: 35,
        paddingTop: 20,
        width: windowWidth,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },


    filterButton: {
        width: 80,
        borderColor: "#464742",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 5,
        height: 35,
        paddingVertical: 5
    },

    filterButtonActive: {
        borderColor: '#384357',
        backgroundColor: '#384357',
    },

    filterButtonPermanent: {
        borderColor: '#141F31',
        backgroundColor: '#141F31',
    },

    filterList: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        width: windowWidth * 0.8
    },
    filterListItem: {
        color: "#000",
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    list: {
        marginTop: 10,
        width: windowWidth * 0.9,
        marginHorizontal: 'auto',
    },
    barFirstItem: {
        fontSize: 16,
        color: "#fff",
        width: 120,
        marginLeft: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    barItemLastItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 50,
        height: 25,
        color: "#fff"
    },
    barItem: {
        fontSize: 14,
        color: "#fff",
        width: 70,
        marginLeft: 0,
    },
    barItemText: {
        fontSize: 20,
        color: "#fff"
    },
    listItem: {
        color: "#fff",
        fontSize: 14,
        width: 90,
        paddingBottom: 10,
        marginLeft: 30
    },
    listItemFirstChild: {
        color: "#fff",
        fontSize: 14,
        width: 120,
        paddingBottom: 10,
        marginLeft: 0,
    },

    listItemLastChild: {
        color: "#fff",
        fontSize: 14,
        width: 30,
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'flex-end'
    },

    listItemWrapper: {
        flex: 1,
        paddingVertical: 10,
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    button: {
        marginTop: 50,
        width: 200
    },
    textError: {
        fontSize: 22,
        color: "red",
        fontWeight: "bold",
        textAlign: 'center'
    },
    invisibleText: {
        opacity: 0
    }
});



export default AdminFilterModal;