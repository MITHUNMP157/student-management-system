import React from "react";

const API_URL =
  "REACT_APP_URL=https://student-management-system-backend-78t4.onrender.com/";

export const register = async (username, password, role) => {
  try {
    const resRegister = await fetch(`${API_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await resRegister.json();
    if (!resRegister.ok) {
      throw new Error(data.message || "Register Failed");
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Invalid Credentials");
    }

    const token = data.token;
    const role = data.role;
    const userName = data.username;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", userName);
    console.log("LOGIN RESPONSE:", data);
    return token;
  } catch (error) {
    console.error(
      `Error during login:`,
      error.response ? error.response.data : error.message
    );
    throw new Error(error.message || "Login Failed");
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { valid: false };
  try {
    const response = await fetch(`${API_URL}verifyToken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return { valid: false };
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Token verification failed:", error);
    localStorage.removeItem("token");
    return { valid: false };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
