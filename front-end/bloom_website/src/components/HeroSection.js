import React from 'react';
import '../App.css';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import bckground from "./home_bckgrnd.jpg"

function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className='hero-container'>
      {/* <video src='/videos/Video-3.mp4' autoPlay loop muted /> */}
      
      <h1 >YOUR ONE-STOP SHOP FOR ALL YOUR BUSINESS NEEDS</h1>
      <p>Register with us today!</p>
      <div className='hero-btns'>
        <button
          className='btn sign-in'
          id="sign-in-btn"
          onClick={() => navigate("/register")}
        >
          Get started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
