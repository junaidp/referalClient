import React from 'react';

const HeroSection = ({ openLoginModal }) => {
  return (
    <section className="hero">
      <h1>Turn Your Referral Links into Rewards</h1>
      <p>Join our community of smart sharers who earn rewards by helping others discover great products and services.</p>
      <button className="btn" onClick={openLoginModal}>Get Started</button>
    </section>
  );
};

export default HeroSection;
