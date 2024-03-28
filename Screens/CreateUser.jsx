import React, { useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { CustomButton } from '../components/common/Button';
import { windowHeight, windowWidth } from '../constants';
import { useContext } from 'react';
import LoginContext from '../contexts/Login/LoginContext';
import { ActivityIndicator } from 'react-native';
import { signUp } from '../api/api';


function CreateUserScreen({ navigation }) {

    const { error, loading, handleError, calculation, handleLoading} = useContext(LoginContext);


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        copyPassword: ""
    });

   
    const handleInputChange = (e) => {
        const { name, value } = e;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }



    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bg} source={require('../images/Books.jpg')} blurRadius={1}>
                <Text style={styles.title}>Sign Up</Text>
                <KeyboardAvoidingView behavior="padding">
                    <TextInput
                        style={styles.input}
                        value={formData.email}
                        placeholderTextColor="#000"
                        placeholder="Email"
                        autoCapitalize="none"
                        clearButtonMode="always"
                        onChangeText={(value) => handleInputChange({ name: "email", value: value })}></TextInput>
                    <TextInput
                        style={styles.input}
                        value={formData.password}
                        placeholderTextColor="#000"
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        clearButtonMode="always"
                        onChangeText={(value) => handleInputChange({ name: "password", value: value })}></TextInput>
                    <TextInput
                        style={styles.input}
                        value={formData.copyPassword}
                        placeholderTextColor="#000"
                        placeholder="Confirm password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        clearButtonMode="always"
                        onChangeText={(value) => handleInputChange({ name: "copyPassword", value: value })}></TextInput>
                </KeyboardAvoidingView>
                {
                    loading ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <CustomButton onPress={() => {
                            signUp(handleError, calculation, handleLoading, formData);
                        }} title='Create User' state={(formData.password != "" && formData.password === formData.copyPassword) ? "active" : " "} type={"rounded"} />

                }

                {/* <CustomButton onPress={() => navigation.navigate('Login')} title='Have an account' state={"active"} />*/}

                {
                <View style={{position: "absolute", bottom: 150}}>
                    <Text style={error.length > 0 ? styles.textError: styles.invisibleText}>{error.length > 0  ? error : "none"}</Text>   
                </View>
                }
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: "inherit",
    },
    bg: {
        width: windowWidth,
        height: windowHeight,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
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
    title: {
        fontSize: 40,
        color: "#fff",
        marginBottom: 15,
        marginTop: 85
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

export default CreateUserScreen;