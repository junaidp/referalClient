import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ token, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">ReferralHub</div>
        <div>
          {!token && (
            <>
              <button className="btn" onClick={() => navigate("/referrals")}>
                Explore Referrals
              </button>
              <button className="btn" onClick={() => navigate("/login")}>
                Login / Sign Up
              </button>
            </>
          )}
          {token && (
            <>
              <button className="btn" onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
