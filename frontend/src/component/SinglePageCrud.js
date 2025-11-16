import React, { useEffect, useState } from "react";
import "./SinglePageCrud.css";
import axios from "axios";

const SinglePageCrud = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(false);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3030/getdata")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log("Fetch error:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      updatedUser(editMode);
    } else {
      createUser();
    }
    setForm(false);
  };

  const createUser = () => {
    const userData = { name: name, email: email, mobile: mobile };

    axios
      .post("http://localhost:3030/upload", userData)
      .then((res) => {
        setUsers([...users, res.data]);
        console.log("Create Done");
      })
      .catch((err) => {
        console.log("Post Error: ", err);
      });
  };

  const updatedUser = (userId) => {
    const userData = { name: name, email: email, mobile: mobile };
    axios
      .patch(`http://localhost:3030/editdata/${userId}`, userData)
      .then(() => {
        const updatedUser = users.map((user) =>
          user._id === userId ? { ...user, userData } : user
        );

        setUsers(updatedUser);
      })
      .catch((err) => {
        console.log("Update Error:", err);
      });
  };

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:3030/delete/${userId}`)
      .then((user) => {
        const updatedUser = users.filter((user) => user._id !== userId);
        setUsers(updatedUser);
        console.log("Delete: ", updatedUser);
      })
      .catch((err) => {
        console.log("Delete error:", err);
      });
  };

  const handleEditUser = (userId) => {
    setForm(true);
    setEditMode(userId);
    const selectedUser = users.find((user) => user._id === userId);
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setMobile(selectedUser.mobile);
    }
  };

  return (
    <div>
      {form ? (
        <div className="single-crud-main">
          <form className="single-crud-form" onSubmit={handleSubmit}>
            {editMode ? <h1>Update User</h1> : <h1>Add User</h1>}
            <div className="crud-form">
              <label>name : </label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="crud-form">
              <label>Email : </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="crud-form">
              <label>Phone : </label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-submit">
              {editMode ? <span>Update</span> : <span>Submit</span>}
            </button>
            <button
              type="button"
              className="btn btn-close"
              onClick={() => setForm(false)}
            >
              X
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
      <div>
        <button
          type="button"
          className="btn btn-submit"
          onClick={() => setForm(true)}
        >
          Add user
        </button>
        <div className="crud-fetch-details">
          <table className="crud-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditUser(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-remove"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SinglePageCrud;
