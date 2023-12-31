import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../components/Button';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from '../firebaseConfig';
import { Switcher } from '../functions/Firebase__error';
import { windowHeight, windowWidth } from '../variables';

function ForgetPasswordScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const ResetPassword = async () => {
        try {
            let exist = (await fetchSignInMethodsForEmail(firebaseAuth, email)).length;
            if (exist > 0) {
                await sendPasswordResetEmail(firebaseAuth, email).then(() => {
                    alert('Email has been sent');
                    navigation.navigate('Login');
                })
            }
            else {
                setError("User with this email doesn't exit");
            }

        } catch (error) {
            setError(Switcher(error, email));
        }
    }


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bg} source={require('../images/Books.jpg')} blurRadius={1}>
                <Text style={styles.title}>Reset password</Text>
                <TextInput style={styles.input} value={email} placeholderTextColor="#000" placeholder="Email" autoCapitalize="none" clearButtonMode="always" onChangeText={(text) => setEmail(text)}></TextInput>
                <CustomButton onPress={() => ResetPassword()} title='Confirm' state={"active"} type={"rounded"} />
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
    textError: {
        fontSize: 22,
        marginTop: 100,
        color: "red",
        fontWeight: "bold",
        textAlign: 'center'
    },
    invisibleText: {
        opacity: 0
    }
})
export default ForgetPasswordScreen;