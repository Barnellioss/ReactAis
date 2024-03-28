import { View, Text, ImageBackground, ScrollView, FlatList } from "react-native"
import React from "react"
import { useContext } from "react"
import SubjectsContext from "../contexts/Subjects/SubjectsContext"
import Header from "../components/common/Header"
import { default as IconFeather } from "react-native-vector-icons/Feather"
import { default as IconAwesome } from "react-native-vector-icons/FontAwesome"
import { Pressable } from "react-native"
import { windowHeight, windowWidth } from "../constants"
import { StyleSheet } from "react-native"

const SubjectsScreen = ({ navigation, route }) => {
	const { userInfo, semestersYear, years, handleInfo, handleModes } = useContext(SubjectsContext)

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.bg} source={require("../images/Books.jpg")} blurRadius={1}>
				<Header navigation={navigation} status={userInfo?.status} />

				<FlatList
					style={styles.list}
					data={years}
					renderItem={({ item }) => {
						return (
							<View style={{ marginTop: 20 }}>
								<ScrollView>
									<View style={{ display: "flex", flexDirection: "column" }}>
										<View
											style={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "space-between"
											}}
										>
											<Text
												style={{
													color: "#fff",
													fontSize: 14,
													width: 20,
													textAlign: "left",
													marginHorizontal: 10,
													marginBottom: 4,
													marginTop: 15,
													textAlign: "center",
													paddingTop: 10
												}}
											>
												{item}
											</Text>

											<FlatList
												style={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
													marginTop: 15
												}}
												data={semestersYear.filter((a) => a.year === item)}
												renderItem={({ item }) => {
													return (
														<Pressable
															onPress={() => {
																handleInfo(item.year, item.semester, "view")
																handleModes({
																	viewMode: true,
																	editMode: false,
																	createMode: false
																})
															}}
															style={{
																...styles.listItemWrapper,
																backgroundColor: "#c5bac4",
																borderRadius: 20,
																marginRight: 20,
																display: "flex",
																flexDirection: "row",
																alignItems: "center",
																justifyContent: "center"
															}}
														>
															<Pressable
																onPress={() => {
																	handleInfo(item.year, item.semester, "view")
																	handleModes({
																		viewMode: true,
																		editMode: false,
																		createMode: false
																	})
																}} style={{ width: 80, display: "flex", flexDirection: "row" }}>
																{item.semester === "winter" ? (
																	<IconAwesome
																		name="snowflake-o"
																		size={18}
																		color="#000"
																		style={{
																			marginTop: 2,
																			textAlign: "center",
																			textAlignVertical: "center"
																		}}
																	/>
																) : (
																	<IconFeather
																		name="sun"
																		size={18}
																		color="#000"
																		style={{
																			marginTop: 2,
																			textAlign: "center"
																		}}
																	/>
																)}
																<Text style={{...styles.listItem, paddingTop: 2, marginLeft: 10, textAlign: "left"}}>{item.semester}</Text>
															</Pressable>
														</Pressable>
													)
												}}
											/>
										</View>
									</View>
								</ScrollView>
							</View>
						)
					}}
				/>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		position: "inherit"
	},
	gridWrapper: {
		padding: 10
	},
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	},
	modalTitle: {
		fontSize: 28
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
		padding: 35,
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
	date__row: {
		flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        maxHeight: 30
	},
	bg: {
		width: windowWidth,
		height: windowHeight,
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},

	filterButton: {
		width: 80,
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
	labels: {
		display: "flex",
		flexDirection: "row"
	},
	searchBar: {
		width: windowWidth * 0.9,
		marginTop: 30,
		display: "flex",
		flexDirection: "column",
		paddingBottom: 10,
		borderBottomWidth: 2,
		borderBottomColor: "#fff"
	},
	header: {
		width: windowWidth,
		height: 100,
		backgroundColor: "#005dff",
		display: "flex",
		justifyContent: "center"
	},
	headerTitle: {
		fontSize: 28,
		color: "#fff",
		marginLeft: 10
	},
	listOfVisible: {
		width: windowWidth * 0.9,
		height: 100
	},
	list: {
		width: windowWidth * 0.9,
		marginHorizontal: "auto",
		minHeight: windowHeight * 0.7
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
		width: 45,
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
		width: 80,
		textAlign: "center",
		marginLeft: 5,
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
		flex: 1,
		paddingVertical: 10,
		borderBottomColor: "#fff",
		borderBottomWidth: 1,
		width: windowWidth * 0.35,
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	input: {
		width: windowWidth * 0.8,
		height: 42,
		color: "#000",
		borderColor: "#fff",
		borderWidth: 1,
		borderStyle: "solid",
		fontSize: 20,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 20,
		marginTop: 10,
		marginBottom: 15,
		backgroundColor: "#fff"
	},
	title: {
		fontSize: 40,
		color: "#fff",
		marginBottom: 15,
		marginTop: 85
	},
	button: {
		marginTop: 50,
		width: 200
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

export default SubjectsScreen
