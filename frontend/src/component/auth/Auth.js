import React from "react";

const REACT_APP_URL = process.env.REACT_APP_URL;

export const register = async (username, password, role) => {
  try {
    const resRegister = await fetch(`${REACT_APP_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });
    const rawData = await resRegister.text();

    let data;
    console.log(REACT_APP_URL);

    try {
      data = rawData ? JSON.parse(rawData) : null;
      console.log(data);
    } catch (raw) {
      console.log("Invalid JSON Response:", raw);
      throw new Error("Server did not return valid JSON");
    }

    if (!resRegister.ok) {
      throw new Error(data.message || "Register Failed");
    }

    return data;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${REACT_APP_URL}/login`, {
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
    const response = await fetch(`${REACT_APP_URL}/verifyToken`, {
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
