import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login } from "./Auth";

const RegisterFormLogin = () => {
  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
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

    if (!username || !password) {
      toast.error("Enter valid Credential");
      setSuccess("");
      setError("Enter valid Credential");
      return;
    }

    try {
      await login(username, password);
      setSuccess("Login  Successfully");
      setError("");
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      console.log("Login Error:", error.message);
      setError(error.message || "Login Failed");
      setSuccess("");
      toast.error(error.message || "Login Failed");
      setUserLoginData({
        username: "",
        password: "",
      });
    }
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <div className="container" style={{ width: "500px" }}>
        <form
          onSubmit={handleSubmit}
          className="row g-3 d-flex justify-content-center align-items-center"
        >
          <div className="col-auto card shadow-none p-3 mb-5 bg-light">
            <h2 className="text-primary">Login Portal</h2>
            <div className="row">
              <div className="col-12 text-start">
                <label className="fw-bold">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={userLoginData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 text-start mt-2">
                <label className="me-3 fw-bold">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={userLoginData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 text-center mt-2">
                <button type="submit" className="btn btn-warning">
                  Click Login
                </button>
              </div>
            </div>
            <Link to="/registerform" style={{ textDecoration: "none" }}>
              <p className="text-dark text-end">Register</p>
            </Link>
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
    </div>
  );
};

export default RegisterFormLogin;
