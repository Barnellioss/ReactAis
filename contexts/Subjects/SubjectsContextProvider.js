import React, { useEffect, useState } from "react";
import SubjectsContext from "./SubjectsContext";
import { useSelector } from "react-redux";
import { getDocs, query, where } from "firebase/firestore";
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
            where("year", "==", visibleSubjects.year), 
            where("semester", "==", visibleSubjects.semester ))).then((data) => {
      console.log(data)
      data.docs.forEach((item) => {
        res.push({ ...item.data() });
      });
      dispatch(setSubjects(JSON.parse(JSON.stringify(res))));
    }
    );
  };

  let years = [...new Set(semestersYear.map(item => item.year))];

  const [visibleSubjects, setVisibility] = useState({
    isVisible: false,
    year: 0,
    semester: ""
  });

  const handleVisibility = (visibility, year, semester) => {
    setVisibility({ isVisible: visibility, year: year, semester: semester });
  }


  return (
    <SubjectsContext.Provider value={{
      userInfo, years, subjects,
      semestersYear, getSubjects, 
      visibleSubjects, handleVisibility
    }}>
      {children}
    </SubjectsContext.Provider>
  );
};

export default SubjectsContextProvider;
