import React, {useState} from "react"
import SubjectsContext from "./SubjectsContext"
import {useSelector} from "react-redux"
import {addDoc, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore"
import {firebaseSubjects} from "../../firebaseConfig"
import {useDispatch} from "react-redux"
import {setSubjects} from "../../redux/reducers/reducers"
import {semestersYear} from "../../constants"

const SubjectsContextProvider = ({children}) => {
	let {userInfo, subjects, groups} = useSelector((store) => store.state)
	const dispatch = useDispatch()

	const getSubjects = () => {
		let res = []
		getDocs(query(firebaseSubjects, where("year", "==", SubjectsInfo.year), where("semester", "==", SubjectsInfo.semester))).then((data) => {
			data.docs.forEach((item) => {
				res.push({...item.data(), id: item.id})
			})
			dispatch(setSubjects(JSON.parse(JSON.stringify(res))))
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
			handleNewSubject({subject: "", semester: "", year: "", teacher: "", info: "", id: 0})
		}
	}

	let years = [...new Set(semestersYear.map((item) => item.year))]

	//error handling
	const [error, setError] = useState("CSS")

	const handleError = (error) => {
		setError(error)
	}

	//Popup visibility
	const [SubjectsInfo, setSubjectsInfo] = useState({
		year: 0,
		semester: "",
		mode: ""
	})

	console.log(SubjectsInfo)

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

	//Create new subject
	const [newSubject, setNewSubject] = useState({subject: "", semester: "", year: "", teacher: "", info: "", id: 0})

	const handleNewSubject = (subject) => {
		setNewSubject(subject)
	}

	//reset inputs on popup closed
	const resetSubject = () => {
		setNewSubject({subject: "", semester: "", year: "", teacher: "", info: "", id: 0})
	}

	//Active edit subject or create handler
	const [activeSubject, setActiveSubject] = useState({})

	const handleActiveSubject = (subject) => {
		setActiveSubject(subject)
	}

	const handleActiveSubjectChange = (e, handler) => {
		const {name, value} = e
		handler((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	const [activeEditMode, setActiveEditMode] = useState(false)

	const handleActiveEditMode = (active) => {
		setActiveEditMode(active)
	}

	const [updating, setUpdating] = useState(false)

	const handleUpdating = (state) => {
		setUpdating(state)
	}

	return (
		<SubjectsContext.Provider
			value={{
				userInfo,
				years,
				subjects,
				semestersYear,
				getSubjects,
				SubjectsInfo,
				handleInfo,
				modes,
				handleModes,
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
				groups
			}}
		>
			{children}
		</SubjectsContext.Provider>
	)
}

export default SubjectsContextProvider
