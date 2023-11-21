import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebaseConfig';
import { windowHeight, windowWidth } from '../variables';
import { default as IconAnt } from 'react-native-vector-icons/AntDesign';
import { default as IconMaterial } from 'react-native-vector-icons/MaterialIcons';




export default function Header({ navigation, status }) {


  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text style={styles.title}>AIS Demo</Text>
      </TouchableOpacity>
      <View style={styles.buttons__wrapper}>
        {
          status === "admin" ?
            <View style={{ display: "flex", flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
                <IconMaterial name="admin-panel-settings" style={{ color: "#57707a", marginRight: 10 }} size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('About Screen')}>
                < IconAnt style={{ color: "#57707a", marginRight: 10 }} size={20} name='user' />
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={() => navigation.navigate('About Screen')}>
              < IconAnt style={{ color: "#57707a", marginRight: 10 }} size={20} name='calendar' />
            </TouchableOpacity>
        }

        <Text style={styles.button} onPress={async () => {
          navigation.navigate('Main');
          await signOut(firebaseAuth);
        }}>Sign out</Text>
      </View>
    </View >
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: "inherit",
  },
  buttons__wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    color: '#BE3152',
    fontSize: 16
  },
  header: {
    height: 70,
    paddingTop: 20,
    backgroundColor: '#c5bac4',
    width: windowWidth,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bg: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'flex-start',
    flex: 1,
    alignContent: 'flex-start'
  },
  title: {
    fontSize: 20,
    color: "#191d23",
  }
})
