import { View, Text, Modal, StyleSheet, FlatList,  Pressable, TextInput } from "react-native"
import { default as IconIonicons } from "react-native-vector-icons/Ionicons"
import { default as IconAnt } from "react-native-vector-icons/AntDesign"
import { default as IconMaterial} from "react-native-vector-icons/MaterialIcons"
import { default as IconMaterialCommunity} from "react-native-vector-icons/MaterialCommunityIcons"
import { windowWidth } from "../../variables"
import { useContext } from "react"
import { default as IconAwesome } from "react-native-vector-icons/FontAwesome"
import SubjectsContext from "../../contexts/Subjects/SubjectsContext"
import { useEffect } from "react"
import { default as IconFeather } from "react-native-vector-icons/Feather"
import RNPickerSelect from "react-native-picker-select"
import { ActivityIndicator } from "react-native"




const SubjectsModal = ({ navigation }) => {
	
	
	const {
		subjects,
		SubjectsInfo,
		handleInfo,
		getSubjects,
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
		error
	} = useContext(SubjectsContext)

	useEffect(() => {
		getSubjects()
	}, [modes.viewMode === true]);




	return SubjectsInfo.mode === "view"
		? <Modal
			animationType="slide"
			transparent={true}
			visible={/*modes.viewMode*/ SubjectsInfo.mode === "view"}
			onRequestClose={() => {
				handleInfo("", "", "")
				handleModes({ viewMode: false, editMode: false, createMode: false })
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 15
						}}
					>
						{SubjectsInfo.semester === "winter" ? (
							<IconAwesome
								name="snowflake-o"
								size={26}
								color="#000"
								style={{
									marginTop: 2,
									textAlign: "center",
									textAlignVertical: "center",
									marginRight: 10
								}}
							/>
						) : (
							<IconFeather
								name="sun"
								size={26}
								color="#000"
								style={{
									textAlign: "center",
									marginRight: 10
								}}
							/>

						)}
						<Text style={styles.modalTitle}>Semester</Text>

					</View>

					<View style={{ ...styles.list, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
						
						<Pressable 
							onPress={() => {
								
							}}
							style={{
							width: 0.4 * windowWidth,
							backgroundColor: "#c5bac4",
							borderRadius: 20,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							height: 40
						}}>
							<IconMaterial
								name="groups"
								size={18}
								color="#000"
								style={{
									textAlign: "center",
								}}
							/>

							<Text style={{ ...styles.listItem, paddingBottom: 0 }}>Groups</Text>
						</Pressable>
						<Pressable 
							onPress={() => {
								handleInfo(SubjectsInfo.year, SubjectsInfo.semester ,"");
								handleModes({ viewMode: true, editMode: false, createMode: false });
							}}
							style={{
							width: 0.4 * windowWidth,
							backgroundColor: "#c5bac4",
							borderRadius: 20,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							height: 40
						}}>
							<IconMaterialCommunity
								name="bookshelf"
								size={18}
								color="#000"
								style={{
									textAlign: "center",
									
								}}
							/>

							<Text style={{ ...styles.listItem, paddingBottom: 0 }}>Subjects</Text>
						</Pressable>
					</View>


					<View style={{ display: "flex", flexDirection: "row", width: 100, height: 65, justifyContent: "center" }}>
						<View style={{ display: "flex", flexDirection: "row" }}>
							<Pressable
								style={{ width: 40, height: 40 }}
								onPress={() => {
									handleInfo("", "", "");
									handleModes({ viewMode: false, editMode: false, createMode: false });
								}}
							>
								<IconAnt name="close" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
							</Pressable>
						</View>
					</View>
				</View>
			</View>
		</Modal>
		:
		modes.viewMode || modes.editMode || modes.createMode ? (
			<Modal
				animationType="slide"
				transparent={true}
				visible={modes.viewMode || modes.editMode || modes.createMode}
				onRequestClose={() => {
					handleInfo("", "", "")
					handleModes({ viewMode: false, editMode: false, createMode: false })
				}}
			>
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
								<Text style={styles.modalTitle}>Subjects</Text>
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
										<View style={{ height: 30, paddingVertical: 4, marginLeft: 15 }}>
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
												items={[
													{ label: "winter", value: `winter` },
													{ label: "summer", value: `summer` }
												]}
											/>
										</View>
										<View style={{ height: 30, paddingVertical: 10, marginLeft: 15 }}>
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
												items={[
													{ label: "1", value: `1` },
													{ label: "2", value: `2` },
													{ label: "3", value: `3` },
													{ label: "4", value: `4` },
													{ label: "5", value: `5` }
												]}
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
													handleModes({ viewMode: true, editMode: false, createMode: false })
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
			</Modal>
		) : (
			<></>
		)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	},
	modalTitle: {
		fontSize: 28
	},
	studentWrapper: {
		width: windowWidth * 0.6,
		marginHorizontal: "auto",
		marginTop: 25
	},
	itemText: {
		fontSize: 14,
		marginVertical: 5,
		color: "#000",
		paddingBottom: 5,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: 120
	},
	input: {
		marginTop: 0,
		marginBottom: 8,
		borderBottomColor: "#000",
		borderBottomWidth: 1,
		width: windowWidth * 0.6,
		marginLeft: 15,
		paddingVertical: 5
	},
	filterButtonText: {
		width: 60,
		textAlign: "center",
		marginLeft: "auto",
		marginRight: "auto",
		height: 20,
		fontSize: 14,
		color: "#fff"
	},

	modalView: {
		margin: 0,
		backgroundColor: "white",
		padding: 25,
		paddingTop: 20,
		width: windowWidth,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},

	filterButton: {
		maxWidthwidth: 80,
		borderColor: "#464742",
		borderWidth: 2,
		borderStyle: "solid",
		borderRadius: 20,
		marginVertical: 10,
		marginHorizontal: 5,
		height: 35,
		paddingVertical: 5
	},

	filterButtonActive: {
		borderColor: "#384357",
		backgroundColor: "#384357"
	},

	filterButtonPermanent: {
		borderColor: "#141F31",
		backgroundColor: "#141F31"
	},

	filterList: {
		marginTop: 20,
		display: "flex",
		flexDirection: "column",
		width: windowWidth * 0.8
	},
	filterListItem: {
		color: "#000",
		marginTop: 15,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},

	list: {
		marginTop: 10,
		width: windowWidth * 0.85,
		marginHorizontal: "auto"
	},
	barFirstItem: {
		fontSize: 16,
		color: "#fff",
		width: 120,
		marginLeft: 0,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},

	barItemLastItem: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		width: 50,
		height: 25,
		color: "#fff"
	},
	barItem: {
		fontSize: 14,
		color: "#fff",
		width: 70,
		marginLeft: 0
	},
	barItemText: {
		fontSize: 20,
		color: "#fff"
	},
	listItem: {
		color: "#fff",
		fontSize: 14,
		width: 70,
		paddingBottom: 10,
		marginLeft: 15
	},
	listItemFirstChild: {
		color: "#fff",
		fontSize: 14,
		width: 120,
		paddingBottom: 10,
		marginLeft: 0
	},

	listItemLastChild: {
		color: "#fff",
		fontSize: 14,
		width: 30,
		paddingBottom: 10,
		display: "flex",
		justifyContent: "flex-end"
	},

	listItemWrapper: {
		display: "flex",
		paddingVertical: 10,
		borderBottomColor: "#fff",
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	button: {
		width: 40,
		marginTop: 5
	},
	textError: {
		fontSize: 22,
		color: "red",
		fontWeight: "bold",
		textAlign: "center"
	},
	invisibleText: {
		opacity: 0
	}
})

export default SubjectsModal
