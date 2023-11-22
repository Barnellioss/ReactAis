import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebaseConfig';
import ForgetPasswordScreen from './Screens/ForgetPassword';
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminComponentWrapper from './contexts/Admin/AdminComponentWrapper';
import LoginComponentWrapper from './contexts/Login/LoginComponentWrapper';
import CreateUserComponentWrapper from './contexts/Login/CreateUserComponentWrapper';
import AboutComponentWrapper from './contexts/About/AboutComponentWrapper';
import MainComponentWrapper from './contexts/Main/MainComponentWrapper';


const Stack = createNativeStackNavigator()

export default function App({ navigation }) {

  const [user, setFirebaseUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user !== null) {
        if (user.emailVerified === true) {
          setFirebaseUser(user);
        }
      }
      else {
        setFirebaseUser(null);
      }
    })
  }, [user]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='/Login'>
          {user ?
            <Stack.Screen name='Main' component={MainComponentWrapper} initialParams={{}}
              options={({ navigation }) => ({
                headerShown: false
              })} />
            :
            <Stack.Screen name='Login' component={LoginComponentWrapper} options={({ navigation }) => ({
              title: "",
              headerShown: false,
              headerTransparent: true,
            })} />
          }
          <Stack.Screen name='Create User' component={CreateUserComponentWrapper} options={({ navigation }) => ({
            headerRight: () => { },
            title: "",
            headerShown: true,
            headerTransparent: true,
            headerLeft: () => (
              (
                <View style={styles.headerTransparent}>
                  <Text style={{ color: "#fff", fontSize: 24, marginLeft: 10 }} onPress={() => { navigation.navigate("Admin"); }}>Back</Text>
                </View>
              ))
          })} />

          <Stack.Screen name='About Screen' component={AboutComponentWrapper} initialParams={{}} options={({ navigation }) => ({
            headerShown: false
          })} />

          <Stack.Screen name='Forget password' component={ForgetPasswordScreen} options={({ navigation }) => ({
            headerRight: () => { },
            title: "",
            headerShown: true,
            headerTransparent: true,
            headerLeft: () => (
              (
                <View style={styles.headerTransparent}>
                  <Text style={{ color: "#fff", fontSize: 24, marginLeft: 10 }} onPress={() => navigation.navigate("Login")}>Back</Text>
                </View>
              ))
          })} />

          <Stack.Screen name='Admin' component={AdminComponentWrapper} options={({ navigation }) => ({
            title: "",
            headerShown: false,
            headerTransparent: true,
          })} />

        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontWeight: 600,
    color: "#c4302b",
    padding: 5,
    fontSize: 16,
    marginRight: -10
  },
  icon: {
    height: 25,
    width: 25,
    borderRadius: 50,
    zIndex: 10,
    marginRight: 5,
  },
  buttons__wrapper: {
    flexDirection: 'row',
    alignItems: "center",
    marginRight: 10
  },
  headerTransparent: {
    backgroundColor: "transparent"
  }
});
