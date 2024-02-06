import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { firebaseAuth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { windowWidth, windowHeight} from '../variables';
import Header from '../components/common/Header';
import { useContext } from 'react';
import MainContext from '../contexts/Main/MainContext';



function MainScreen({ navigation, route }) {

  const { getUserInfo, getDates, user, userInfo } = useContext(MainContext);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {

      //Get info from firebase
      if (user != null) {
        getUserInfo(user);
        getDates(user);
      }

    })

  }, [user, navigation])



  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bg} source={require('../images/Books.jpg')} blurRadius={1}>
        <Header navigation={navigation} status={userInfo != null ? userInfo.status : "student"} />
        <ScrollView>
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