import React, {useState} from "react"
import SubjectsContext from "./SubjectsContext"
import {addDoc, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore"
import {firebaseGroupsInfo, firebaseSubjects, firebaseSubjectsTimetable} from "../../firebaseConfig"
import {useDispatch, useSelector} from "react-redux"
import {setGroups, setSubjects, setSubjectsTimetable} from "../../redux/reducers/reducers"
import {dayInSeconds, hourInSeconds, initialSubjectInfo,  semestersYear, weekStart} from "../../constants"

const SubjectsContextProvider = ({children}) => {
	let {userInfo, subjects, groups, userWeek, subjectsTimetable} = useSelector((store) => store.state)
	const dispatch = useDispatch()
	const initialGroup = {group: "", info: "", stage: "", year: 0}
	const initialSubject = {subject: "", semester: "", year: "", teacher: "", info: "", time: 0, id: 0}
	const initialTimetableItem = {
		subject: "",
		from: new Date(Date.now() + new Date(Date.now()).getTimezoneOffset() * 120000),
		to: new Date(Date.now() + new Date(Date.now()).getTimezoneOffset() * 60000)
	}
	
	
	const getSubjects = () => {
		let res = []
		getDocs(query(firebaseSubjects, where("year", "==", SubjectsInfo.year), where("semester", "==", SubjectsInfo.semester))).then((data) => {
			data.docs.forEach((item) => {
				res.push({...item.data(), id: item.id})
			})
			dispatch(setSubjects(JSON.parse(JSON.stringify(res))))
		})
	}

	const getSubjectsTimetable = () => {
		let res = []
		getDocs(query(firebaseSubjectsTimetable)).then((data) => {
			data.docs.forEach((item) => {
				res.push({...item.data()})
			})
                    
			res = res.map((item, i) => {
				return item = {from: item.from.seconds, to: item.to.seconds, subjectID: item.subjectID, id: item.id};
			})
			
			filterDays(res, 0);
			dispatch(setSubjectsTimetable(JSON.parse(JSON.stringify(res))))
		})
	}


	const getGroups = () => {
		let res = []
		getDocs(query(firebaseGroupsInfo, where("year", "==", SubjectsInfo.year))).then((data) => {
			data.docs.forEach((item) => {
				res.push({...item.data(), id: item.id})
			})
			dispatch(setGroups(JSON.parse(JSON.stringify(res))))
		})
	}

	const updateSubject = async (subject) => {
		handleUpdating(true)

		const {id} = subject
		const subjectDocRef = doc(firebaseSubjects, `${id}`)

		try {
			await setDoc(subjectDocRef, subject)
			await updateDoc(subjectDocRef, subject).then(() => {
				getSubjects()
			})
		} catch (e) {
			handleUpdating(false)
			handleError(e.message)
		} finally {
			handleUpdating(false)
			//alert("Profile has been updated");
		}
	}

	const updateGroup = async (group) => {
		handleUpdating(true)

		const {id} = group
		const groupDocRef = doc(firebaseGroupsInfo, `${id}`)

		try {
			await setDoc(groupDocRef, group)
			await updateDoc(groupDocRef, group).then(() => {
				getGroups()
			})
		} catch (e) {
			handleUpdating(false)
			handleError(e.message)
		} finally {
			handleUpdating(false)
			//alert("Profile has been updated");
		}
	}

	const updateSubjectsTimetable = async (timetable) => {

		handleUpdating(true);
		
		timetable = {
			from: new Date(timeForPicker.from.getTime() - (new Date(Date.now()).getTimezoneOffset() * 60000)),
			to: new Date(timeForPicker.to.getTime() - (new Date(Date.now()).getTimezoneOffset() * 60000)),
			subjectID: subjects.filter(item => item.subject === timetable.subject)[0].id,
			id: timetable.id
		}

		handleShowTimetable(timetable.from.getTime() / 1000, timetable.to.getTime() / 1000);
		const {id} = timetable
		const timetableDocRef = doc(firebaseSubjectsTimetable, `${id}`)

		try {
			await setDoc(timetableDocRef, timetable)
			await updateDoc(timetableDocRef, timetable).then(() => {
				getSubjectsTimetable();
			})
		} catch (e) {
			handleUpdating(false)
			handleError(e.message)
		} finally {
			handleUpdating(false)
			//alert("Profile has been updated");
		}

	}

	const deleteSubject = async (id) => {
		handleUpdating(true)

		const subjectDocRef = doc(firebaseSubjects, `${id}`)
		try {
			await deleteDoc(subjectDocRef).then(() => {
				getSubjects()
			})
		} catch (e) {
			handleUpdating(false)
			handleError(e.message)
		} finally {
			handleUpdating(false)
			//alert("Profile has been updated");
		}
	}

	const deleteGroup = async (id) => {
		handleUpdating(true)

		const groupDocRef = doc(firebaseGroupsInfo, `${id}`)
		try {
			await deleteDoc(groupDocRef).then(() => {
				getGroups()
			})
		} catch (e) {
			handleUpdating(false)
			handleError(e.message)
		} finally {
			handleUpdating(false)
			//alert("Profile has been updated");
		}
	}

	const createSubject = async (subject) => {
		handleUpdating(true)

		try {
			await addDoc(firebaseSubjects, subject)
		} catch (e) {
			handleUpdating(false)
			handleError(e.message)
		} finally {
			handleUpdating(false)
			getSubjects()
			handleNewSubject(initialSubject)
		}
	}

	const createGroup = async (group) => {
		handleUpdating(true)

		try {
			await addDoc(firebaseGroupsInfo, group)
		} catch (e) {
			handleUpdating(false)
			handleError(e.message)
		} finally {
			handleUpdating(false)
			getGroups()
			handleNewGroup(initialGroup)
		}
	}

	const createTimetableItem = async (timetable) => {


		let dateFrom = new Date(timetable.from.getTime());
        let dateTo = new Date(timetable.to.getTime());

		const timetableModified = {
			from: new Date(weekStart + ((pressedID) * dayInSeconds) + (dateFrom.getHours() * hourInSeconds) + (dateFrom.getMinutes() * 60000)),
			to: new Date(weekStart + ((pressedID) * dayInSeconds) + (dateTo.getHours() * hourInSeconds) + (dateTo.getMinutes() * 60000)),
			subjectID: subjects.filter(item => item.subject === timetable.subject)[0].id,
			id: timetable.id
		}

		handleUpdating(true)

		try {
			await addDoc(firebaseSubjectsTimetable, timetableModified)
		} catch (e) {
			handleUpdating(false)
			handleError(e.message)
		} finally {
			handleUpdating(false)
			getSubjectsTimetable()
			handleNewTimetable(initialTimetableItem)
		}
	}

	let years = [...new Set(semestersYear.map((item) => item.year))]

	//error handling
	const [error, setError] = useState("CSS")

	const handleError = (error) => {
		setError(error)
	}

	//Popup visibility
	const [SubjectsInfo, setSubjectsInfo] = useState(initialSubjectInfo)

	const handleInfo = (year, semester, mode) => {
		setSubjectsInfo({year: year, semester: semester, mode: mode})
	}

	//Modal modes
	const [modes, setModes] = useState({
		editMode: false,
		createMode: false,
		viewMode: false
	})

	const handleModes = (obj) => {
		setModes({editMode: obj.editMode, createMode: obj.createMode, viewMode: obj.viewMode})
	}

	//Create new group
	const [newGroup, setNewGroup] = useState(initialGroup)

	const handleNewGroup = (group) => {
		setNewGroup(group)
	}

	const resetGroup = () => {
		setNewSubject(initialGroup)
	}

	//Active group
	const [activeGroup, setActiveGroup] = useState({})

	const handleActiveGroup = (group) => {
		setActiveGroup(group)
	}

	const handleActiveGroupChange = (e, handler) => {
		const {name, value} = e

		handler((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	//Create new subject
	const [newSubject, setNewSubject] = useState(initialSubject)

	const handleNewSubject = (subject) => {
		setNewSubject(subject)
	}

	//Create new Timetable item

	const [newTimetable, setTimetable] = useState(initialTimetableItem)

	const handleNewTimetable = (subject) => {
		setTimetable(subject)
	}

	const resetNewTimetable = () => {
		setTimetable(initialTimetableItem)
	}

	const [activeTimetable, setActiveTimetable] = useState({})

	const handleActiveTimetable = (timetable) => {
		setActiveTimetable(timetable)
	}


	const handleTimetableChange = (e, handler) => {
		const {name, value} = e

		handler((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	//reset inputs on popup closed
	const resetSubject = () => {
		setNewSubject(initialSubject)
	}

	//Active edit subject or create handler
	const [activeSubject, setActiveSubject] = useState({})

	const handleActiveSubject = (subject) => {
		setActiveSubject(subject)
	}

	const handleActiveSubjectChange = (e, handler) => {
		const {name, value, keyboardType} = e
		let valueReference = value
		if (keyboardType === "numeric") {
			valueReference = valueReference.replace(/[^0-9]/g, "")
		}
		handler((prevFormData) => ({
			...prevFormData,
			[name]: valueReference
		}))
	}

	const [activeEditMode, setActiveEditMode] = useState(false)

	const handleActiveEditMode = (active) => {
		setActiveEditMode(active)
	}

	// Updating
	const [updating, setUpdating] = useState(false)

	const handleUpdating = (state) => {
		setUpdating(state)
	}

	//Filtered days
	const [filteredCalendarDays, setFilteredDays] = useState([])

	const handleFilteredDays = (calendar) => {
		setFilteredDays(calendar)
	}
	let days = userWeek.map((a) => a.day)

	const [pressedID, setPressed] = useState(0)

	const handlePressedID = (id) => {
		setPressed(id)
	}

	function filterDays(userWeek, index) {
		if (userWeek.length > 0) {
			let filteredDays = []
			userWeek.filter((a) => {
				let americanDay = new Date(a.from * 1000).getDay()
				if (americanDay === 0 && index === 6) {
					filteredDays.push({...a, startDate: new Date(a.from * 1000), endDate: new Date(a.to * 1000)})
				} else if (americanDay === index + 1) {
					filteredDays.push({...a, startDate: new Date(a.from * 1000), endDate: new Date(a.to * 1000)})
				}
			})
			setFilteredDays(filteredDays)
		}
	}

	const [showTimetableTime, setTimetableTime] = useState({from: "", to: ""})
	

	const handleShowTimetable = (from, to) => {
		const fromServerTime = new Date(from * 1000)
		const toServerTime = new Date(to * 1000)

		const fromParsed = `${fromServerTime.getHours()}.${fromServerTime.getMinutes() === 0 ? "00" : fromServerTime.getMinutes() < 10 ? `0${fromServerTime.getMinutes()}` : fromServerTime.getMinutes()}`
		const toParsed = `${toServerTime.getHours()}.${toServerTime.getMinutes() === 0 ? "00" : toServerTime.getMinutes() < 10 ? `0${toServerTime.getMinutes()}` : toServerTime.getMinutes()}`
		setTimetableTime({from: fromParsed, to: toParsed});
	}

	const [timeForPicker, setTimeForPicker] = useState({from: "", to: ""});

	const handleTimeForPicker = (e) => {
		const {name, value} = e;
		setTimeForPicker((prevValues) => ({
			...prevValues, 
			[name]: value
		}));
	}



	return (
		<SubjectsContext.Provider
			value={{
				userInfo,
				setTimeForPicker,
				activeTimetable,
				handleActiveTimetable,
				newTimetable,
				handleNewTimetable,
				resetNewTimetable,
				handleTimetableChange,
				timeForPicker,
				handleTimeForPicker,
				//handlePlannedDates,
				showTimetableTime,
				handleShowTimetable,
				updateSubjectsTimetable, 
				userWeek,
				handleFilteredDays,
				handlePressedID,
				pressedID,
				days,
				getSubjectsTimetable,
				filteredCalendarDays,
				filterDays,
				activeGroup,
				createGroup,
				resetGroup,
				handleActiveGroup,
				handleActiveGroupChange,
				years,
				newGroup,
				handleNewGroup,
				subjects,
				groups,
				getGroups,
				semestersYear,
				getSubjects,
				deleteGroup,
				SubjectsInfo,
				handleInfo,
				modes,
				handleModes,
				updateGroup,
				activeSubject,
				handleActiveSubject,
				handleActiveSubjectChange,
				activeEditMode,
				handleActiveEditMode,
				updating,
				activeEditMode,
				updateSubject,
				deleteSubject,
				handleNewSubject,
				createSubject,
				resetSubject,
				newSubject,
				error,
				createTimetableItem,
				groups,
				subjectsTimetable
			}}
		>
			{children}
		</SubjectsContext.Provider>
	)
}

export default SubjectsContextProvider
