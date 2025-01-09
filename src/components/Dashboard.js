import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import baseUrl from "./baseUrl";
import "./Dashboard.css";

const Dashboard = () => {
  const { token } = useSelector((state) => state.common);
  const email = localStorage.getItem("email"); // Get email from local storage
  const [referrals, setReferrals] = useState([]);
  const [editingReferral, setEditingReferral] = useState(null);
  const [formData, setFormData] = useState({ referralLink: "", referralProvider: "" });

  useEffect(() => {
    fetchReferrals();
  }, [email]);

  const fetchReferrals = () => {
    axios
      .get(`${baseUrl}/controller/getReferralsByUser?email=${email}`)
      .then((response) => {
        const data = response.data;
        setReferrals(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to fetch referrals", err));
  };

  const handleEdit = (referral) => {
    setEditingReferral(referral);
    setFormData({
      referralLink: referral.referralLink,
      referralProvider: referral.referralProvider,
    });
  };

  const handleUpdate = () => {
    if (!editingReferral) return;

    axios
      .put(`${baseUrl}/controller/updateReferral/${editingReferral.id}`, formData)
      .then(() => {
        alert("Referral updated successfully!");
        fetchReferrals();
        setEditingReferral(null);
      })
      .catch((err) => console.error("Failed to update referral", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this referral?")) {
      axios
        .delete(`${baseUrl}/controller/deleteReferral/${id}`)
        .then(() => {
          alert("Referral deleted successfully!");
          fetchReferrals();
        })
        .catch((err) => console.error("Failed to delete referral", err));
    }
  };

  return (
    <div className="dashboard">
      <h2>Your Referrals</h2>
      <table className="referral-table">
        <thead>
          <tr>
            <th>Referral Link</th>
            <th>Provider</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {referrals.length > 0 ? (
            referrals.map((referral) => (
              <tr key={referral.id}>
                <td>
                  <a href={referral.referralLink} target="_blank" rel="noopener noreferrer">
                    {referral.referralLink}
                  </a>
                </td>
                <td>{referral.referralProvider}</td>
                <td>
                  <button onClick={() => handleEdit(referral)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(referral.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No referrals found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingReferral && (
        <div className="edit-form">
          <h3>Edit Referral</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div>
              <label>Referral Link:</label>
              <input
                type="text"
                value={formData.referralLink}
                onChange={(e) => setFormData({ ...formData, referralLink: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Provider:</label>
              <input
                type="text"
                value={formData.referralProvider}
                onChange={(e) => setFormData({ ...formData, referralProvider: e.target.value })}
                required
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingReferral(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
