import React, { use, useEffect, useState } from "react";
import axios from "axios";
import "./LoginFormCrud.css";

const LoginFormCrud = () => {
  const [loginData, setLoginData] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [editLoginUser, setEditLoginUser] = useState(null);
  const [form, setForm] = useState(false);

  const loginFetchData = () => {
    axios.get("http://localhost:5050/getlogindata").then((res) => {
      setLoginData(res.data);
    });
  };

  useEffect(() => {
    loginFetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editLoginUser || !editLoginUser._id) {
      console.error("No user selected for update");
      return;
    }

    if (editLoginUser) {
      axios
        .patch(`http://localhost:5050/update/${editLoginUser._id}`, formData)
        .then((res) => {
          const updatedData = loginData.map((user) =>
            user._login === editLoginUser._id ? formData : user
          );
          setLoginData(updatedData);
          setEditLoginUser(null);
          setFormData({ username: "", email: "", password: "" });
        })
        .catch((err) => {
          console.log("Update Error:", err);
        });
    } else {
      axios
        .post("http://localhost:5050/login", formData)
        .then((res) => {
          setLoginData([...loginData, res.data]);
          setFormData({ username: "", email: "", password: "" });
        })
        .catch((err) => {
          console.log("Upload Error:", err);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const editLoginData = (user) => {
    setForm(true);
    setEditLoginUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: user.password,
    });
  };

  const deleteLoginUser = (loginId) => {
    axios
      .delete(`http://localhost:5050/delete/${loginId}`)
      .then((res) => {
        const updatedUser = loginData.filter((user) => user._id !== loginId);
        setLoginData(updatedUser);
      })
      .catch((err) => [console.log("Delete Error:", err)]);
  };

  return (
    <div>
      <div>
        {form ? (
          <div className="login-main">
            <form onSubmit={handleSubmit} className="login-form-main">
              <h1>User Register Portal</h1>
              <div className="form">
                <label className="login-label">
                  <b>Username: </b>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {/* {error.username && (
              <p className="error-message1">{error.username}</p>
            )} */}
              </div>
              <div className="form">
                <label className="login-label">
                  <b>Email: </b>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {/* {error.email && <p className="error-message1">{error.email}</p>} */}
              </div>
              <div className="form">
                <label className="login-label">
                  <b>Password: </b>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {/* {error.password && (
              <p className="error-message1">{error.password}</p>
            )} */}
              </div>
              <button type="submit" className="btn form-btn-submit">
                Submit
              </button>
              {/* {message && <p className="login-message">{message}</p>} */}
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="login-crud-table">
        <table className="crud-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Mail</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loginData.map((user, index) => (
              <tr key={user._id || index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button onClick={() => editLoginData(user)}>Edit</button>
                  <button onClick={() => deleteLoginUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginFormCrud;
