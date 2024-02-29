import { View, Text, Modal, StyleSheet, FlatList,  Pressable, TextInput } from "react-native"
import { default as IconIonicons } from "react-native-vector-icons/Ionicons"
import { default as IconAnt } from "react-native-vector-icons/AntDesign"
import { default as IconMaterial} from "react-native-vector-icons/MaterialIcons"
import { default as IconMaterialCommunity} from "react-native-vector-icons/MaterialCommunityIcons"
import { semesters, windowWidth, years } from "../../constants"
import { useContext } from "react"
import { default as IconAwesome } from "react-native-vector-icons/FontAwesome"
import SubjectsContext from "../../contexts/Subjects/SubjectsContext"
import { useEffect } from "react"
import { default as IconFeather } from "react-native-vector-icons/Feather"
import RNPickerSelect from "react-native-picker-select"
import { ActivityIndicator } from "react-native"
import { SubjectModificationPopup } from "./SubjectModificationPopup"
import { GroupsModificationPopup } from "./GroupsModificationPopup"




const SubjectsModal = ({ navigation }) => {
	
	
	const {
		SubjectsInfo,
		handleInfo,
		getSubjects,
		modes,
		handleModes,	
		handleActiveSubject,
		getGroups
	} = useContext(SubjectsContext)

	useEffect(() => {
		getSubjects();
		getGroups();
	}, [modes.viewMode === true]);




	return <Modal
			animationType="slide"
			transparent={true}
			visible={/*modes.viewMode*/ SubjectsInfo.mode != ""}
			onRequestClose={() => {
				handleInfo("", "", "");
				resetSubject();
				handleActiveSubject({});
				handleModes({ viewMode: false, editMode: false, createMode: false });
			}}
		>
		{ SubjectsInfo.mode === "view" &&
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
						<Text style={styles.modalTitle}>{SubjectsInfo.year } Year </Text>
						
						<Text style={styles.modalTitle}>Semester </Text>
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
									marginTop: 1,
									textAlign: "center",
									marginRight: 10
								}}
							/>

						)}

					</View>

					<View style={{ ...styles.list, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
						
						<Pressable 
							onPress={() => {
								handleInfo(SubjectsInfo.year, SubjectsInfo.semester ,"Groups");
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
								handleInfo(SubjectsInfo.year, SubjectsInfo.semester ,"Subjects");
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
		}
		{(modes.viewMode || modes.editMode || modes.createMode) && SubjectsInfo.mode === "Subjects" ? (
			<SubjectModificationPopup />
		) : SubjectsInfo.mode === "Groups" ? (
			<GroupsModificationPopup />
		) : (
			<></>
		)}
		</Modal>

}

export const styles = StyleSheet.create({
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
		marginTop: 15,
		paddingBottom: 5,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		width: 120
	},
	input: {
		marginTop: 10,
		borderBottomColor: "#000",
		borderBottomWidth: 1,
		width: windowWidth * 0.6,
		marginLeft: 15,
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginBottom: 10
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
