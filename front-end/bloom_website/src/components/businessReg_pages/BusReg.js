import React from "react";
import {useNavigate } from "react-router-dom";

import axios from "axios";
import "./BusReg.css";

export default function BusinessRegistration() {
  const navigate = useNavigate();

  

  function giveYears() {

    let years = []

    for (let i = 1970; i< 2023; i++) {
      years.push(i.toString());
    }

    return years.map(year => <option key={year} label={year}>{year}</option>)
  }
  function giveDays() {

    let years = []

    for (let i = 1; i< 32; i++) {
      if (i < 10) {

        years.push('0' + i.toString());
      } else {
        years.push(i.toString());
      }
    }

    return years.map(year => <option key={year} label={year}>{year}</option>)
  }

  function register(e) {
    e.preventDefault();
    const businessName = document.getElementById("busname").value;
    const foundersName = document.getElementById("found").value;
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;
    let dateFounded = year + '-' + month + "-" + day;
    const descript = document.getElementById("descrip").value;
    const mail = document.getElementById("mail").value;
    const numberEmployees = document.getElementById("num").value;
    const ind = document.getElementById("indus").value;
    let missing = false;
    console.log(ind);
    console.log(dateFounded);

    let loading = false;
    loading = true;
    if (loading) {
      document.querySelector(".information").innerHTML = "Loading"
    }

    // Checks for missing fields
    if (!businessName) {
      document.querySelector("label.businessName").innerHTML =
        "Missing Business Name";
      missing = true;
    }
    if (!foundersName) {
      document.querySelector("label.foundersName").innerHTML =
        "Missing Founder's Name";
      missing = true;
    }
    if (!dateFounded) {
      document.querySelector("label.dateFounded").innerHTML =
        "Missing Date founded field";
      missing = true;
    }
    if (!descript) {
      document.querySelector("label.description").innerHTML =
        "Missing Description field";
      missing = true;
    }
    if (!mail) {
      document.querySelector("label.email").innerHTML = "Missing Email field";
      missing = true;
    }
    if (!numberEmployees) {
      document.querySelector("label.numberEmployees").innerHTML =
        "Missing Number of Employees field";
      missing = true;
    }
    if (!ind) {
      document.querySelector("label.ind").innerHTML = "Missing Industry field";
      missing = true;
    }

    if (missing) {
      return -1;
    }
    const token = JSON.parse(localStorage.getItem("token"));


    const objToSend = {
      name: businessName,
      founders: foundersName,
      date_founded: dateFounded,
      description: descript,
      email: mail,
      num_employees: parseInt(numberEmployees),
      industry: ind,
    };

    console.log(objToSend);
    console.log(ind);

    axios
    .post("https://bloom-rest.herokuapp.com/startups/", objToSend, {
      headers: {
      Authorization: `Token ${token}`,
      }})
    .then(function (response) {
      //Not sure we need this here but how else would we call register?
      document.querySelector("label.information").innerHTML = "Registration Successful"
      navigate("/startups");
    }).catch(error => {
      document.querySelector("label.information").innerHTML = "Registration Failed"
      console.log(error)})
  }
  return (
    <div className="container">
      <div className="row">
        <h2 className="pg-title">Business Registration</h2>
        <form id="reg-form">
          <label className="information"></label>

          <div className="form-group row field">
            <label className="businessName error-info"></label>
            <div className="col-sm-10">
              <label htmlFor="busname" className=" col-form-label">
                Business Name
              </label>
              <input
                className="form-control"
                id="busname"
                placeholder="Business's name"
              />
            </div>
          </div>
          <div className="form-group row field">
            <label className="foundersName error-info"></label>
            <div className="col-sm-10">
              <label htmlFor="found" className=" col-form-label">
                Founder
              </label>
              <input
                className="form-control"
                id="found"
                placeholder="Founder's name"
              />
            </div>
          </div>
          <div className="form-group row field">
            <label className="dateFounded error-info"></label>
            {/* <div className="col-sm-10">
                  <label htmlFor="datefound" className=" col-form-label">Date Founded</label>
                  <input className="form-control" id="datefound" placeholder="Date"/>
                </div> */}
            <div className="col-lg-4">
              <label className="col-form-label">Year</label>
              <select id="year" className="form-control" defaultValue={"2022"}>
                {giveYears()}

              </select>

            </div>
            <div className="col-lg-4">
              <label className="col-form-label">Month</label>
              <select id="month" className="form-control" defaultValue={"01"}>
                <option label="January">01</option>
                <option label="February">02</option>
                <option label="March">03</option>
                <option label="April">04</option>
                <option label="May">05</option>
                <option label="June">06</option>
                <option label="July">07</option>
                <option label="August">08</option>
                <option label="September">09</option>
                <option label="October">10</option>
                <option label="November">11</option>
                <option label="December">12</option>
              </select>
            </div>
            <div className="col-lg-4">
              <label className="col-form-label">Day</label>
              <select id="day" className="form-control" defaultValue={"01"}>
                  {giveDays()}
              </select>
            </div>
          </div>
          <div className="form-group row field">
            <label className="description error-info"></label>
            <div className="col-sm-10">
              <label htmlFor="descrip" className=" col-form-label">
                Description
              </label>
              <input
                className="form-control"
                id="descrip"
                placeholder="Brief description of your business"
              />
            </div>
          </div>
          <div className="form-group row field">
            <label className="email error-info"></label>
            <div className="col-sm-10">
              <label htmlFor="mail" className=" col-form-label">
                Email
              </label>
              <input
                className="form-control"
                id="mail"
                placeholder="Business Email"
              />
            </div>
          </div>
          <div className="form-group row field">
            <label className="numberEmployees error-info"></label>
            <div className="col-sm-10">
              <label htmlFor="num" className=" col-form-label">
                Number of Employees
              </label>
              <input
                className="form-control"
                id="num"
                placeholder="Number of employees in your business"
              />
            </div>
          </div>

          <div className="form-group row field">
            <div className="col-sm-10">
              <label className="ind"></label>
              <label htmlFor="indus" className="col-form-label">
                Industry
              </label>
              <select id="indus" className="form-control" defaultValue={"OT"}>
                <option label="Others">OT</option>
                <option label="Real Estate">RE</option>
                <option label="Trading">TR</option>
                <option label="Services">SR</option>
                <option label="Travel and Tourism">TT</option>
                <option label="Hospitality">HS</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => register(e)}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
