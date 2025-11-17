import React, { useState, useContext } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/StudentContext";
import { ToastContainer } from "react-toastify";

const LoginForm = ({ setLogin }) => {
  const { loginHandleSubmit } = useContext(StudentContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const [message, setMessage] = useState(null);

  const validation = () => {
    const newError = {};
    if (!form.username) {
      newError.username = "invalid username";
    }

    if (!form.email) {
      newError.email = "invalid email";
    } else {
      if (!/\S+@\S+\.\S+/.test(form.email)) newError.email = "missing error";
    }

    if (!form.password) {
      newError.password = "invalid password";
    } else {
      if (form.password < 6) {
        newError.password = "must in 6 characters";
      }
      if (!/[a-z]/.test(form.password)) {
        newError.password = "must one lowercase lowercase";
      }
      if (!/[A-Z]/.test(form.password)) {
        newError.password = "must one uppercase characters";
      }
      if (!/[@#$%*?]/.test(form.password)) {
        newError.password = "must one in special characters";
      }
    }
    return newError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validation();
    loginHandleSubmit(form);
    if (Object.keys(validationError).length === 0) {
      console.log("form validate", form);

      //Message animation

      setMessage("Verifying user details.");
      setTimeout(() => {
        setMessage("Verifying user details..");
      }, 1000);
      setTimeout(() => {
        setMessage("Verifying user details...");
      }, 2000);
      setTimeout(() => {
        setMessage("Verifying user details....");
      }, 3000);
      setTimeout(() => {
        setMessage("Verifying user details.....");
      }, 4000);
      setTimeout(() => {
        setMessage("Verified.");
      }, 5000);

      setForm({
        username: "",
        email: "",
        password: "",
      });
      setError({});
    } else {
      setError(validation());
    }
  };
  return (
    <div className="login-main">
      <form onSubmit={handleSubmit} className="login-form-main">
        <h1>Login Portal</h1>
        <div className="form">
          <label className="login-label">
            <b>Username: </b>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
          />
          {error.username && <p className="error-message1">{error.username}</p>}
        </div>
        <div className="form">
          <label className="login-label">
            <b>Email: </b>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />
          {error.email && <p className="error-message1">{error.email}</p>}
        </div>
        <div className="form">
          <label className="login-label">
            <b>Password: </b>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />
          {error.password && <p className="error-message1">{error.password}</p>}
        </div>
        <button type="submit" className="btn form-btn-submit">
          Submit
        </button>
        {message && <p className="login-message">{message}</p>}
        {/* <p className="login-message">Verifying user details....</p>
         */}
      </form>
    </div>
  );
};

export default LoginForm;
