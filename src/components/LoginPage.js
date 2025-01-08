import React, { useState } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import { changeToken } from "../reducers/common";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const navigate = useNavigate();

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLogin = (email, password) => {
    axios
      .post("https://2660-2a0a-a547-f2a0-0-b8ae-d478-c531-347d.ngrok-free.app/api/user/login", { email, password })
      .then((response) => {
       // alert(response.data); // "Login successful!"
        localStorage.setItem("token","mock-jwt-token")
        localStorage.setItem("email",email)
        dispatch(changeToken("mock-jwt-token"));
        navigate("/referral"); // Redirect to referral form
      })
      .catch((err) => {
        console.error("Login failed", err);
        alert("Invalid credentials");
      });
  };

  const handleSignup = (email, password) => {
    axios
      .post("https://2660-2a0a-a547-f2a0-0-b8ae-d478-c531-347d.ngrok-free.app/api/user/register", { email, password })
      .then((response) => {
        alert(response.data); // "User registered successfully!"
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
