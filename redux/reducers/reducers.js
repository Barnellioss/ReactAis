import { createSlice } from "@reduxjs/toolkit"



const messageSlice = createSlice({
  name: "message",
  initialState: {
    user: {},
    userInfo: null,
    userWeek: [{ from: "", to: "", day: "Monday", acronym: "M", docID: "" }, { from: "", to: "", day: "Tuesday", acronym: "T", docID: "" }, { from: "", to: "", day: "Wednesday", acronym: "W", docID: "" }, { from: "", to: "", day: "Thursday", acronym: "T", docID: "" }, { from: "", to: "", day: "Friday", acronym: "F", docID: "" }, { from: "", to: "", day: "Saturday", acronym: "S", docID: "" }, { from: "", to: "", day: "Sunday", acronym: "S", docID: "" }],
    studentWeek: [{ from: "", to: "", day: "Monday", acronym: "M", docID: "" }, { from: "", to: "", day: "Tuesday", acronym: "T", docID: "" }, { from: "", to: "", day: "Wednesday", acronym: "W", docID: "" }, { from: "", to: "", day: "Thursday", acronym: "T", docID: "" }, { from: "", to: "", day: "Friday", acronym: "F", docID: "" }, { from: "", to: "", day: "Saturday", acronym: "S", docID: "" }, { from: "", to: "", day: "Sunday", acronym: "S", docID: "" }],
    busyDays: [],
    usersInfo: [],
    usersDates: [],
    groups: [],
    subjects: [],
    subjectsTimetable: []
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },

    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setWeek(state, action) {
      state.userWeek = action.payload
    },
    setStudentWeek(state, action){
      state.studentWeek = action.payload
    },
    setBusyDays(state, action) {
      state.busyDays = action.payload
    },
    setGroups(state, action) {
      state.groups = action.payload
    },
    setUsersInfo(state, action) {
      state.usersInfo = action.payload
    },
    setUsersDates(state, action){
      state.usersDates = action.payload
    },
    setSubjects(state, action) {
      state.subjects = action.payload
    },
    setSubjectsTimetable(state, action) {
      state.subjectsTimetable = action.payload
    },
  }
})


export const { setMessage, setUser, setUserInfo, setWeek, setStudentWeek, setBusyDays, setGroups, setUsersInfo, setSubjects, setUsersDates, setSubjectsTimetable } = messageSlice.actions
export default messageSlice.reducer