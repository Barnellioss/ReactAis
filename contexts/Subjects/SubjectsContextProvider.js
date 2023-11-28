import React, { useEffect, useState } from "react";
import SubjectsContext from "./SubjectsContext";
import { useSelector } from "react-redux";
import { getDocs, query } from "firebase/firestore";
import { firebaseSubjects} from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { setSubjects } from "../../redux/reducers/reducers";

const SubjectsContextProvider = ({ children }) => {
  let { userInfo, subjects } = useSelector((store) => store.state);
  const dispatch = useDispatch();


  const getSubjects = () => {
    let res = [];
    getDocs(query(firebaseSubjects)).then((data) => {
        data.docs.forEach((item) => {
          res.push({ ...item.data() });
        });
        dispatch(setSubjects(JSON.parse(JSON.stringify(res))));
      }
    );
  };

  return (
    <SubjectsContext.Provider value={{ userInfo, subjects, getSubjects }}>
      {children}
    </SubjectsContext.Provider>
  );
};

export default SubjectsContextProvider;
