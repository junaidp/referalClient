import React from 'react';

const Features = () => {
  return (
    <section className="features">
      <h2>Why Choose ReferralHub?</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-link"></i>
          </div>
          <h3>Centralized Platform</h3>
          <p>Keep all your referral links in one place and manage them easily.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-users"></i>
          </div>
          <h3>Community Driven</h3>
          <p>Join a community of users sharing and benefiting from referral programs.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h3>Secure & Reliable</h3>
          <p>Your links are safe with us, and we ensure fair distribution among users.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
