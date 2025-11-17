import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/singpagecrud/Register";
import Home from "./component/Home";
import StudentDetails from "./component/database/StudentDetails";
import ManagementDB from "./component//database/ManagementDB";
import LoginForm from "./component/register-login/LoginForm";
import { useState, useEffect } from "react";
import SinglePageCrud from "./component/singpagecrud/SinglePageCrud";
import LoginFormCrud from "./component/singpagecrud/LoginFormCrud";
import RegisterForm from "./component/register-login/RegisterForm";
import RegisterFormLogin from "./component/register-login/RegisterFormLogin";
import ProductedRoute from "./component/production-route/ProductedRoute";

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
              <StudentDetails />
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
          path="/singlecrud"
          element={
            <ProductedRoute>
              <Header />
              <SinglePageCrud />
            </ProductedRoute>
          }
        />
        <Route path="/logincrud" element={<LoginFormCrud />} />
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/registerformlogin" element={<RegisterFormLogin />} />
      </Routes>
    </div>
  );
}

export default App;
