import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGroup, setGroups, setUser, setUserInfo, setWeek } from '../redux/reducers/reducers';
import { getDocs, query, where } from 'firebase/firestore';
import { firebaseAuth, firebaseGroupsInfo, firebaseUserDatesColumn, firebaseUserInfo } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { windowWidth, windowHeight, week, weekStart, weekEnd } from '../variables';
import Timetable from 'react-native-calendar-timetable';
import { Text } from 'react-native';
import Event from '../components/Event';
import Header from '../components/Header';



function MainScreen({ navigation, route }) {

  const dispatch = useDispatch();
  let { userWeek, userInfo, user, groups } = useSelector((store) => store.state);
  //let days = userWeek.map(a => a.day);



  //const range = { from: new Date(weekStart), till: new Date(weekEnd) };
  //const [filteredCalendarDays, setFilteredDays] = useState([]);
  //const [pressedID, setPressed] = useState(0);


  /*
  function filterDays(userWeek, index) {
    if (userWeek.length > 0) {
      let filteredDays = [];
      userWeek.filter(a => {
        let americanDay = new Date(a.from * 1000).getDay();
        if (americanDay === 0 && index === 6) {
          filteredDays.push({ title: a.title, startDate: new Date(a.from * 1000), endDate: new Date(a.to * 1000) });
        }
        else if (americanDay === index + 1) {
          filteredDays.push({ title: a.title, startDate: new Date(a.from * 1000), endDate: new Date(a.to * 1000) });
        }
      });
      setFilteredDays(filteredDays);
    }
  }*/



  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {

      //Get user info from firebase
      if (user != null) {

        let infoRes = [];
        let usersInfoStorage = [];

        getDocs(query(firebaseUserInfo, where("userID", "==", user.uid)))
          .then((data) => {
            data.docs.forEach((item) => {
              usersInfoStorage.push(({ ...item.data() }))
            });
            infoRes = JSON.parse(JSON.stringify(usersInfoStorage));

            getDocs(query(firebaseGroupsInfo), where("year", "==", infoRes[0]?.currentYear))
              .then((snapshot) => {
                let groups = []
                snapshot.docs.forEach((item) => {
                  groups.push(({ ...item.data() }))
                });
                dispatch(setGroups(JSON.parse(JSON.stringify(groups))))
              }).catch(error => {
                console.log(error.message);
              })

            dispatch(setUserInfo(...infoRes))
          }).catch(error => {
            console.log(error.message);
          })


          //Get dates
        let usersStorage = [];
        let res = [];
        getDocs(query(firebaseUserDatesColumn, where("userID", "==", user.uid)))
          .then((snapshot) => {
            snapshot.docs.forEach((item) => {
              usersStorage.push(({ ...item.data() }))
            });

            let parsed = JSON.parse(JSON.stringify(usersStorage))
            userWeek.map((item, i) => {
              let serverDay = parsed.filter(a => a.day === item.day);
              if (serverDay.length === 1) {
                res.push({ ...item, from: serverDay[0].from.seconds, to: serverDay[0].to.seconds, title: serverDay[0].title })
              }
              else {
                res.push(item)
              }
            })
            dispatch(setWeek(res));

            filterDays(res, pressedID);

          }).catch(error => {
            console.log(error.message);
          })
      }

      else {
        dispatch(setWeek(week));
        dispatch(setGroups([]));
      }

    })

  }, [user, navigation])



  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bg} source={require('../images/Books.jpg')} blurRadius={1}>
        <Header navigation={navigation} status={userInfo != null ? userInfo.status : "student"} />
        <ScrollView >
          {/* userWeek != "undefined" ?
            <View style={{ ...styles.item__wrapper, marginBottom: 30, width: windowWidth, flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.days__container}>
                {
                  days != "undefined" ?
                    days.map((item, i) => {
                      return (
                        <View style={{
                          height: 50
                        }} key={i}>
                          <Text onPress={() => { setPressed(i); filterDays(userWeek, i) }}
                            style={pressedID === i ? styles.days__item_active : styles.days__item}>{item.slice(0, 1)}</Text>
                        </View>
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
                  renderItem={props => <Event props={props} key={Math.random() * 10000} />}
                  // provide only one of these
                  range={range}
                />
              </View>
            </View>
            : <></>
          */}
        </ScrollView>
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