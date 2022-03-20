import React from 'react';
import '../App.css';
import { Button } from './Button';
import { Routes, Route, useNavigate } from "react-router-dom";
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className='hero-container'>
      <video src='/videos/Video-3.mp4' autoPlay loop muted />
      <h1 >YOUR ONE-STOP SHOP FOR ALL YOUR BUSINESS NEEDS</h1>
      <p>Register with us today!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={() => navigate("/register")}
        >
          Get started
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
