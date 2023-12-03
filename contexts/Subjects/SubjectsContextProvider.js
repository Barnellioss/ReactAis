import React, { useState } from "react";
import SubjectsContext from "./SubjectsContext";
import { useSelector } from "react-redux";
import { doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firebaseSubjects } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { setSubjects } from "../../redux/reducers/reducers";
import { semestersYear } from "../../variables";

const SubjectsContextProvider = ({ children }) => {

  let { userInfo, subjects } = useSelector((store) => store.state);
  const dispatch = useDispatch();

  const getSubjects = () => {
    let res = [];
    getDocs(query(firebaseSubjects, 
            where("year", "==", SubjectsInfo.year), 
            where("semester", "==", SubjectsInfo.semester ))).then((data) => {
      data.docs.forEach((item) => {
        res.push({ ...item.data(), id: item.id });
      });
      dispatch(setSubjects(JSON.parse(JSON.stringify(res))));
    }
    );
  };

  
  const updateSubject = async (subject) => {

        handleUpdating(true)
        
        const { id } = subject;
        const subjectDocRef = doc(firebaseSubjects, `${id}`);
        await setDoc(subjectDocRef, subject);

        try {
            await updateDoc(subjectDocRef, subject).then(() => {
              getSubjects();
            })
        } finally {
            handleUpdating(false);
            //alert("Profile has been updated");
        }
    }





  let years = [...new Set(semestersYear.map(item => item.year))];


  //Popup visibility
  const [SubjectsInfo, setSubjectsInfo] = useState({
    year: 0,
    semester: ""
  });

  const handleInfo = (year, semester) => {
    setSubjectsInfo({ year: year, semester: semester });
  }


  //Modal modes
   const [modes, setModes] = useState({
    editMode: false,
    createMode: false,
    viewMode: false
  });

  const handleModes = (obj) => { 
        setModes({editMode: obj.editMode, createMode: obj.createMode, viewMode: obj.viewMode});
  }

  //Active edit subject
  const [activeSubject, setActiveSubject] = useState({});

  const handleActiveSubject = (subject) => {
    setActiveSubject(subject);
  }

  const handleActiveSubjectChange = (e) => {
        const { name, value } = e;
        setActiveSubject((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

  const [activeEditMode, setActiveEditMode] = useState(false);
  
  const handleActiveEditMode = (active) => {
    setActiveEditMode(active);
  }

 const [updating, setUpdating] = useState(false);
 
 const handleUpdating = (state) => {
    setUpdating(state);
 }




  return (
    <SubjectsContext.Provider value={{
      userInfo, years, subjects,
      semestersYear, getSubjects, 
      SubjectsInfo, handleInfo, modes,
      handleModes, activeSubject, handleActiveSubject,
      handleActiveSubjectChange, activeEditMode, handleActiveEditMode,
      updating, activeEditMode, updateSubject 
    }}>
      {children}
    </SubjectsContext.Provider>
  );
};

export default SubjectsContextProvider;
