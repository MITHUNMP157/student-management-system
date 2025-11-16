import React, { useContext } from "react";
import "./StudentDetails.css";
import { ToastContainer } from "react-toastify";
import { StudentContext } from "../context/StudentContext";

const StudentDetails = () => {
  const { studentDataBase } = useContext(StudentContext);

  return (
    <div>
      <main className="student-main">
        {studentDataBase.length > 0 ? (
          <div className="student-body">
            <div className="student-title">
              <h2>Student Database List</h2>
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
                    <th>Mobile</th>
                    <th>Enroll Date</th>
                    <th>Batch Year</th>
                    <th>District</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {studentDataBase.map((student, index) => (
                    <tr key={student._id || index}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.gender}</td>
                      <td>{student.department}</td>
                      <td>{student.email}</td>
                      <td>{student.mobile}</td>
                      <td>{student.enrollDate}</td>
                      <td>{student.batchYear}</td>
                      <td>{student.district}</td>
                      <td>{student.state}</td>
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

export default StudentDetails;
