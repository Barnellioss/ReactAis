import { View, Text, Modal, FlatList,  Pressable, TextInput, StyleSheet } from "react-native"
import { default as IconIonicons } from "react-native-vector-icons/Ionicons"
import { default as IconAnt } from "react-native-vector-icons/AntDesign"
import { semesters, stages, windowWidth, years } from "../../constants"
import { useContext } from "react"
import { default as IconAwesome } from "react-native-vector-icons/FontAwesome"
import { default as IconFeather } from "react-native-vector-icons/Feather"
import RNPickerSelect from "react-native-picker-select"
import { ActivityIndicator } from "react-native"
import SubjectsContext from "../../contexts/Subjects/SubjectsContext"
import { styles } from "./SubjectsModal"



export const GroupsModificationPopup = () => {

    const {
		groups,
		SubjectsInfo,
		handleInfo,
		modes,
		activeGroup,
		handleActiveGroup,
		handleActiveGroupChange,
		handleModes,
		handleNewGroup,
		newGroup,
		handleActiveSubject,
		handleActiveSubjectChange,
		activeEditMode,
		handleActiveEditMode,
		updateGroup,
		updating,
		deleteGroup,
		newSubject,
		error,
		createGroup
	} = useContext(SubjectsContext)

	console.log(newGroup);

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
								data={groups}
								renderItem={({ item }) => {
									return (
										<View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingHorizontal: 5 }}>
											<Pressable
												onLongPress={() => {
													handleActiveGroup(item)
													handleModes({
														viewMode: false,
														editMode: true,
														createMode: false
													});
												}}
												style={{...styles.listItemWrapper, width: 0.78 * windowWidth}}
											>
												<Text>{item.group}</Text>
											</Pressable>
											<Pressable onPress={() => deleteGroup(item.id)}>
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
									handleActiveSubject({});
									handleInfo("", "", "");
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
									<Text style={styles.modalTitle}>Edit Group</Text>
									<IconAwesome name="university" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
								</View>

								<View style={{ display: "flex", flexDirection: "row", width: 0.9 * windowWidth }}>
									<View style={{ ...styles.studentWrapper, width: 80, marginHorizontal: 0, marginTop: 25 }}>
										<Text style={styles.itemText}>Title: </Text>
										<Text style={styles.itemText}>Year: </Text>
										<Text style={styles.itemText}>Stage: </Text>
										<Text style={styles.itemText}>Info: </Text>
									</View>

									<View style={{ ...styles.studentWrapper, marginHorizontal: 0, display: "flex" }}>
										{activeEditMode ? (
											<TextInput
												style={styles.input}
												value={activeGroup.group}
												placeholderTextColor="#000"
												placeholder="Subject"
												autoCapitalize="none"
												clearButtonMode="always"
												onChangeText={(value) => handleActiveGroupChange({ name: "group", value: value }, handleActiveGroup)}
											></TextInput>
										) : (
											<Text style={{ ...styles.itemText, width: 250 }}>{activeGroup.group}</Text>
										)}
										{activeEditMode ? (
											<View style={{ height: 30, paddingVertical: 10, marginLeft: 15, paddingTop: 7, marginTop: 10 }}>
												<RNPickerSelect
													placeholder={{ label: "Select year", value: "" }}
													value={`${activeGroup.year}`}
													onValueChange={(value) =>
														handleActiveGroupChange(
															{
																name: "year",
																value: +value
															},
															handleActiveGroup
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
											<Text style={styles.itemText}>{activeGroup.year}</Text>
										)}
										{activeEditMode ? (
											<TextInput
												style={{...styles.input}}
												value={activeGroup.stage}
												placeholderTextColor="#000"
												placeholder="Teacher"
												autoCapitalize="none"
												clearButtonMode="always"
												onChangeText={(value) => handleActiveGroupChange({ name: "stage", value: value }, handleActiveGroup)}
											></TextInput>
										) : (
											<Text style={{ ...styles.itemText, width: 250 }}>{activeGroup.stage}</Text>
										)}

										{activeEditMode ? (
											<TextInput
												style={{...styles.input}}
												value={activeGroup.info}
												placeholderTextColor="#000"
												placeholder="Info"
												autoCapitalize="none"
												clearButtonMode="always"
												onChangeText={(value) => handleActiveSubjectChange({ name: "info", value: value }, handleActiveGroup)}
											></TextInput>
										) : (
											<Text style={{ ...styles.itemText, width: 250 }}>{activeGroup.info}</Text>
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
														handleActiveGroup({})
													}
												}}
											>
												<IconIonicons name="arrow-back" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
											</Pressable>

											<Pressable
												style={{ width: 40, height: 40 }}
												onPress={() => {
													handleModes({ viewMode: false, editMode: false, createMode: false })
													handleActiveGroup({})
													handleInfo("", "", "");
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
												<Pressable style={{ width: 40, height: 40 }} onPress={() => updateGroup(activeGroup)}>
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
									<Text style={styles.modalTitle}>Create Group</Text>
									<IconAwesome name="university" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
								</View>

								<View style={{ display: "flex", flexDirection: "row", width: 0.9 * windowWidth }}>
									<View style={{ ...styles.studentWrapper, width: 80, marginHorizontal: 0 }}>
										<Text style={styles.itemText}>Title: </Text>
										<Text style={styles.itemText}>Year: </Text>
										<Text style={styles.itemText}>Stage: </Text>
										<Text style={styles.itemText}>Info: </Text>
									</View>

									<View style={{ ...styles.studentWrapper, marginHorizontal: 0, display: "flex" }}>
										<TextInput
											style={styles.input}
											value={newGroup.group}
											placeholderTextColor="#000"
											placeholder="Index"
											autoCapitalize="none"
											clearButtonMode="always"
											onChangeText={(value) => handleActiveGroupChange({ name: "group", value: value }, handleNewGroup)}
										></TextInput>
										
										<View style={{ height: 30, paddingVertical: 10, marginLeft: 15, marginBottom: 5, paddingTop: 5, marginTop: 10}}>
											<RNPickerSelect
												placeholder={{ label: "Select year", value: "" }}
												value={`${newGroup.year}`}
												onValueChange={(value) =>
													handleActiveGroupChange(
														{
															name: "year",
															value: +value
														},
														handleNewGroup
													)
												}
												items={years.filter(item => item.value == SubjectsInfo.year)}
											/>
										</View>


										<View style={{ height: 30, paddingVertical: 10, marginLeft: 15, marginBottom: 5, paddingTop: 5, marginTop: 10 }}>
											<RNPickerSelect
												placeholder={{ label: "Select stage", value: "" }}
												value={`${newGroup.stage}`}
												onValueChange={(value) =>
													handleActiveGroupChange(
														{
															name: "stage",
															value: value
														},
														handleNewGroup
													)
												}
												items={stages}
											/>
										</View>
										
										<TextInput
											style={styles.input}
											value={newGroup.info}
											placeholderTextColor="#000"
											placeholder="Info"
											autoCapitalize="none"
											clearButtonMode="always"
											onChangeText={(value) => handleActiveGroupChange({ name: "info", value: value }, handleNewGroup)}
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
													handleActiveGroup({});
													handleInfo("", "", "");
													handleModes({ viewMode: false, editMode: false, createMode: false })
												}}
											>
												<IconAnt name="close" size={24} color="#000" style={{ textAlign: "center", marginTop: 25, height: 40 }} />
											</Pressable>
											<Pressable style={{ width: 40, height: 40 }} onPress={() => createGroup({ ...newGroup, id: Date.now() })}>
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