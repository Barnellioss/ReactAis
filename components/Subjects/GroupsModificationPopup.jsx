import { View, Text, Modal, FlatList,  Pressable, TextInput, StyleSheet } from "react-native"
import { default as IconIonicons } from "react-native-vector-icons/Ionicons"
import { default as IconAnt } from "react-native-vector-icons/AntDesign"
import { semesters, windowWidth, years } from "../../constants"
import { useContext } from "react"
import { default as IconAwesome } from "react-native-vector-icons/FontAwesome"
import { default as IconFeather } from "react-native-vector-icons/Feather"
import RNPickerSelect from "react-native-picker-select"
import { ActivityIndicator } from "react-native"
import SubjectsContext from "../../contexts/Subjects/SubjectsContext"
import { styles } from "./SubjectsModal"



export const GroupsModificationPopup = () => {

    const {
		subjects,
		SubjectsInfo,
		handleInfo,
		modes,
		handleModes,
		activeSubject,
		handleActiveSubject,
		handleActiveSubjectChange,
		activeEditMode,
		handleActiveEditMode,
		updateSubject,
		updating,
		deleteSubject,
		handleNewSubject,
		newSubject,
		createSubject,
		error,
		resetSubject
	} = useContext(SubjectsContext)

    return (
        <View style={styles.centeredView}>
        {(modes.viewMode || modes.editMode || modes.createMode) && SubjectsInfo.mode === "Groups" ? (
        <View>
				{
					error > 3 ?
						<View style={{ height: 70, width: windowWidth, backgroundColor: "#FF2300" }}>
							<Text style={{ color: "#fff", fontSize: 24, paddingTop: 10, paddingLeft: 10 }}>{`fail`.toUpperCase()}</Text>
						</View>
						: <></>
				}
				<View style={styles.centeredView}>
					{modes.viewMode ? (
						<View style={styles.modalView}>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center"
								}}
							>
								<Text style={styles.modalTitle}>Groups</Text>
								<IconAwesome name="university" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
							</View>
							<FlatList
								style={styles.list}
								data={subjects}
								renderItem={({ item }) => {
									return (
										<View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingHorizontal: 5 }}>
											<Pressable
												onLongPress={() => {
													handleActiveSubject(item)
													handleModes({
														viewMode: false,
														editMode: true,
														createMode: false
													})
												}}
												style={{...styles.listItemWrapper, width: 0.78 * windowWidth}}
											>
												<Text>{item.subject}</Text>
											</Pressable>
											<Pressable onPress={() => deleteSubject(item.id)}>
												<IconAnt name="close" size={20} color="#000" style={{ textAlign: "center" }} />
											</Pressable>
										</View>
									)
								}}
							/>
							<View style={{ width: 0.9 * windowWidth, marginHorizontal: "auto", display: "flex", alignItems: "center", flexDirection: "row" }}>
								<Pressable
									style={{
										marginTop: 5,
										marginLeft: 0,
										textAlign: "left"
									}}
									onPress={() => {
										handleModes({ viewMode: false, editMode: false, createMode: true })
									}}
								>
									<IconIonicons name="add" size={24} color="#000" style={{ fontWeight: 600, marginLeft: 2 }} />
								</Pressable>
							</View>


						<View style={{ display: "flex", flexDirection: "row", width: 100, height: 65, justifyContent: "space-between", alignItems: "flex-end" }}>
							<Pressable
									style={{ width: 40 }}
									onPress={() => {
										handleInfo(SubjectsInfo.year, SubjectsInfo.semester ,"view");
										handleModes({ viewMode: false, editMode: false, createMode: false })
									}}
								>		
									<IconIonicons name="arrow-back" size={24} color="#000" style={{ textAlign: "center"}} />
							</Pressable>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() => {
									handleModes({
										viewMode: false,
										editMode: false,
										createMode: false
									})
									handleActiveSubject({})
								}}
							>
								<IconAnt name="close" size={24} color="#000" style={{ textAlign: "center" }} />
							</Pressable>
						</View>
					</View>
					)
						:
						modes.editMode ? (
							<View style={styles.modalView}>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center"
									}}
								>
									<Text style={styles.modalTitle}>Edit Subjects</Text>
									<IconAwesome name="university" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
								</View>

								<View style={{ display: "flex", flexDirection: "row", width: 0.9 * windowWidth }}>
									<View style={{ ...styles.studentWrapper, width: 80, marginHorizontal: 0 }}>
										<Text style={styles.itemText}>Subject: </Text>
										<Text style={styles.itemText}>Semester: </Text>
										<Text style={styles.itemText}>Year: </Text>
										<Text style={styles.itemText}>Teacher: </Text>
										<Text style={styles.itemText}>Info: </Text>
									</View>

									<View style={{ ...styles.studentWrapper, marginHorizontal: 0, display: "flex" }}>
										{activeEditMode ? (
											<TextInput
												style={styles.input}
												value={activeSubject.subject}
												placeholderTextColor="#000"
												placeholder="Subject"
												autoCapitalize="none"
												clearButtonMode="always"
												onChangeText={(value) => handleActiveSubjectChange({ name: "subject", value: value }, handleActiveSubject)}
											></TextInput>
										) : (
											<Text style={{ ...styles.itemText, width: 250 }}>{activeSubject.subject}</Text>
										)}
										{activeEditMode ? (
											<View style={{ height: 30, paddingVertical: 4, marginLeft: 15 }}>
												<RNPickerSelect
													placeholder={{ label: "Select semester", value: "" }}
													value={`${activeSubject.semester}`}
													onValueChange={(value) =>
														handleActiveSubjectChange(
															{
																name: "semester",
																value: value
															},
															handleActiveSubject
														)
													}
													items={[
														{ label: "winter", value: `winter` },
														{ label: "summer", value: `summer` }
													]}
												/>
											</View>
										) : (
											<Text style={styles.itemText}>{activeSubject.semester}</Text>
										)}
										{activeEditMode ? (
											<View style={{ height: 30, paddingVertical: 10, marginLeft: 15 }}>
												<RNPickerSelect
													placeholder={{ label: "Select year", value: "" }}
													value={`${activeSubject.year}`}
													onValueChange={(value) =>
														handleActiveSubjectChange(
															{
																name: "year",
																value: value
															},
															handleActiveSubject
														)
													}
													items={[
														{ label: "1", value: `1` },
														{ label: "2", value: `2` },
														{ label: "3", value: `3` },
														{ label: "4", value: `4` },
														{ label: "5", value: `5` }
													]}
												/>
											</View>
										) : (
											<Text style={styles.itemText}>{activeSubject.year}</Text>
										)}
										{activeEditMode ? (
											<TextInput
												style={styles.input}
												value={activeSubject.teacher}
												placeholderTextColor="#000"
												placeholder="Teacher"
												autoCapitalize="none"
												clearButtonMode="always"
												onChangeText={(value) => handleActiveSubjectChange({ name: "teacher", value: value }, handleActiveSubject)}
											></TextInput>
										) : (
											<Text style={{ ...styles.itemText, width: 250 }}>{activeSubject.teacher}</Text>
										)}

										{activeEditMode ? (
											<TextInput
												style={styles.input}
												value={activeSubject.info}
												placeholderTextColor="#000"
												placeholder="Info"
												autoCapitalize="none"
												clearButtonMode="always"
												onChangeText={(value) => handleActiveSubjectChange({ name: "info", value: value }, handleActiveSubject)}
											></TextInput>
										) : (
											<Text style={{ ...styles.itemText, width: 250 }}>{activeSubject.info}</Text>
										)}
									</View>
								</View>

								<View style={{ display: "flex", flexDirection: "row", width: 100, height: 65, justifyContent: "space-between" }}>
									{updating ? (
										<View style={{ marginHorizontal: "auto", marginTop: 20 }}>
											<ActivityIndicator size="large" color="#0000ff" />
										</View>
									) : (
										<View style={{ display: "flex", flexDirection: "row" }}>
											<Pressable
												style={{ width: 40, height: 40 }}
												onPress={() => {
													if (activeEditMode) {
														handleModes({ viewMode: false, editMode: true, createMode: false })
														handleActiveEditMode(false)
													} else {
														handleModes({ viewMode: true, editMode: false, createMode: false })
														handleActiveSubject({})
													}
												}}
											>
												<IconIonicons name="arrow-back" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
											</Pressable>

											<Pressable
												style={{ width: 40, height: 40 }}
												onPress={() => {
													handleModes({ viewMode: false, editMode: false, createMode: false })
													handleActiveSubject({})
													handleActiveEditMode(false)
												}}
											>
												<IconAnt name="close" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
											</Pressable>

											{!activeEditMode ? (
												<Pressable style={{ width: 40, height: 40 }} onPress={() => handleActiveEditMode(true)}>
													<IconAnt name="edit" size={24} color="#000" style={{ textAlign: "center", marginTop: 26, height: 40 }} />
												</Pressable>
											) : (
												<Pressable style={{ width: 40, height: 40 }} onPress={() => updateSubject(activeSubject)}>
													<IconFeather name="save" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
												</Pressable>
											)}
										</View>
									)}
								</View>
							</View>
						) : modes.createMode ? (
							<View style={styles.modalView}>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center"
									}}
								>
									<Text style={styles.modalTitle}>Create Subjects</Text>
									<IconAwesome name="university" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
								</View>

								<View style={{ display: "flex", flexDirection: "row", width: 0.9 * windowWidth }}>
									<View style={{ ...styles.studentWrapper, width: 80, marginHorizontal: 0 }}>
										<Text style={styles.itemText}>Subject: </Text>
										<Text style={styles.itemText}>Semester: </Text>
										<Text style={styles.itemText}>Year: </Text>
										<Text style={styles.itemText}>Teacher: </Text>
										<Text style={styles.itemText}>Info: </Text>
									</View>

									<View style={{ ...styles.studentWrapper, marginHorizontal: 0, display: "flex" }}>
										<TextInput
											style={styles.input}
											value={newSubject.subject}
											placeholderTextColor="#000"
											placeholder="Subject"
											autoCapitalize="none"
											clearButtonMode="always"
											onChangeText={(value) => handleActiveSubjectChange({ name: "subject", value: value }, handleNewSubject)}
										></TextInput>
										<View style={{ height: 30, paddingVertical: 4, marginLeft: 15, marginBottom: 5, paddingTop: 5 }}>
											<RNPickerSelect
												placeholder={{ label: "Select semester", value: "" }}
												value={`${newSubject.semester}`}
												onValueChange={(value) =>
													handleActiveSubjectChange(
														{
															name: "semester",
															value: value
														},
														handleNewSubject
													)
												}
												items={semesters.filter(item => item.value === SubjectsInfo.semester)}
											/>
										</View>
										<View style={{ height: 30, paddingVertical: 10, marginLeft: 15, marginBottom: 5, paddingTop: 5 }}>
											<RNPickerSelect
												placeholder={{ label: "Select year", value: "" }}
												value={`${newSubject.year}`}
												onValueChange={(value) =>
													handleActiveSubjectChange(
														{
															name: "year",
															value: +value
														},
														handleNewSubject
													)
												}
												items={years.filter(item => item.value == SubjectsInfo.year)}
											/>
										</View>
										<TextInput
											style={styles.input}
											value={newSubject.teacher}
											placeholderTextColor="#000"
											placeholder="Teacher"
											autoCapitalize="none"
											clearButtonMode="always"
											onChangeText={(value) => handleActiveSubjectChange({ name: "teacher", value: value }, handleNewSubject)}
										></TextInput>
										<TextInput
											style={styles.input}
											value={newSubject.info}
											placeholderTextColor="#000"
											placeholder="Info"
											autoCapitalize="none"
											clearButtonMode="always"
											onChangeText={(value) => handleActiveSubjectChange({ name: "info", value: value }, handleNewSubject)}
										></TextInput>
									</View>
								</View>

								<View style={{ display: "flex", flexDirection: "row", width: 100, height: 65, justifyContent: "space-between" }}>
									{updating ? (
										<View style={{ marginHorizontal: "auto", marginTop: 20 }}>
											<ActivityIndicator size="large" color="#0000ff" />
										</View>
									) : (
										<View style={{ display: "flex", flexDirection: "row" }}>
											<Pressable
												style={{ width: 40, height: 40 }}
												onPress={() => {
													handleModes({ viewMode: true, editMode: false, createMode: false })
												}}
											>
												<IconIonicons name="arrow-back" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
											</Pressable>

											<Pressable
												style={{ width: 40, height: 40 }}
												onPress={() => {
													resetSubject();
													handleModes({ viewMode: false, editMode: false, createMode: false })
												}}
											>
												<IconAnt name="close" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
											</Pressable>
											<Pressable style={{ width: 40, height: 40 }} onPress={() => createSubject({ ...newSubject, id: Date.now() })}>
												<IconFeather name="save" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
											</Pressable>
										</View>
									)}
								</View>
							</View>
						) : (
							<></>
						)}
				</View>
			</View>)
            :
            <></>}
            </View>
    )
}