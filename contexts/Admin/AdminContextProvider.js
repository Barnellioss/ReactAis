import React, {useState} from "react"
import AdminContext from "./AdminContext"
import {useSelector} from "react-redux"

const AdminContextProvider = ({children}) => {
	let {usersInfo, groups, usersDates, userWeek} = useSelector((store) => store.state)

	//Updating loading
	const [isUpdating, setUpdating] = useState(false)

	const handleUpdating = (value) => {
		setUpdating(value)
	}

	//Filter popup column visibility settings
	const [visibleState, setVisibleState] = useState({
		Name: true,
		Year: true,
		Degree: true,
		Group: false,
		Start: false,
		End: false,
		Graph: false
	})


	const handleFilterVisibleState = (state) => {
		setVisibleState(state)
	}

	const handleVisibileColumnsChange = (e) => {
		if ((Object.values(visibleState).filter((item) => item === true).length < 3 || visibleState[e] === true)) {
			setVisibleState({
				...visibleState,
				[e]: !visibleState[e]
			})
		}
	}

	//Admin user modal setup. Changes visibility for admin page in Popup
	const [visibleUserSetUp, setUserVisibility] = useState({
		isVisible: false,
		item: {},
		start: "",
		end: ""
	})

	const handleUserPopup = (visibility, item) => {
		let startDate = new Date(item.startDate.seconds * 1000)
		let start = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`

		let endDate = new Date(item.endDate.seconds * 1000)
		let end = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`

		setUserVisibility({
			...visibleUserSetUp,
			isVisible: visibility,
			item: item,
			start: start,
			end: end
		})
	}

	//Filter state, stores chosen filters
	const [filterState, setFilterState] = useState({
		students: [],
		names: "",
		currentYear: "",
		filterModalVisible: false,
		degree: "",
		group: ""
	})

	const handleFilterState = (activeState) => {
		setFilterState(activeState)
	}

	const handleFilterChange = (e) => {
		const {name, value, method, sortParam} = e

		if (method === "filter") {
			if (isNaN(value) === false) {
				if (+value > 0) {
					let copy = [...filterState.students]
					let filtered = copy.filter((item) => item[`${sortParam}`] == value)
					handleFilterState({...filterState, students: [...filtered]})
				} else {
					handleFilterState({...filterState, students: [...usersInfo]})
				}
			} else {
				if (value.length > 0) {
					let copy = [...filterState.students]
					let filtered = copy.filter((item) => item[`${sortParam}`] === value)
					handleFilterState({...filterState, students: [...filtered]})
				} else {
					handleFilterState({...filterState, students: [...usersInfo]})
				}
			}
		}

		if (method === "Sort") {
			if (value === "down") {
				if (typeof filterState.students[0][`${sortParam}`] === "string") {
					let copy = [...filterState.students]
					let sorted = copy.sort((a, b) => b[`${sortParam}`].localeCompare(a[`${sortParam}`]))
					handleFilterState({...filterState, [`${sortParam}`]: value, students: [...sorted]})
				} else {
					let copy = [...filterState.students]
					let sorted = copy.sort((a, b) => b[`${sortParam}`] - a[`${sortParam}`])
					handleFilterState({...filterState, [`${sortParam}`]: value, students: [...sorted]})
				}
			} else {
				if (typeof filterState.students[0][`${sortParam}`] === "string") {
					let copy = [...filterState.students]
					let sorted = copy.sort((a, b) => a[`${sortParam}`].localeCompare(b[`${sortParam}`]))
					handleFilterState({...filterState, [`${sortParam}`]: value, students: [...sorted]})
				} else {
					let copy = [...filterState.students]
					let sorted = copy.sort((a, b) => a[`${sortParam}`] - b[`${sortParam}`])
					handleFilterState({...filterState, [`${sortParam}`]: value, students: [...sorted]})
				}
			}
		}

		if (value === "") {
			handleFilterState({students: usersInfo, names: "", currentYear: "", degree: "", group: "", filterModalVisible: true})
		}

		handleFilterState((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	function findIndexByKeyValue(array, key, value) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return i
			}
		}
		return -1
	}

	return (
		<AdminContext.Provider
			value={{
				visibleUserSetUp,
				handleUserPopup,
				filterState,
				setUserVisibility,
				handleFilterState,
				handleFilterChange,
				visibleState,
				handleVisibileColumnsChange,
				handleFilterVisibleState,
				isUpdating,
				groups,
				userWeek,
				handleUpdating,
				usersDates,
				findIndexByKeyValue,
			}}
		>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminContextProvider
