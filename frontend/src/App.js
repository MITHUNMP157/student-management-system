import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Register";
import Home from "./component/Home";
import StudentDetails from "./component/StudentDetails";
import ManagementDB from "./component/ManagementDB";
import LoginForm from "./component/LoginForm";
import { useState, useEffect } from "react";
import SinglePageCrud from "./component/SinglePageCrud";
import LoginFormCrud from "./component/LoginFormCrud";
import RegisterForm from "./component/RegisterForm";
import RegisterFormLogin from "./component/RegisterFormLogin";
import ProductedRoute from "./component/ProductedRoute";

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
