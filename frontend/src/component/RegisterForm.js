import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register } from "./Auth";

const RegisterForm = () => {
  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = userLoginData.username;
    const password = userLoginData.password;
    const role = userLoginData.role;

    if (!username || !password) {
      toast.error("Enter valid Credential");
      setSuccess("");
      setError("Enter valid Credential");
      return;
    }
    try {
      await register(username, password, role);
      setSuccess("Registered Successfully");
      setError("");
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/registerformlogin");
      }, 3000);
    } catch (error) {
      console.log("Registration Error:", error);
      setError(error.message || "Registration Failed");
      setSuccess("");
      toast.error(error.message || "Registration Failed");
    }
  };

  return (
    <div className=" row" style={{ marginTop: "50px" }}>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="  col p-1">
          <div className="container card" style={{ width: "550px" }}>
            <div className="card-body">
              <h1 className="text-primary">User Register</h1>
              <br />
              <div className="register-field text-start fw-bold">
                <label>Username : </label>
                <input
                  type="text"
                  name="username"
                  value={userLoginData.username}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <br />
              <div className="register-field text-start fw-bold">
                <label>Password : </label>
                <input
                  type="password"
                  name="password"
                  value={userLoginData.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <br />
              <div className="register-field text-start fw-bold">
                <label>Role : </label>
                <br />
                <select
                  name="role"
                  value={userLoginData.role || "user"}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <button className="register-btn btn btn-primary mt-2 ms-5">
                  Register
                </button>
              </div>
              <Link to="/registerformlogin" style={{ textDecoration: "none" }}>
                <p className="text-dark text-end">Click to Login</p>
              </Link>
            </div>
          </div>
        </div>
      </form>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RegisterForm;
