import React, { useContext, useState } from "react";
import { StudentContext } from "../../context/StudentContext";
import "./UserProfile.css";

const UserProfile = () => {
  const { studentDataBase } = useContext(StudentContext);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const user = studentDataBase.find((student) => student._id === selectedId);
    setSelectedUser(user);
  };
  return (
    <div className="user-profile">
      <h1 className="card-title text-primary display-5">
        Student Profile Details
      </h1>
      <div className="card text-center mt-3" style={{ width: "25rem" }}>
        <div className="card-header">
          <select
            onChange={handleSelect}
            defaultValue=""
            className="user-selector form-select"
          >
            <option value="" disabled>
              Select Student
            </option>
            {studentDataBase.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div className="card-body mt-1 selectedUser">
          {selectedUser && (
            <ul className="profile-list">
              <li>
                <span className="label">Name :</span>
                <span className="value"> {selectedUser.name}</span>
              </li>
              <li>
                <span className="label">Email :</span>
                <span className="value"> {selectedUser.email}</span>
              </li>
              <li>
                <span className="label">Phone :</span>
                <span className="value">{selectedUser.mobile}</span>
              </li>
              <li>
                <span className="label">Department :</span>
                <span className="value"> {selectedUser.department}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
