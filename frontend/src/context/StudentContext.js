import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const navigate = useNavigate();

  const REACT_APP_URL =
    "https://student-management-system-backend-78t4.onrender.com";

  /*StudentDataBase state use to GET/DELETE API Array purpose*/
  const [studentDataBase, setStudentDataBase] = useState([]);
  const [managementDB, setManagementDB] = useState([]);

  /*FromData state use to UPDATE API data edit/update purpose*/
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    gender: "",
    department: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    age: "",
    enrollDate: "",
    batchYear: "",
    district: "",
    state: "",
  });

  /*Age calculate*/

  /*Upload / Update function data get from FORM*/
  const handleSubmitForm = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const gender = form.gender.value;
    const department = form.department.value;
    const email = form.email.value;
    const mobile = form.mobile.value;
    const password = form.password.value;
    const dob = form.dob.value;
    const age = form.age.value;
    const enrollDate = form.enrollDate.value;
    const batchYear = form.batchYear.value;
    const district = form.district.value;
    const state = form.state.value;

    if (
      name === "" ||
      gender === "" ||
      department === "" ||
      email === "" ||
      mobile === "" ||
      password === "" ||
      dob === "" ||
      age === "" ||
      enrollDate === "" ||
      batchYear === "" ||
      district === "" ||
      state === ""
    ) {
      toast.warn("Enter Valid Inputs");
      return;
    }
    const studentData = {
      name,
      gender,
      department,
      email,
      mobile,
      password,
      dob,
      age,
      enrollDate,
      batchYear,
      district,
      state,
    };
    console.log(studentData);

    if (formData._id) {
      /*Update API*/

      try {
        const res = await fetch(`${REACT_APP_URL}/editdata/${formData._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentData),
        });
        const data = await res.json();
        toast.success("Student updated successfully!");
        fetchStudentData(data);
        setTimeout(() => {
          navigate("/studentdb");
        });
      } catch (error) {
        toast.error("Failed to Update item", error);
      }
    } else {
      /*Upload(New Register) API*/

      try {
        const res = await fetch(`${REACT_APP_URL}/studentRegister`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentData),
        });
        const data = await res.json();
        toast.success("Upload Success");
        console.log(data);
        form.reset();
        setTimeout(() => {
          navigate("/managementdb");
        }, 1000);
      } catch (error) {
        toast.warn("Upload Failed");
        console.log("Upload Failed:", error);
      }
    }
  };

  /*Upload Form Data store to formData(state)*/
  const updateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*Get API from Backend*/
  const fetchStudentData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${REACT_APP_URL}/getdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setStudentDataBase(data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };
  const fetchAdminData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${REACT_APP_URL}/getdata/managementDB`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setManagementDB(data.data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
    fetchAdminData();
  }, []);

  /*Update Button onClick event function*/
  const handleUpdate = (student) => {
    setFormData(student);
  };

  /*Delete API*/
  const deleteData = (id) => {
    fetch(`${REACT_APP_URL}/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.error("Delete Successful");
        setStudentDataBase((prevData) =>
          prevData.filter((student) => student._id !== id)
        );
      })
      .catch((error) => {
        console.error("Delete error:", error);
        toast.error("Failed to delete item");
      });
  };

  const loginHandleSubmit = (form) => {
    if (!form.username || !form.email || !form.password) {
      alert("Please fill input fields");
    } else {
      fetch(`http://localhost:5050/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log("Post Error :", err);
        });
    }
  };

  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("username");

  return (
    <StudentContext.Provider
      value={{
        userRole,
        userName,
        studentDataBase,
        managementDB,
        formData,
        updateChange,
        handleSubmitForm,
        handleUpdate,
        deleteData,
        setFormData,
        navigate,
        loginHandleSubmit,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
