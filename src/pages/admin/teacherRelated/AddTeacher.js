import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle";
import {
  getTeacherDetails,
  getTeachers,
  teacherAssign,
} from "../../../redux/teacherRelated/teacherHandle";
import Popup from "../../../components/Popup";
import { registerUser } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { CircularProgress, Checkbox } from "@mui/material";

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;

  const {
    teachersList,
    loading: teacherListLoading,
    error: teacherListError,
    response: teacherListResponse,
  } = useSelector((state) => state.teacher);

  const { teacherDetails } = useSelector((state) => state.teacher);
  const { status, response, error } = useSelector((state) => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getTeachers());
    let teacherId = name?.split(" ")[0];
    if (teacherId) {
      // Fetch teacher details when teacherId changes
      dispatch(getTeacherDetails(teacherId));
    }
  }, [dispatch, name, subjectID]);

  const role = "Teacher";
  const school = subjectDetails && subjectDetails.school;
  const teachSubject = subjectDetails && subjectDetails._id;
  const teachSclass =
    subjectDetails &&
    subjectDetails.sclassName &&
    subjectDetails.sclassName._id;

  const fields = {
    name,
    email,
    password,
    role,
    school,
    teachSubject,
    teachSclass,
  };

  const handleOnChange = (event) => {
    setName(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);

    if (checked) {
      dispatch(
        teacherAssign({
          teacherId: teacherDetails._id,
          teachSubject,
          teachSclass,
        }),
      );
    } else {
      dispatch(registerUser(fields, role));
    }
    console.log(teacherDetails);

    // dispatch(registerUser(fields, role))
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate("/Admin/teachers");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <div>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">
            {" "}
            {checked ? "Assign" : "Add"} Teacher
          </span>
          <br />
          <label>Subject : {subjectDetails && subjectDetails.subName}</label>
          <label>
            Class :{" "}
            {subjectDetails &&
              subjectDetails.sclassName &&
              subjectDetails.sclassName.sclassName}
          </label>
          <label>
            <input
              className="registerInput"
              type="checkbox"
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />{" "}
            : Old Teacher
          </label>

          {checked ? (
            <>
              <label>Teacher Name</label>
              <select
                className="registerInput"
                onChange={handleOnChange}
                required
              >
                <option value="">Select Teacher</option>
                {teachersList?.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <label>Name</label>
              <input
                className="registerInput"
                type="text"
                placeholder="Enter teacher's name..."
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />

              <label>Email</label>
              <input
                className="registerInput"
                type="email"
                placeholder="Enter teacher's email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />

              <label>Password</label>
              <input
                className="registerInput"
                type="password"
                placeholder="Enter teacher's password..."
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                required
              />
            </>
          )}

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : checked ? (
              "Assign"
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default AddTeacher;
