import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  function checkSignedIn() {
    const token = localStorage.getItem("token");
    return token ? (
      <button
        className={`btn`}
        id="sign-in-btn"
        onClick={() => {
          localStorage.removeItem("token");
          console.log("broken?");
          navigate("/");
        }}
      >
        SIGN-OUT
      </button>
    ) : (
      <button
        className={`btn`}
        id="sign-in-btn"
        onClick={() => navigate("/login")}
      >
        SIGN-IN
      </button>
    );
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
      <nav 
        className="navbar navbar-expand-lg navbar-dark"
        id="bloom-nav">
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand"
            id="heading"
            onClick={closeMobileMenu}
          >
            BLOOM
          </Link>
          {/* <div className="menu-icon" onClick={handleClick}></div> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item nav-li">
                <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item nav-li">
                <Link
                  to="/marketplace"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Marketplace
                </Link>
              </li>
              <li className="nav-item nav-li">
                <Link
                  to="/startups"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>

              <li className="nav-item nav-li">{checkSignedIn()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
