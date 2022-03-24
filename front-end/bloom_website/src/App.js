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
import ProtectedRoutes from './ProtectedRoutes';
import Error from './components/pages/Error'
import BusinessContainer from './components/business_pages/BusinessContainer';

function App() {
  return (
      <Router>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="*" element={<Error />}></Route>
          <Route element={<ProtectedRoutes />}>
            
            <Route path="/startups" element={<BusinessContainer />}></Route>
            
          </Route>
        </Routes>
        
        <Footer />
      </Router>
  );
}

export default App;
