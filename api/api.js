import { addDoc, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { setGroups, setSubjects, setSubjectsTimetable } from "../redux/reducers/reducers"
import { firebaseGroupsInfo, firebaseSubjects, firebaseSubjectsTimetable } from "../firebaseConfig"
import { dayInSeconds, hourInSeconds, initialSubject, initialTimetableItem, weekStart } from "../constants"

export const getSubjects = (dispatch, SubjectsInfo) => {
    let res = []
    getDocs(query(firebaseSubjects, where("year", "==", SubjectsInfo.year), where("semester", "==", SubjectsInfo.semester))).then((data) => {
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

export const deleteSubject = async (handleUpdating, handleError, id) => {
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


export const getSubjectsTimetable = (dispatch, filterDays) => {
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


export const createTimetableItem = async (dispatch, handleUpdating, handleError, filterDays, subjects, handleNewTimetable, timetable, pressedID) => {


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
        getSubjectsTimetable(dispatch, filterDays)
        handleNewTimetable(initialTimetableItem)
    }
}


export const updateSubjectsTimetable = async (handleUpdating, handleError, handleShowTimetable, subjects, timeForPicker, timetable) => {

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
            getSubjectsTimetable(dispatch, filterDays);
        })
    } catch (e) {
        handleUpdating(false)
        handleError(e.message)
    } finally {
        handleUpdating(false)
        //alert("Profile has been updated");
    }

}