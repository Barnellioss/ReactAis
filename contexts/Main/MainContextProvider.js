import React, { useState } from "react"
import MainContext from "./MainContext"
import {useSelector} from "react-redux"

const MainContextProvider = ({children}) => {
	let {user, userInfo, subjects, userWeek, studentWeek} = useSelector((store) => store.state)

	//day handling
	const [pressedID, setPressed] = useState(0)

	const handlePressedID = (id) => {
		setPressed(id)
	}

    const [filteredCalendarDays, setFilteredDays] = useState([]);

    const handleCalendarDays = (days) => {
        setFilteredDays(days)
    }

    /*
    const [plannedDates, setDates] = useState({
        from: new Date(studentWeek[pressedID].from * 1000 + (new Date(Date.now()).getTimezoneOffset() * 60000)),
        to: new Date(studentWeek[pressedID].to * 1000 + (new Date(Date.now()).getTimezoneOffset() * 120000))
    });


    const handlePlannedDates = (pressedID) => {
        setDates((prevDatesData) => ({
            ...prevDatesData,
            from: new Date(userWeek[pressedID].from * 1000 + (new Date(Date.now()).getTimezoneOffset() * 60000)),
            to: new Date(userWeek[pressedID].to * 1000 + (new Date(Date.now()).getTimezoneOffset() * 60000))
        }));
    }*/

	let days = userWeek.map((a) => a.day)

    function filterDays(userWeek, subjects, index) {
        
        let timetableSubjects = []
        for (let i = 0; i < subjects.length; i++) {
            let item = userWeek.filter((time) => time.subjectID === subjects[i].id)
            if (item.length === 1) {
                timetableSubjects = timetableSubjects.concat({...item[0], title: subjects[i].title})
            }
        }

        if (timetableSubjects.length > 0) {
            let filteredDays = [];
            timetableSubjects.filter(a => {
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
    }

	return (
		<MainContext.Provider
			value={{
				user,
				userInfo,
				days,
                subjects,
                pressedID,
                userWeek,
                studentWeek,
                handlePressedID,
                filterDays,
                filteredCalendarDays,
                handleCalendarDays
			}}
		>
			{children}
		</MainContext.Provider>
	)
}

export default MainContextProvider
