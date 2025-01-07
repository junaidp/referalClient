import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReferralForm.css";
import { useSelector } from "react-redux";



const ReferralForm = () => {
  const [referralLink, setReferralLink] = useState("");
  const [referralProvider, setReferralProvider] = useState("");
   const [referrals, setReferrals] = useState([]);
  const [isTreeOpen, setIsTreeOpen] = useState(true); // Default to open
  const email = useSelector((state) => state.common.token); // Replace with decoded email from token if needed
  // Rest of your code
  useEffect(() => {
    fetchReferrals(); // Fetch referral data on component load
  }, []);

  const fetchReferrals = () => {
    axios
      .get("https://2660-2a0a-a547-f2a0-0-b8ae-d478-c531-347d.ngrok-free.app/api/controller/getAllReferrals")
      .then((response) => {
        setReferrals(response.data);
      })
      .catch((err) => console.error("Failed to fetch referrals", err));
  };

  const handleSave = () => {
    if (!referralLink || !referralProvider) {
      alert("Please fill in both fields.");
      return;
    }

    const referralData = {
      referralLink,
      referralProvider,
      email: "user@example.com", // Replace with dynamic email if available
    };

    axios
      .post("https://2660-2a0a-a547-f2a0-0-b8ae-d478-c531-347d.ngrok-free.app/api/controller/saveReferal", referralData)
      .then((response) => {
        alert("Referral saved successfully!");
        setReferralLink(""); // Clear input fields
        setReferralProvider("");
        fetchReferrals(); // Refresh referral list
      })
      .catch((err) => {
        console.error("Failed to save referral", err);
        alert("Failed to save referral.");
      });
  };

  return (
    <div className="referral-form-container">
      <h2>Add Your Referral</h2>
      {/* Form to add a new referral */}
      <div className="form-group">
        <label htmlFor="referral-link">Referral Link</label>
        <input
          type="text"
          id="referral-link"
          className="form-input"
          value={referralLink}
          onChange={(e) => setReferralLink(e.target.value)}
          placeholder="Enter your referral link"
        />
      </div>
      <div className="form-group">
        <label htmlFor="referral-provider">Referral Provider</label>
        <input
          type="text"
          id="referral-provider"
          className="form-input"
          value={referralProvider}
          onChange={(e) => setReferralProvider(e.target.value)}
          placeholder="Enter provider name"
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>

    
      {/* Toggle button for referral Links */}
      <div
        className="tree-title"
        onClick={() => setIsTreeOpen(!isTreeOpen)}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "20px",
          color: "#008080",
        }}
      >
        {isTreeOpen ? "▼ Referral Links" : "► Referral Links"}
      </div>

      {/* Referral Data Grid */}
      {isTreeOpen && (
        <div className="referral-table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Referral Link</th>
                <th>Referral Provider</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {referrals.length > 0 ? (
                referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td>{referral.id || "-"}</td>
                    <td>
                      <a
                        href={referral.referralLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {referral.referralLink || "-"}
                      </a>
                    </td>
                    <td>{referral.referralProvider || "-"}</td>
                    <td>{referral.email || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No referral data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      )}
   
    </div>
  );
};

export default ReferralForm;
