import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Registration() {
  return (
    <div className="container">
      <div className="row">
        <h2>Sign Up</h2>
        <form className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
                <input type="email" className="form-control" placeholder="Email" />    
            </div>
            <div className="col-lg-12">
                <input type="" className="form-control" placeholder="Username" />    
            </div>
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="col-lg-6">
              <input type="text" className="form-control" placeholder="Last name" />
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
}
