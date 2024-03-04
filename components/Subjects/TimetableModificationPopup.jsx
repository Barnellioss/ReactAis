import { View, Text, Pressable, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { default as IconIonicons } from "react-native-vector-icons/Ionicons"
import { default as IconAnt } from "react-native-vector-icons/AntDesign"
import { range, semesters, stages, windowHeight, windowWidth, years } from "../../constants"
import { useContext, useEffect } from "react"
import { default as IconAwesome } from "react-native-vector-icons/FontAwesome"
import { default as IconFeather } from "react-native-vector-icons/Feather"
import RNPickerSelect from "react-native-picker-select"
import { ActivityIndicator } from "react-native"
import SubjectsContext from "../../contexts/Subjects/SubjectsContext"
import { styles } from "./SubjectsModal"
import Timetable from "react-native-calendar-timetable"
import { default as IconMaterialCommunity} from "react-native-vector-icons/MaterialCommunityIcons"
import Event from "../common/Event"





export const TimetableModificationPopup = () => {

    const {
		SubjectsInfo,
        userWeek, 
        days, 
        handlePressedID, 
        pressedID,
		handleInfo,
		handlePlannedDates,
		filteredCalendarDays,
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
		error,
		subjects,
		filterDays,
		getSubjectsTimetable,
		createGroup
	} = useContext(SubjectsContext)

	useEffect(() => {
		getSubjectsTimetable();
	}, [SubjectsInfo.year, SubjectsInfo.semester]);



	useEffect(() => {
        filterDays(userWeek, pressedID);
    }, [pressedID])

	console.log(subjects)


    return (
        <View style={styles.centeredView}>
        {(modes.viewMode || modes.editMode || modes.createMode) && SubjectsInfo.mode === "Timetable" ? (
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
					<ScrollView style={{ height: windowHeight * 0.9 /* marginHorizontal: "auto", display: "flex", alignItems: "flex-start", flexDirection: "column" */}}>
						<View style={styles.modalView}>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center"
								}}
							>
								<Text style={styles.modalTitle}>Timetable</Text>
								<IconMaterialCommunity
								name="timetable" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
							</View>
                            <View>
                            {userWeek != "undefined" ?
                                <View style={{ ...styles.item__wrapper, marginBottom: 30, width: windowWidth, flex: 1, flexDirection: "column",  alignItems: 'center' }}>
                                    <View style={{...styles.days__container, justifyContent: 'space-evenly'}}>
                                        {
                                            days != "undefined" ?
                                                days.map((item, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onLongPress={() => {
                                                                handlePressedID(i);
                                                                handlePlannedDates(i);
                                                                filterDays(userWeek, i);
                                                            }}
                                                            onPress={() => { handlePressedID(i); handlePlannedDates(i); filterDays(userWeek, i) }}
                                                            style={{
                                                                height: 50
                                                            }}
                                                            key={i}>
                                                            <Text
                                                                style={pressedID === i ? styles.days__item_active : styles.days__item}>
                                                                {item.slice(0, 1)}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                :
                                                <></>
                                        }
                                    </View>

                                    <View style={{ width: windowWidth * 0.8 }}>
                                        <Timetable
                                            fromHour={7.30}
                                            toHour={20.00}
                                            scrollViewProps={{ scrollEnabled: false }}
                                            items={filteredCalendarDays}
                                            hideNowLine={true}
                                            columnWidth={windowWidth * 0.85}
                                            style={{ width: windowWidth * 0.85, marginLeft: 'auto', marginRight: 'auto' }}
                                            renderItem={props => <Event props={props} key={Math.random() * 10000} height={60} width={0.5} left={0.1} show={true} subjects={subjects}/>}
                                            range={range}
                                        />
                                    </View>
                                </View>
                                : <></>
                            }
                                
                                <Pressable
									style={{
										marginTop: 5,
										textAlign: "left",
										width: windowWidth * 0.8,
										marginLeft: 'auto',
										marginRight: 'auto'
									}}
									onPress={() => {
										handleModes({ viewMode: false, editMode: false, createMode: true })
									}}
								>
									<IconIonicons name="add" size={24} color="#000" style={{ fontWeight: 600, marginLeft: 5 }} />
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
					</ScrollView>
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
					) 
					: 
					modes.createMode ? (
							<View style={{...styles.modalView}}>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center"
									}}
								>
									<Text style={styles.modalTitle}>Create in timetable</Text>
									<IconAwesome name="university" size={26} style={{ marginLeft: 15, marginTop: 5 }} />
								</View>

								<View style={{ display: "flex", flexDirection: "row", width: 0.9 * windowWidth }}>
									<View style={{ ...styles.studentWrapper, width: 80, marginHorizontal: 0 }}>
										<Text style={styles.itemText}>Subject: </Text>
										<Text style={styles.itemText}>From: </Text>
										<Text style={styles.itemText}>To: </Text>
										{/*<Text style={styles.itemText}>Place ID: </Text>*/}
									</View>

									<View style={{ ...styles.studentWrapper, marginHorizontal: 0, display: "flex" }}>
										<View style={{ height: 30, paddingVertical: 10, marginLeft: 15, marginBottom: 5, paddingTop: 5, marginTop: 10}}>
											<RNPickerSelect
												placeholder={{ label: "Select subject", value: "" }}
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
			</View>
			)
            :
            <></>}
            </View>

    )
}


