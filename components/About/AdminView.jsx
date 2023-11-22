import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { windowHeight, windowWidth } from '../../variables'
import { default as IconAnt } from 'react-native-vector-icons/AntDesign';
import AboutContext from '../../contexts/About/AboutContext'
import Header from '../Header';

const AdminView = ({ navigation, route }) => {

    const { image, pickImage, nameData, isActive, handleActiveMode, userInfo, updateUser, loading, error, handleNameChange } = useContext(AboutContext)



    return (
        userInfo.status === "admin"
            ?
            <View style={styles.container}>
                <ImageBackground style={styles.bg} source={require('../../images/Books.jpg')} blurRadius={1}>
                    <Header navigation={navigation} status={userInfo.status} />
                    <View style={styles.items__wrapper}>
                        <View style={styles.item__wrapper}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.text}>{userInfo.email}</Text>
                        </View>
                        <View style={styles.item__wrapper}>
                            <Text style={styles.label}>Name</Text>
                            {
                                !isActive ?

                                    <Text style={styles.text}>{nameData.name}</Text>
                                    :
                                    <TextInput style={styles.input} value={nameData.name} placeholderTextColor="#000" placeholder="Name" autoCapitalize="none" clearButtonMode="always" onChangeText={(value) => handleNameChange({ name: "name", value: value })}></TextInput>

                            }
                        </View>

                        <View style={styles.item__wrapper}>
                            <Text style={styles.label}>Lastname</Text>
                            {
                                !isActive ?

                                    <Text style={styles.text}>{nameData.lastname}</Text>

                                    :

                                    <TextInput style={styles.input} value={nameData.lastname} placeholderTextColor="#000" placeholder="Lastname" autoCapitalize="none" clearButtonMode="always" onChangeText={(value) => handleNameChange({ name: "lastname", value: value })}></TextInput>

                            }
                        </View>
                        <View style={styles.item__wrapper}>
                            <Text style={{ ...styles.label, marginBottom: 10 }}>Photo</Text>
                            <Button title="Pick an image from camera roll" onPress={pickImage} />
                            {image === "" ? <View></View> : <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        </View>


                        <View style={styles.item__wrapper}>
                            <View style={styles.menu__wrapper}>
                                <Text style={styles.menu__item}></Text>
                                <Text style={styles.menu__item}></Text>
                            </View>
                        </View>

                        <View style={styles.buttons__wrapper}>
                            <TouchableOpacity onPress={() => updateUser(nameData.name, nameData.lastname)}>
                                <Text style={styles.button}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button__bg} onPress={() => handleActiveMode(!isActive)}>
                                <IconAnt name="edit" size={24} color="#000" style={{ textAlign: 'center', height: 40 }} />
                            </TouchableOpacity>
                            {/*
                            <TouchableOpacity style={styles.button__bg} onPress={() => navigation.navigate('Dates')}>
                                <IconAnt name="calendar" size={24} color="#000" style={{ textAlign: 'center', height: 40 }} />
                            </TouchableOpacity>
                            */}
                        </View>
                        <View>
                            {loading ? <ActivityIndicator size="large" color="#0000ff" />
                                :
                                <></>
                            }
                        </View>
                        <View>
                            {error.length > 3 ? <Text style={{ color: "red" }}>Something went frong</Text>
                                :
                                <></>
                            }
                        </View>

                    </View>
                </ImageBackground>
            </View>
            :
            <></>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 5
    },

    items__wrapper: {
        marginTop: 20,
        paddingHorizontal: 10,
        marginBottom: 50,
    },
    item__wrapper: {
        marginTop: 5,
        width: windowWidth - 40
    },
    label: {
        color: "#fff",
        fontSize: 20
    },
    text: {
        color: "#fff",
        fontSize: 16,
    },
    button: {
        color: "#fff",
        fontSize: 16,
        padding: 5,
        backgroundColor: "#000",
        borderRadius: 10
    },
    wrapper: {
        marginTop: 20,
        marginLeft: 20
    },
    input: {
        width: windowWidth * 0.8,
        height: 42,
        color: "#000",
        borderColor: "#fff",
        borderWidth: 1,
        borderStyle: 'solid',
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "#fff"
    },
    button__bg: {
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 35,
        width: 35
    },
    bg: {
        width: windowWidth,
        height: windowHeight,
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    buttons__wrapper: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flex: 1,
        marginTop: 30,
        height: 50,
        width: windowWidth - 30
    },

    menu__wrapper: {
        width: windowWidth * 0.8,
        padding: 5,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    menu__item: {
        width: 0.25 * windowWidth
    }
})




export default AdminView