import React, { useEffect, useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { CustomButton } from '../components/Button';
import { windowHeight, windowWidth } from '../variables';
import { useContext } from 'react';
import LoginContext from '../contexts/Login/LoginContext';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebaseConfig';
import { ActivityIndicator } from 'react-native';


function CreateUserScreen({ navigation }) {

    const { error, loading, signUp } = useContext(LoginContext);


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
                        value={formData.сopyPassword}
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
                            signUp(formData);
                        }} title='Create User' state={(formData.password != "" && formData.password === formData.copyPassword) ? "active" : " "} type={"rounded"} />

                }

                {/* <CustomButton onPress={() => navigation.navigate('Login')} title='Have an account' state={"active"} />*/}

                {
                    error.length > 3 ? <Text style={styles.textError}>{error}</Text>
                        :
                        <Text style={styles.invisibleText}>{error}</Text>
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