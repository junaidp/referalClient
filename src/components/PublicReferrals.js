import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PublicReferrals.css';

const PublicReferrals = () => {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    axios
      .get('https://2660-2a0a-a547-f2a0-0-b8ae-d478-c531-347d.ngrok-free.app/api/controller/getAllReferrals')
      .then((response) => setReferrals(response.data))
      .catch((err) => console.error('Failed to fetch public referrals', err));
  }, []);

  
  return (
    <div className="public-referrals">
      <h2>Explore Referral Links</h2>
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
                  <a href={referral.referralLink} target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

export default PublicReferrals;
