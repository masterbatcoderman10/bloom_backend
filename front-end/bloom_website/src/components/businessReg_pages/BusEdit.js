import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./BusReg.css";

export default function BusEdit() {
  //State initializations
  const navigate = useNavigate();
  const params = useParams();
  const stID = params.startupID;
  const [Bname, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [found, setFound] = useState("");
  const [Bemail, setEmail] = useState("");
  const [employees, setEmployees] = useState(0);
  const [ind, setIndustry] = useState("");
  const [indChange, setChange] = useState(false);
  //These are states for the year, month, and day, and their respective counters - their counters give the information whether they have been modified.
  const [year, setYear] = useState("2022");
  const [month, setMonth] = useState("January");
  const [day, setDay] = useState("01");
  let [yearC, setYearC] = useState(0);
  let [monthC, setMonthC] = useState(0);
  let [dayC, setDayC] = useState(0);

  function edit(e) {
    e.preventDefault();
    
    //This is a list that keeps track of the updated values
    let updatedTerms = [];
    let updatedValues = [];
    if (Bname) {
      updatedTerms.push("name");
      updatedValues.push(Bname);
    }
    if (desc) {
      updatedTerms.push("description");
      updatedValues.push(desc);
    }
    if (found) {
      updatedTerms.push("founders");
      updatedValues.push(found);
    }
    if (Bemail) {
      updatedTerms.push("email");
      updatedValues.push(Bemail);
    }
    if (employees) {
      updatedTerms.push("num_employees");
      updatedValues.push(employees);
    }
    if (yearC + monthC + dayC > 0) {
      const fullDate = year + '-' + month + "-" + day;
      updatedTerms.push("date_founded");
      updatedValues.push(fullDate);
    }
    if (indChange) {
        updatedTerms.push("industry")
        updatedValues.push(ind);
    }

    console.log(updatedTerms);

    if (updatedTerms.length === 0) {
        navigate(`/startup/${stID}`)
    }

    //creating the object to send
    let obj = {};

    for (var i = 0; i <updatedTerms.length; i++) {

        obj[updatedTerms[i]] = updatedValues[i];

    }

    console.log(obj);

    //Retrieving the token
    const token = JSON.parse(localStorage.getItem("token"));

    //Sending the object to the backend
    axios
    .put(`https://bloom-rest.herokuapp.com/startups/${stID}/details/`, obj, {
      headers: {
      Authorization: `Token ${token}`,
      }})
    .then(function (response) {
      //Not sure we need this here but how else would we call register?
      document.querySelector("label.information").innerHTML = "Edit Successful"
      navigate(`/startup/${stID}`);
    }).catch(error => {
      document.querySelector("label.information").innerHTML = "Edit Failed"
      console.log(error)})

  }

  //Function for updating state of input fields
  function update(e, setFunc, term) {
    const value = e.target.value;
    setFunc(value);
  }

  // This function creates a list of years for selection.
  function giveYears() {
    let years = [];

    for (let i = 1970; i < 2023; i++) {
      years.push(i.toString());
    }

    return years.map((year) => (
      <option key={year} label={year}>
        {year}
      </option>
    ));
  }

  //This function creates a list of days - currently bugged.
  function giveDays() {
    let years = [];

    for (let i = 1; i < 32; i++) {
      if (i < 10) {
        years.push("0" + i.toString());
      } else {
        years.push(i.toString());
      }
    }

    return years.map((year) => (
      <option key={year} label={year}>
        {year}
      </option>
    ));
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="pg-title">Edit Information About Your Business</h2>
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
                onChange={(e) => update(e, setName, "name")}
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
                onChange={(e) => update(e, setFound, "founders")}
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
              <select
                id="year"
                className="form-control"
                defaultValue={"2022"}
                onChange={(e) => {
                  update(e, setYear);
                  setYearC(1);
                }}
              >
                {giveYears()}
              </select>
            </div>
            <div className="col-lg-4">
              <label className="col-form-label">Month</label>
              <select id="month" className="form-control" defaultValue={"01"} onChange={(e) => {
                  update(e, setMonth);
                  setMonthC(1);
              }}>
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
              <select id="day" className="form-control" defaultValue={"01"} onChange={(e) => {
                  update(e, setDay);
                  setDayC(1);
              }}>
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
                onChange={(e) => update(e, setDesc, "description")}
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
                onChange={(e) => update(e, setEmail, "email")}
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
                onChange={(e) => update(e, setEmployees, "employees")}
              />
            </div>
          </div>

          <div className="form-group row field">
            <div className="col-sm-10">
              <label className="ind"></label>
              <label htmlFor="indus" className="col-form-label">
                Industry
              </label>
              <select id="indus" className="form-control" defaultValue={"OT"} onChange={(e) => {
                  update(e, setIndustry);
                  setChange(true);
              }}>
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
                onClick={(e) => edit(e)}
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
