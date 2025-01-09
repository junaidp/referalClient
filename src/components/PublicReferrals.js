import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PublicReferrals.css";
import baseUrl from "./baseUrl"; // Import the centralized base URL

const PublicReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [randomUserEmail, setRandomUserEmail] = useState(null); // Randomly chosen user's email

  useEffect(() => {
    fetchPublicReferrals();
  }, []);

  const fetchPublicReferrals = () => {
    setLoading(true); // Set loading to true when fetching
    axios
      .get(`${baseUrl}/controller/getAllReferrals`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }) // Centralized API URL
      .then((response) => {
        console.log("API Response:", response); // Debugging API response
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const uniqueEmails = [...new Set(data.map((referral) => referral.email))];
          const randomEmail =
            uniqueEmails[Math.floor(Math.random() * uniqueEmails.length)];
          setRandomUserEmail(randomEmail); // Randomly choose a user's email
          const sortedReferrals = prioritizeReferrals(data, randomEmail);
          setReferrals(sortedReferrals); // Ensure referrals are sorted before rendering
        } else {
          setReferrals([]); // Fallback to an empty array
        }
      })
      .catch((err) => {
        console.error("Failed to fetch public referrals:", err);
        setReferrals([]); // Fallback to an empty array in case of error
      })
      .finally(() => setLoading(false)); // Set loading to false after the request completes
  };

  const prioritizeReferrals = (data, randomEmail) => {
    // Separate referrals by the randomly chosen user and others
    const randomUserReferrals = data.filter(
      (referral) => referral.email === randomEmail
    );
    const otherUserReferrals = data.filter(
      (referral) => referral.email !== randomEmail
    );

    // Decide which referrals should appear at the top based on 90%-10% probability
    const shouldPrioritizeRandomUser =
      Math.random() < 0.9; // 90% chance to prioritize the selected user's referrals

    if (shouldPrioritizeRandomUser) {
      return [...randomUserReferrals, ...otherUserReferrals];
    } else {
      return [...otherUserReferrals, ...randomUserReferrals];
    }
  };

  return (
    <div className="public-referrals">
      <h2>Explore Referral Links</h2>
      {loading ? ( // Show loading state if data is being fetched
        <p>Loading referrals...</p>
      ) : (
        <table className="referrals-table">
          <thead>
            <tr>
              <th>Referral Link</th>
              <th>Provider</th>
              <th>Shared By</th>
            </tr>
          </thead>
          <tbody>
            {referrals.length > 0 ? (
              referrals.map((referral) => (
                <tr key={referral.id}>
                  <td>
                    <a
                      href={referral.referralLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {referral.referralLink}
                    </a>
                  </td>
                  <td>{referral.referralProvider}</td>
                  <td>{referral.email || "Anonymous"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No referrals available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PublicReferrals;
