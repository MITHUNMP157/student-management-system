import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import { StudentContext } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { userRole, userName } = useContext(StudentContext);
  const navigate = useNavigate();
  return (
    <div className="home-hero">
      <h2 className="welcome-title">
        Welcome{" "}
        <span className="user-click" onClick={() => navigate("/userprofile")}>
          {userName}
        </span>{" "}
        to Unity Collage of Institution...!
      </h2>
      <br />
      <div className="account-access-register">
        <p>
          <strong>Profile Type : </strong>
          {userRole}
        </p>
      </div>
    </div>
  );
};

export default Register;
