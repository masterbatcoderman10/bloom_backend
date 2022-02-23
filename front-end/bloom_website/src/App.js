import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from './components/pages/Marketplace';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import HeroSection from './components/HeroSection';
import CardItem from './components/CardItem';
import Footer from './components/Footer';
import Cards from './components/Cards';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/marketplace' component={Marketplace} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/' exact component={Home} />
        </Routes>
        <Navbar />
        <HeroSection />
        <Cards />
        <Footer />
      </Router>
  );
}

export default App;
