import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/authentication_pages/Login"
import Registration from "./components/authentication_pages/Registration"
import SignUp from './components/pages/SignUp';
import HeroSection from './components/HeroSection';
import CardItem from './components/CardItem';
import Footer from './components/Footer';
import Cards from './components/Cards';

function App() {
  return (
      <Router>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
        </Routes>
        
        <Footer />
      </Router>
  );
}

export default App;
