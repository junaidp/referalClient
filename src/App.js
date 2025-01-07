import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeToken } from "./reducers/common";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import ReferralForm from "./components/ReferralForm";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import PublicReferrals from "./components/PublicReferrals";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectRoutes from "./components/ProtectRoutes";
function App() {
  const token = useSelector((state) => state.common.token); // Get token from Redux store
  const dispatch = useDispatch();

 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(changeToken("")); // Dispatch the logout action
  };

  return (
    <Router>
      <div>
        <Header token={token} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <ProtectRoutes>
                <LoginPage />
              </ProtectRoutes>
            }
          />
          <Route
            path="/referral"
            element={
              <ProtectedRoute>
                <ReferralForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/referrals"
            element={
              <ProtectRoutes>
                <PublicReferrals />
              </ProtectRoutes>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <Features />
    </div>
  );
}

export default App;
