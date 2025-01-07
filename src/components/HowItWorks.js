import React from 'react';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <div>
            <h3>Sign Up and Share Your Links</h3>
            <p>Create an account and add your referral links from various platforms and services.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div>
            <h3>Others Use Your Links</h3>
            <p>When someone needs a referral link, they can find and use yours from our platform.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div>
            <h3>Earn Rewards</h3>
            <p>Get rewarded when people use your referral links to sign up for services or make purchases.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
