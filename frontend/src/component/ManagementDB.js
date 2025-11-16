import React, { useContext } from "react";
import "./ManagementDB.css";
import { ToastContainer } from "react-toastify";
import { StudentContext } from "../context/StudentContext";

const ManagementDB = () => {
  const { handleUpdate, deleteData, navigate, userRole, managementDB } =
    useContext(StudentContext);

  return (
    <div>
      <main className="student-main">
        {userRole !== "admin" ? (
          <div className="role-access">
            <h2 style={{ color: "red", textAlign: "center" }}>
              Not Allowed - Admin Access Only
            </h2>
          </div>
        ) : managementDB.length > 0 ? (
          <div className="student-body">
            <div className="student-title">
              <h1>Student Enrollment Database List </h1>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Student Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Age</th>
                    <th>Mobile</th>
                    <th>Enroll Date</th>
                    <th>Batch Year</th>
                    <th>District</th>
                    <th>State</th>
                    <th>Update /EDIT</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {managementDB.map((admin, index) => (
                    <tr key={admin._id || index}>
                      <td>{index + 1}</td>
                      <td>{admin.name}</td>
                      <td>{admin.gender}</td>
                      <td>{admin.department}</td>
                      <td>{admin.email}</td>
                      <td>{admin.dob}</td>
                      <td>{admin.age}</td>
                      <td>{admin.mobile}</td>
                      <td>{admin.enrollDate}</td>
                      <td>{admin.batchYear}</td>
                      <td>{admin.district}</td>
                      <td>{admin.state}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-update-student"
                          onClick={() => {
                            handleUpdate(admin);
                            navigate("/register");
                          }}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-delete-student"
                          onClick={() => {
                            deleteData(admin._id);
                          }}
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
        ) : (
          <div className="student-body1" style={{ color: "red" }}>
            <marquee behavior="smooth" direction="left">
              Database Empty....!
            </marquee>
          </div>
        )}
      </main>

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

export default ManagementDB;
