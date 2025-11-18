import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Home from "./component/Home";
import Register from "./component/entrollment/StudentEntrollment";
import UserProfile from "./component/profile/UserProfile";
import StudentDB from "./component/database/StudentDB";
import ManagementDB from "./component//database/ManagementDB";
import RegisterPortal from "./component/register-login/RegisterPortal";
import LoginPortal from "./component/register-login/LoginPortal";
import ProductedRoute from "./component/production-route/ProductedRoute";

import SinglePageCrud from "./component/singpagecrud/SinglePageCrud";
import LoginFormCrud from "./component/singpagecrud/LoginFormCrud";
import LoginForm from "./component/register-login/LoginForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProductedRoute>
              <Header />
              <Home />
            </ProductedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProductedRoute>
              <Header />
              <Register />
            </ProductedRoute>
          }
        />
        <Route
          path="/studentdb"
          element={
            <ProductedRoute>
              <Header />
              <StudentDB />
            </ProductedRoute>
          }
        />
        <Route
          path="/managementdb"
          element={
            <ProductedRoute>
              <Header />
              <ManagementDB />
            </ProductedRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <ProductedRoute>
              <Header />
              <UserProfile />
            </ProductedRoute>
          }
        />
        <Route path="/register-portal" element={<RegisterPortal />} />
        <Route path="/login-portal" element={<LoginPortal />} />
      </Routes>
    </div>
  );
}

export default App;
