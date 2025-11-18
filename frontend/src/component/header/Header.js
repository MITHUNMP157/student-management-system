import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import "./Home.css";
import { logout } from "../auth/Auth";
import CollageLogo from "./CollageLogo";

const Header = ({ setIsLoggedIn }) => {
  return (
    <div>
      <header>
        <div className="header-header">
          <div className="nav-bar">
            <CollageLogo />
            <div className="nav-item" id="navitems">
              <ul>
                <li>
                  <Link to="/" className="student-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="student-link">
                    Student Enrollment
                  </Link>
                </li>
                <li>
                  <Link to="/studentDB" className="student-link">
                    Student Database
                  </Link>
                </li>
                <li>
                  <Link to="/managementdb" className="student-link">
                    Management Database
                  </Link>
                </li>
                {/* <li>
                  <Link
                    onClick={() => setLogin(false)}
                    to="/singlecrud"
                    className="student-link"
                  >
                    Single-Page-Crud
                  </Link>
                </li>
                 <li>
                  <Link to="/logincrud" className="student-link">
                    Login-Crud
                  </Link>
                </li> 
                <li>
                  <Link to="/registerform" className="student-link">
                    Register
                  </Link>
                </li>
                */}
                <li>
                  <Link
                    to="/login-portal"
                    className="student-link"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
