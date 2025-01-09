import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PublicReferrals.css';
import baseUrl from './baseUrl'; // Import the centralized base URL

const PublicReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state

  useEffect(() => {
    fetchPublicReferrals();
  }, []);

  const fetchPublicReferrals = () => {
    setLoading(true);  // Set loading to true when fetching
    axios
      .get(`${baseUrl}/controller/getAllReferrals`) // Centralized API URL
      .then((response) => {
        console.log('API Response:', response); // Debugging API response
        const data = response.data;
        setReferrals(Array.isArray(data) ? data : []); // Ensure referrals is always an array
      })
      .catch((err) => {
        console.error('Failed to fetch public referrals:', err);
        setReferrals([]); // Fallback to an empty array in case of error
      })
      .finally(() => setLoading(false)); // Set loading to false after the request completes
  };

  return (
    <div className="public-referrals">
      <h2>Explore Referral Links</h2>
      {loading ? (  // Show loading state if data is being fetched
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
                  <td>{referral.email || 'Anonymous'}</td>
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
