import {addDoc, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore"
import {setGroups, setStudentWeek, setSubjects, setSubjectsTimetable, setUser, setUserInfo, setUsersDates, setUsersInfo, setWeek} from "../redux/reducers/reducers"
import {firebaseAuth, firebaseGroupsInfo, firebaseSubjects, firebaseSubjectsTimetable, firebaseUserDatesColumn, firebaseUserInfo} from "../firebaseConfig"
import {dayInSeconds, hourInSeconds, initialGroup, initialSubject, initialTimetableItem, weekStart} from "../constants"
import {createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {Switcher} from "../functions/Firebase__error"

//Subject actions
export const getSubjects = (dispatch, SubjectsInfo) => {
	let res = []
	getDocs(query(firebaseSubjects, where("year", "==", +SubjectsInfo.year), where("semester", "==", SubjectsInfo.semester))).then((data) => {
		data.docs.forEach((item) => {
			res.push({...item.data(), id: item.id})
		})
		dispatch(setSubjects(JSON.parse(JSON.stringify(res))))
	})
}

export const updateSubject = async (dispatch, SubjectsInfo, handleError, handleUpdating, subject) => {
	handleUpdating(true)

	const {id} = subject
	const subjectDocRef = doc(firebaseSubjects, `${id}`)

	try {
		await setDoc(subjectDocRef, subject)
		await updateDoc(subjectDocRef, subject).then(() => {
			getSubjects(dispatch, SubjectsInfo)
		})
	} catch (e) {
		handleUpdating(false)
		handleError(e.message)
	} finally {
		handleUpdating(false)
	}
}

export const createSubject = async (dispatch, handleUpdating, handleError, handleNewSubject, subject) => {
	handleUpdating(true)

	try {
		await addDoc(firebaseSubjects, subject)
	} catch (e) {
		handleUpdating(false)
		handleError(e.message)
	} finally {
		handleUpdating(false)
		getSubjects(dispatch, SubjectsInfo)
		handleNewSubject(initialSubject)
	}
}

export const deleteSubject = async (dispatch, handleUpdating, handleError, SubjectsInfo, id) => {
	handleUpdating(true)

	const subjectDocRef = doc(firebaseSubjects, `${id}`)
	try {
		await deleteDoc(subjectDocRef).then(() => {
			getSubjects(dispatch, SubjectsInfo)
		})
	} catch (e) {
		handleUpdating(false)
		handleError(e.message)
	} finally {
		handleUpdating(false)
		//alert("Profile has been updated");
	}
}

//Timetable actions

export const getSubjectsTimetable = (dispatch, filterDays) => {
	let res = []
	getDocs(query(firebaseSubjectsTimetable)).then((data) => {
		data.docs.forEach((item) => {
			res.push({...item.data()})
		})

		res = res.map((item, i) => {
			return (item = {from: item.from.seconds, to: item.to.seconds, subjectID: item.subjectID, id: item.id})
		})

		filterDays(res, 0)
		dispatch(setSubjectsTimetable(JSON.parse(JSON.stringify(res))))
	})
}

export const createTimetableItem = async (dispatch, handleUpdating, handleError, filterDays, subjects, handleNewTimetable, timetable, pressedID) => {
	let dateFrom = new Date(timetable.from.getTime())
	let dateTo = new Date(timetable.to.getTime())

	const timetableModified = {
		from: new Date(weekStart + pressedID * dayInSeconds + dateFrom.getHours() * hourInSeconds + dateFrom.getMinutes() * 60000),
		to: new Date(weekStart + pressedID * dayInSeconds + dateTo.getHours() * hourInSeconds + dateTo.getMinutes() * 60000),
		subjectID: subjects.filter((item) => item.subject === timetable.subject)[0].id,
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
		getSubjectsTimetable(dispatch, filterDays)
		handleNewTimetable(initialTimetableItem)
	}
}

export const updateSubjectsTimetable = async (dispatch, handleUpdating, handleError, filterDays, handleShowTimetable, subjects, timeForPicker, timetable) => {
	handleUpdating(true)

	timetable = {
		from: new Date(timeForPicker.from.getTime() - new Date(Date.now()).getTimezoneOffset() * 60000),
		to: new Date(timeForPicker.to.getTime() - new Date(Date.now()).getTimezoneOffset() * 60000),
		subjectID: subjects.filter((item) => item.subject === timetable.subject)[0].id,
		id: timetable.id
	}

	handleShowTimetable(timetable.from.getTime() / 1000, timetable.to.getTime() / 1000)
	const {id} = timetable
	const timetableDocRef = doc(firebaseSubjectsTimetable, `${id}`)

	try {
		await setDoc(timetableDocRef, timetable)
		await updateDoc(timetableDocRef, timetable)
	} catch (e) {
		handleUpdating(false)
		handleError(e.message)
	} finally {
		getSubjectsTimetable(dispatch, filterDays)
		handleUpdating(false)
		//alert("Profile has been updated");
	}
}

export const deleteTimetableItem = async (dispatch, handleUpdating, handleError, id, filterDays) => {
	handleUpdating(true)

	const timetableItemDocRef = doc(firebaseSubjectsTimetable, `${id}`)
	try {
		await deleteDoc(timetableItemDocRef).then(() => {
			getSubjectsTimetable(dispatch, filterDays)
		})
	} catch (e) {
		handleUpdating(false)
		handleError(e.message)
	} finally {
		handleUpdating(false)
		//alert("Profile has been updated");
	}
}

//Group action

export const getGroups = (dispatch, SubjectsInfo) => {
	let res = []
	getDocs(query(firebaseGroupsInfo, where("year", "==", +SubjectsInfo.year))).then((data) => {
		data.docs.forEach((item) => {
			res.push({...item.data(), id: item.id})
		})
		dispatch(setGroups(JSON.parse(JSON.stringify(res))))
	})
}

export const updateGroup = async (dispatch, handleError, handleUpdating, group) => {
	handleUpdating(true)

	const {id, year} = group
	const groupDocRef = doc(firebaseGroupsInfo, `${id}`)

	try {
		await setDoc(groupDocRef, group)
		await updateDoc(groupDocRef, group).then(() => {
			getGroups(dispatch, {year: year})
		})
	} catch (e) {
		handleUpdating(false)
		handleError(e.message)
	} finally {
		handleUpdating(false)
		//alert("Profile has been updated");
	}
}

export const deleteGroup = async (dispatch, handleUpdating, handleError, item) => {
	handleUpdating(true)

	const groupDocRef = doc(firebaseGroupsInfo, `${item.id}`)
	try {
		await deleteDoc(groupDocRef).then(() => {
			getGroups(dispatch, {year: item.year})
		})
	} catch (e) {
		handleUpdating(false)
		handleError(e.message)
	} finally {
		handleUpdating(false)
		//alert("Profile has been updated");
	}
}

export const createGroup = async (dispatch, handleUpdating, handleError, handleNewGroup, group) => {
	handleUpdating(true)

	try {
		await addDoc(firebaseGroupsInfo, group)
	} catch (e) {
		handleUpdating(false)
		handleError(e.message)
	} finally {
		handleUpdating(false)
		getGroups(dispatch, {year: group.year})
		handleNewGroup(initialGroup)
	}
}

//Students

export const getStudents = (dispatch, handleFilterState, filterState) => {
	let res = []
	getDocs(query(firebaseUserInfo, where("status", "==", "student")))
		.then((data) => {
			data.docs.forEach((item) => {
				res.push({...item.data()})
			})
		})
		.then((data) => {
			dispatch(setUsersInfo(JSON.parse(JSON.stringify(res))))
			handleFilterState({
				...filterState,
				students: JSON.parse(JSON.stringify(res))
			})
		})
}

export const getDatesForStudents = (dispatch) => {
	let res = []
	getDocs(query(firebaseUserDatesColumn)).then((data) => {
		data.docs.forEach((item) => {
			res.push({...item.data()})
		})
		dispatch(setUsersDates(JSON.parse(JSON.stringify(res))))
	})
}

export const updateStudent = async (dispatch, handleUpdating, handleUserPopup, item, data) => {
	handleUpdating(true)

	const {userID} = item
	const userInfoDocRef = doc(firebaseUserInfo, `${userID}`)
	await setDoc(userInfoDocRef, item)

	try {
		await updateDoc(userInfoDocRef, data).then(() => {
			dispatch(setUsersInfo(data))
		})
		getStudents()
	} finally {
		handleUpdating(false)
		handleUserPopup(false, data)
		//alert("Profile has been updated");
	}
}

//Main

export const getUserInfo = (dispatch, user) => {
	let infoRes = []
	let usersInfoStorage = []

	getDocs(query(firebaseUserInfo, where("userID", "==", user.uid)))
		.then((data) => {
			data.docs.forEach((item) => {
				usersInfoStorage.push({...item.data()})
			})
			infoRes = JSON.parse(JSON.stringify(usersInfoStorage))

			//After userInfo get, get group
			getDocs(query(firebaseGroupsInfo), where("year", "==", infoRes[0]?.currentYear))
				.then((snapshot) => {
					let groups = []
					snapshot.docs.forEach((item) => {
						groups.push({...item.data()})
					})
					dispatch(setGroups(JSON.parse(JSON.stringify(groups))))
				})
				.catch((error) => {
					console.log(error.message)
				})

			dispatch(setUserInfo(...infoRes))
		})
		.catch((error) => {
			console.log(error.message)
		})
}

export const getDates = (dispatch, userWeek, user) => {
	if (user != null) {
		//Get dates
		let usersStorage = []
		let res = []
		getDocs(query(firebaseUserDatesColumn, where("userID", "==", user.uid)))
			.then((snapshot) => {
				snapshot.docs.forEach((item) => {
					usersStorage.push({...item.data(), docID: item.id})
				})

				let parsed = JSON.parse(JSON.stringify(usersStorage))

				userWeek.map((item, i) => {
					let serverDay = parsed.filter((a) => a.day === item.day)
					if (serverDay.length === 1) {
						res.push({...item, from: serverDay[0].from.seconds, to: serverDay[0].to.seconds, title: serverDay[0].title, docID: serverDay[0].docID})
					} else {
						res.push(item)
					}
				})
				dispatch(setWeek(res))
			})
			.catch((error) => {
				console.log(error.message)
			})
	} else {
		dispatch(setWeek(week))
		dispatch(setGroups([]))
	}
}

//Login

const auth = firebaseAuth

export const signIn = async (dispatch, handleError, handleLoading, formData) => {
	handleLoading(true)
	try {
		const {user} = await signInWithEmailAndPassword(auth, formData.email, formData.password)

		if (user != null) {
			dispatch(setUser({displayName: user?.displayName, email: user.email, emailVerified: user.emailVerified, photoURL: user?.photoURL, uid: user.uid}))
		}

		if (!user.emailVerified) {
			handleError("Email hasn't been verified")
		}
	} catch (error) {
		handleError(Switcher(error, formData.email))
	} finally {
		handleLoading(false)
	}
}

export const signUp = async (handleError, calculation, handleLoading, data) => {

	handleLoading(true)
	await signOut(auth)

	try {
		const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
		let userData = {
			birthDate: {
				nanoseconds: Date.now(),
				seconds: Date.now() / 1000
			},
			currentYear: "1",
			degree: "bachelor",
			email: data.email,
			startDate: {
				nanoseconds: Date.now(),
				seconds: calculation("start")
			},
			endDate: {
				nanoseconds: Date.now(),
				seconds: calculation("end")
			},
			group: "05",
			name: "John",
			lastname: "Doe",
			status: "student",
			subGroup: [""],
			userID: auth.currentUser.uid
		}

		await sendEmailVerification(auth.currentUser)
		await setDoc(doc(firebaseUserInfo, auth.currentUser.uid), userData)
		await signOut(auth)

		//Firebase doesn't provide Admin SDK, for testing only
		signIn({email: process.env.ADMIN_EMAIL, password:  process.env.ADMIN_PASSWORD})
	} catch (error) {
		console.log("Registration failed " + error.message)
		handleError(Switcher(error))
	} finally {
		handleLoading(false)
	}
}

//ForgetPassword
export const ResetPassword = async (navigation, handleError, email) => {
	try {
		let exist = (await fetchSignInMethodsForEmail(auth, email)).length
		if (exist > 0) {
			await sendPasswordResetEmail(auth, email).then(() => {
				alert("Email has been sent")
				navigation.navigate("Login")
			})
		} else {
			handleError("User with this email doesn't exit")
		}
	} catch (error) {
		handleError(Switcher(error, email))
	}
}

//Main Student Group timetable

export const getStudentTimetable = async (dispatch, subjects) => {
	try {

		let res = []

		getDocs(query(firebaseSubjectsTimetable)).then((data) => {
			data.docs.forEach((item) => {
				res.push({...item.data()})
			})

			res = res.map((item, i) => {
				let subject = subjects.filter(a => a.id === item.subjectID)
				
				return {from: item.from.seconds, to: item.to.seconds, subjectID: item.subjectID, subject: subject.length > 0 ? subject[0].subject : "", id: item.id} 
			})
			
			
			dispatch(setStudentWeek(JSON.parse(JSON.stringify(res))));
		})
	} catch (error) {
		console.log(error)
	}
}
