import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReferralForm.css";
import { useSelector } from "react-redux";
import baseUrl from "./baseUrl";

const ReferralForm = () => {
  const [referralLink, setReferralLink] = useState("");
  const [referralProvider, setReferralProvider] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [isTreeOpen, setIsTreeOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const email = useSelector((state) => state.common.email); // Get dynamic email from Redux

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/controller/getAllReferrals`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }) // Use baseUrl dynamically
      .then((response) => {
        setReferrals(Array.isArray(response.data) ? response.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch referrals", err);
        setReferrals([]); // Fallback to an empty array
      })
      .finally(() => setLoading(false));
  };

  const handleSave = () => {
    if (!referralLink || !referralProvider) {
      alert("Please fill in both fields.");
      return;
    }

    const referralData = {
      referralLink,
      referralProvider,
      email: email || "me@gmail.com", // Use dynamic email or fallback to a default
      email: email || "user@example.com",
      email: email || "rahimshujaat8@gmail.com",
      email: email || "g@gmail.com",
    };

    axios
      .post(`${baseUrl}/controller/saveReferal`, referralData, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }) // Use baseUrl dynamically
      .then((response) => {
        // alert("Referral saved successfully!");
        setReferralLink(""); // Clear input fields
        setReferralProvider("");
        fetchReferrals(); // Refresh referrals after saving
      })
      .catch((err) => {
        console.error("Failed to save referral", err);
        alert("Failed to save referral.");
      });
  };

  return (
    <div className="referral-form-container">
      <h2>Add Your Referral</h2>
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

      {isTreeOpen && (
        <div className="referral-table-container">
          {loading ? (
            <p>Loading referrals...</p>
          ) : (
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
                {Array.isArray(referrals) && referrals.length > 0 ? (
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
          )}
        </div>
      )}
    </div>
  );
};

export default ReferralForm;
