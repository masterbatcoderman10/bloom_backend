import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";
import "./Registration.css"

export default function BusinessRegistration() {

  const navigate = useNavigate();

  function register(e) {

    e.preventDefault();
    const businessName = document.getElementById("busname").value; 
    const foundersName = document.getElementById("found").value;
    const dateFounded = document.getElementById("datefound").value;
    const descript = document.getElementById("descrip").value;
    const mail = document.getElementById("mail").value;
    const numberEmployees = document.getElementById("num").value;
    const ind = document.getElementById("indus").value;


    // Checks for missing fields
    if (!businessName) {
      document.querySelector("label.businessName").innerHTML = "Missing Business Name";
      return -1;
    }
    if (!foundersName) {
        document.querySelector("label.foundersName").innerHTML = "Missing Founder's Name";
        return -1;
    }
    if (!dateFounded) {
        document.querySelector("label.dateFounded").innerHTML = "Missing Date founded field";
        return -1;
    }
    if (!descript) {
        document.querySelector("label.description").innerHTML = "Missing Description field";
        return -1;
    }
    if (!mail) {
        document.querySelector("label.email").innerHTML = "Missing Email field";
        return -1;
    }
    if (!numberEmployees) {
        document.querySelector("label.numberEmployees").innerHTML = "Missing Number of Employees field";
        return -1;
    }
    if (!ind) {
        document.querySelector("label.ind").innerHTML = "Missing Industry field";
        return -1;
    }

    const objToSend = {
      user         : user,
      name         : businessName,
      founders     : foundersName,
      date_founded : dateFounded,
      description  : descript,
      email        : mail,
      num_employees: numberEmployees,
      industry     : ind,
    }

    axios
    .post("https://bloom-rest.herokuapp.com/authentication/register/", objToSend)
    .then(function (response) {
      //Not sure we need this here but how else would we call register?
      document.querySelector("label.information").innerHTML = "Registration Successful"
      navigate("/businessregistration");
    }).catch(error => console.log(error))


  }
  return (
    <div className="container">
      <div className="row">
        <h2 className="pg-title">Business Registration</h2>
        <form>
            <label className="information"></label>

            <label className="businessName"></label>
            <div className="form-group row">
                <label htmlFor="busname" className="col-sm-2 col-form-label">Business Name</label>
                <div className="col-sm-10">
                <input className="form-control" id="busname" placeholder="Business's name"/>
                </div>
            </div>
            <label className="foundersName"></label>
            <div className="form-group row">
                <label htmlFor="found" className="col-sm-2 col-form-label">Founder</label>
                <div className="col-sm-10">
                <input className="form-control" id="found" placeholder="Founder's name"/>
                </div>
            </div>
            <label className="dateFounded"></label>
            <div className="form-group row">
                <label htmlFor="datefound" className="col-sm-2 col-form-label">Date Founded</label>
                <div className="col-sm-10">
                <input className="form-control" id="datefound" placeholder="Date"/>
                </div>
            </div>
            <label className="description"></label>
            <div className="form-group row">
                <label htmlFor="descrip" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                <input className="form-control" id="descrip" placeholder="Brief description of your business"/>
                </div>
            </div>
            <label className="email"></label>
            <div className="form-group row">
                <label htmlFor="mail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input className="form-control" id="mail" placeholder="Business Email"/>
                </div>
            </div>
            <label className="numberEmployees"></label>
            <div className="form-group row">
                <label htmlFor="num" className="col-sm-2 col-form-label">Number of Employees</label>
                <div className="col-sm-10">
                <input className="form-control" id="num" placeholder="Number of employees in your business"/>
                </div>
            </div>

            <div className="form-group col-md-4">
                <label className="ind"></label>
                <label for="indus">Industry</label>
                <select id="indus" className="form-control">
                    <option selected>Choose...</option>
                    <option label="Real Estate">RE</option>
                    <option label="Trading">TR</option>
                    <option label="Services">SR</option>
                    <option label="Travel and Tourism">TT</option>
                    <option label="Hospitality">HS</option>
                    <option label="Others">OT</option>
                </select>
            </div>      

            <div className="form-group row">
                <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}
