import { createSlice } from "@reduxjs/toolkit"



const messageSlice = createSlice({
  name: "message",
  initialState: {
    user: {},
    userInfo: null,
    userWeek: [{ from: "", to: "", day: "Monday", acronym: "M" }, { from: "", to: "", day: "Tuesday", acronym: "T" }, { from: "", to: "", day: "Wednesday", acronym: "W" }, { from: "", to: "", day: "Thursday", acronym: "T" }, { from: "", to: "", day: "Friday", acronym: "F" }, { from: "", to: "", day: "Saturday", acronym: "S" }, { from: "", to: "", day: "Sunday", acronym: "S" }],
    busyDays: [],
    usersInfo: [],
    groups: []
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
    setBusyDays(state, action) {
      state.busyDays = action.payload
    },
    setGroups(state, action) {
      state.groups = action.payload
    },
    setUsersInfo(state, action) {
      state.usersInfo = action.payload
    },
  }
})


export const { setMessage, setUser, setUserInfo, setWeek, setBusyDays, setGroups, setUsersInfo} = messageSlice.actions
export default messageSlice.reducer