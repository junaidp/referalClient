import React, { useState } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import { changeToken } from "../reducers/common";
import { useDispatch } from "react-redux";
import baseUrl from "./baseUrl"; // Import the base URL

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const navigate = useNavigate();

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLogin = (email, password) => {
    axios
      .post(`${baseUrl}/user/login`, { email, password }) // Use the imported base URL
      .then((response) => {
        console.log("Login successful", response.data);
        localStorage.setItem("token", "mock-jwt-token"); // Save mock token
        localStorage.setItem("email", email); // Save email
        dispatch(changeToken("mock-jwt-token")); // Dispatch token to Redux store
        navigate("/referral"); // Redirect to referral form
      })
      .catch((err) => {
        console.error("Login failed", err);
        alert("Invalid credentials");
      });
  };

  const handleSignup = (email, password) => {
    axios
      .post(`${baseUrl}/user/register`, { email, password }) // Use the imported base URL
      .then((response) => {
        alert("User registered successfully!"); // Notify user
        navigate("/referral"); // Redirect to referral form
      })
      .catch((err) => {
        console.error("Signup failed", err);
        alert("Error registering user");
      });
  };

  return (
    <div>
      {isLoginModalOpen && (
        <LoginModal
          closeLoginModal={closeLoginModal}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />
      )}
    </div>
  );
};

export default LoginPage;
