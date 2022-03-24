import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";
import "./Registration.css"

export default function Registration() {

  const navigate = useNavigate();


  function register(e) {

    e.preventDefault();
    const user = document.getElementById("username").value; 
    const password1 = document.getElementById("pass1").value;
    const password2 = document.getElementById("pass2").value;
    const emailT = document.getElementById("email").value;

    if (password1.length < 8) {
      document.getElementById("pass1").value = "";
      document.getElementById("pass2").value = "";
    }

    if (!(password1 === password2)) {
      document.querySelector("label.information").innerHTML = "Password's do not match";
      document.getElementById("pass1").value = "";
      document.getElementById("pass2").value = "";
      console.log(password1);
      console.log(password2);
      return -1;
    }
    if (!(user || password1 || password2 || emailT)) {
      document.querySelector("label.information").innerHTML = "Missing field";
      return -1;
    }

    const objToSend = {
      username : user,
      email : emailT,
      password : password1
    }
    
    axios
    .post("https://bloom-rest.herokuapp.com/authentication/register/", objToSend)
    .then((response) => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      document.querySelector("label.information").innerHTML = "Registration Successful"
      navigate("/startups");
    }).catch(error => {
      
      document.querySelector("label.information").innerHTML = "Registration Incomplete"
      document.getElementById("pass1").value = "";
      document.getElementById("pass2").value = "";
      console.log(error)
    })



  }
  return (
    <div className="container">
      <div className="row">
        <h2 className="pg-title">Sign Up</h2>
        <form className="col-lg-12 reg-form">
          
          <div className="row">
          <label className="information"></label>
            <div className="col-lg-12 form-type">
                <label className="indicator-lb">Email</label>
                <input id="email" type="email" className="form-control" placeholder="Email" />    
            </div>
            <div className="col-lg-12 form-type">
                <label className="indicator-lb">Username</label>
                <input id="username" type="" className="form-control" placeholder="Username" />    
            </div>
            <div className="col-lg-6 form-type">
            <label  className="indicator-lb">Password</label>
              <input
                id="pass1"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="col-lg-6 form-type">
            <label className="indicator-lb">Reconfirm Password</label>
              <input id="pass2" type="password" className="form-control" placeholder="Password" />
            </div>
            <ul>
              <li>Password must be at least 8 characters long</li>
            </ul>
            <button className="btn btn-primary" onClick={e => register(e)}>
                    Sign-Up
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}
