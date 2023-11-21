import { View, Text, StyleSheet, ImageBackground, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomButton } from '../components/Button';
import { windowWidth, windowHeight } from '../variables';
import { useContext } from 'react';
import LoginContext from '../contexts/Login/LoginContext';
import store from '../redux/store';



const LoginScreen = ({ navigation }) => {

  const { loading, error, signIn, } = useContext(LoginContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        <Text style={styles.title}>AIS Demo</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput style={styles.input}
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
        </KeyboardAvoidingView>
        {
          loading ? <ActivityIndicator size="large" color="#0000ff" />
            :
            (
              <>
                <CustomButton title='Login' onPress={() => { signIn(formData) }} type={"rounded"} state={"active"} />
                {/*  <CustomButton title='Create account' onPress={() => navigation.navigate('Create User')} type={""} state={"active"} />*/}
                <CustomButton title='Forget password' onPress={() => navigation.navigate('Forget password')} type={"rounded"} state={"danger"} />
              </>
            )
        }
        {
          error.length > 3 ? <Text style={styles.textError}>{error}</Text>
            :
            <Text style={styles.invisibleText}>{error}</Text>
        }
      </ImageBackground>
    </View >
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
  bg: {
    width: windowWidth,
    height: windowHeight,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 50,
    width: 200
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
});

export default LoginScreen