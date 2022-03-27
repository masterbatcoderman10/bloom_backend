import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  function checkSignedIn() {
    const token = localStorage.getItem('token');
    return token ? <button className={`btn`} id="sign-in-btn" onClick={() => 
      {
      
      localStorage.removeItem('token');
      console.log("broken?")
      navigate("/")
    }}>SIGN-OUT</button> :
    <button className={`btn`} id="sign-in-btn" onClick={() => navigate("/login")}>SIGN-IN</button>
     
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            BLOOM
          </Link>
          <div className="menu-icon" onClick={handleClick}></div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/marketplace"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Marketplace
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/startups"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {checkSignedIn()}
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
