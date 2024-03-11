import { View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Text } from 'react-native'
import React, { useEffect } from 'react'
import { firebaseAuth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { windowWidth, windowHeight, range} from '../constants';
import Header from '../components/common/Header';
import { useContext } from 'react';
import MainContext from '../contexts/Main/MainContext';
import { getDates, getStudentTimetable, getSubjects, getUserInfo } from '../api/api';
import { useDispatch } from 'react-redux';
import Timetable from 'react-native-calendar-timetable';
import Event from '../components/common/Event';



function MainScreen({ navigation, route }) {


  const dispatch = useDispatch();
  const { user, userInfo, studentWeek, days, pressedID, handlePressedID, filterDays, subjects, userWeek, filteredCalendarDays, handleCalendarDays } = useContext(MainContext);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {

      //Get info from firebase
      if (user != null) {
        getUserInfo(dispatch, user);
       

      getDates(dispatch, userWeek, user);
      }

    })

  }, [user, navigation])


  useEffect(() => {
    let semester = new Date().getMonth() > 7  ? "winter" : "summer";

    if(userInfo != null && userInfo.status === "student"){
      getSubjects(dispatch, {year: userInfo.currentYear, semester: semester});
    }
  
  }, [userInfo, navigation]);



  useEffect(() => {
    if(subjects.length > 0 && userInfo.status === "student"){
      getStudentTimetable(dispatch, subjects, handleCalendarDays);
    }
  }, [subjects, navigation])


  useEffect(() => {
    if(subjects.length > 0){
      filterDays(studentWeek, pressedID);
    }
}, [studentWeek[pressedID].from, studentWeek[pressedID].to])



  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bg} source={require('../images/Books.jpg')} blurRadius={1}>
        <Header navigation={navigation} status={userInfo != null ? userInfo.status : "student"} />
           {(userInfo != null && userInfo.status === "student" ) &&
              <ScrollView>

              <View>
                  {studentWeek != "undefined" ?
                      <View style={{ ...styles.item__wrapper, marginBottom: 30, width: windowWidth, flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                          <View style={styles.days__container}>
                              {
                                  days != "undefined" ?
                                      days.map((item, i) => {
                                          return (
                                              <TouchableOpacity
                                                  onPress={() => { handlePressedID(i); filterDays(studentWeek, i) }}
                                                  style={{
                                                      height: 50
                                                  }}
                                                  key={i}>
                                                  <Text
                                                      style={pressedID === i ? styles.days__item_active : styles.days__item}>
                                                      {item.slice(0, 1)}
                                                  </Text>
                                              </TouchableOpacity>
                                          )
                                      })
                                      :
                                      <></>
                              }
                          </View>

                          <View style={{ width: windowWidth * 0.85 }}>
                              <Timetable
                                  fromHour={7.30}
                                  toHour={20.00}
                                  scrollViewProps={{ scrollEnabled: false }}
                                  items={filteredCalendarDays}
                                  hideNowLine={true}
                                  columnWidth={windowWidth * 0.85}
                                  style={{ width: windowWidth * 0.85, marginLeft: 'auto', marginRight: 'auto' }}
                                  renderItem={props => <Event props={props} key={Math.random() * 10000} height={60} width={0.5} left={0.2}/>}
                                  // provide only one of these
                                  range={range}
                              />
                          </View>
                      </View>
                      : <></>
                  }
              </View>
          </ScrollView>
                }
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttons__wrapper: {
    flexDirection: 'row'
  },
  button: {
    color: '#fff',
    fontSize: 20
  },
  header: {
    height: 60,
    backgroundColor: '#878787',
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
    fontSize: 28,
    color: "#fff",
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginRight: 10
  },
  items__wrapper: {
    marginBottom: 50
  },
  item__wrapper: {
    marginTop: 5,
    width: windowWidth - 40
  },
  days__item: {
    height: 40,
    width: 40,
    borderRadius: 20,
    color: "#fff",
    backgroundColor: "#005dff",
    textAlign: "center",
    paddingTop: 8,
    overflow: 'hidden'
  },
  days__item_active: {
    height: 40,
    width: 40,
    borderRadius: 20,
    color: "#fff",
    backgroundColor: "#00286C",
    textAlign: "center",
    paddingTop: 8,
    overflow: 'hidden'
  },
  days__container: {
    maxHeight: 150,
    width: windowWidth * 0.85,
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
})

export default MainScreen