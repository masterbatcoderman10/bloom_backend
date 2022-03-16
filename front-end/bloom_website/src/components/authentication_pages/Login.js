

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login(e) {
  
  const navigate = useNavigate();

  function login(e) {

    e.preventDefault();
    const emailVar = document.querySelector(".email").value;
    const passwordVar = document.querySelector(".password").value;

    const obj = {
      email: emailVar,
      password: passwordVar,
    }

    if (emailVar && passwordVar) {
      axios
        .post("http://127.0.0.1:8000/login/", obj)
        .then(function (response) {
          console.log(response.data);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          
        })
        .catch(function (error) {
          console.log(error);
        });

      
    } else {
      document.querySelector(".information").innerHTML = "Login Failed"
    }
  }

  return (
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <h2>Sign In</h2>
                <form>
                <label className="information"></label>
                <div className="form-group">
                    <label >Email address</label>
                    <input
                    type="email"
                    className="form-control email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-control password"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    />
                </div>
                <button className="btn btn-primary" onClick={e => login(e)}>
                    Submit
                </button>
                </form>
            </div>
        </div>
    </div>
  );
}