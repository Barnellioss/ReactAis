import { Dimensions } from "react-native";

export let activeMenu = ["Free days", "Insert free days"];
export let days = [{ acronym: "M", day: "Monday" }, { acronym: "T", day: "Tuesday" }, { acronym: "W", day: "Wednesday" }, { acronym: "T", day: "Thursday" }, { acronym: "F", day: "Friday" }, { acronym: "S", day: "Saturday" }, { acronym: "S", day: "Sunday" }];
export let week = [{ from: "", to: "", day: "Monday", acronym: "M" }, { from: "", to: "", day: "Tuesday", acronym: "T" }, { from: "", to: "", day: "Wednesday", acronym: "W" }, { from: "", to: "", day: "Thursday", acronym: "T" }, { from: "", to: "", day: "Friday", acronym: "F" }, { from: "", to: "", day: "Saturday", acronym: "S" }, { from: "", to: "", day: "Sunday", acronym: "S" }];
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const yearInSeconds = 31536000000;

// 1 September 2020 Date.now() in seconds 
export const startCounting =  1598911200000;

export const dayInSeconds = 86400000;
export const hourInSeconds = 3600000;
export const weekStart = dayInSeconds * 4;
export const weekEnd = dayInSeconds * 11;
export const range = { from: new Date(weekStart), till: new Date(weekEnd) };
