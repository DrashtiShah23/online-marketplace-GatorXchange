import React from "react";
import { useState } from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const Signup = () => {
  const [Name, setName] = useState("");
  //const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [id, setID] = useState();
  const [setcheckboxvalue] = useState(false);

// Prevents form from being submitted if form is not valid
  (function () {
    'use strict'
      var forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } 
          form.classList.add('was-validated')
        }, false)
      })
  })();
  return (
  <form class="row row-cols-lg-auto g-3 align-items-center was-validated" noValidate>
    <div className="container" >
      <div className="field">
        <h1>Sign Up</h1>
        <div class="col-12">
          <Form.Label className="formLabel" class="form-label" for = "validName">Name</Form.Label>
          <input
            class="form-control" 
            id= "validName"
            type="text"
            //placeholder="FirstName*"
            //onFocus={(e) => (e.target.placeholder = "")}
            //onBlur={(e) => (e.target.placeholder = "First Name")}
            required
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <label htmlFor="firstName">First Name*</label> */}
        </div>
        {/* <div id="signup-label">
          <Form.Label className="formLabel" class="form-label" for = "validLastName">Last Name</Form.Label>
          <input
            class="form-control"
            id="validLastName"
            type="text"
            //placeholder="LastName*"
            //onFocus={(e) => (e.target.placeholder = "")}
            //onBlur={(e) => (e.target.placeholder = "Last Name")}
            required
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          <div class="invalid-feedback">
            Enter a Last Name.
          </div>
          {/* <label htmlFor="lastname">Last Name*</label> 
        </div> */}
        <div class="col-12">
          <Form.Label className="formLabel" class="form-label" for = "validID">SFSU ID</Form.Label>
          <input
            class="form-control"
            id="validID"
           // placeholder="SFSU ID*"
            //onFocus={(e) => (e.target.placeholder = "")}
            required
            pattern="().{9,}"
            value={id}
            onChange={(e) =>
              //setVal((v) => (e.target.validity.valid ? e.target.value : v))
              setID(e.target.value)
            }
          />
          <div class="invalid-feedback">
            Enter a valid SFSU ID.
          </div>
          {/* <label htmlFor="sfsuID">SFSU ID*</label> */}
        </div>
        <div class="col-12">
          <Form.Label className="formLabel" class="form-label" for = "validEmail">Email</Form.Label>
          <input
            class="form-control"
            id="validEmail"
            type="email"
           // placeholder="Email*"
          //onFocus={(e) => (e.target.placeholder = "")}
            //onBlur={(e) => (e.target.placeholder = "xyz@sfsu.edu")}
            required
            pattern=".+@sfsu\.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div class="invalid-feedback">
            Enter a SFSU email.
          </div>  
        </div>
        <div class="col-12">
          <Form.Label class="form-label" for ="validPassword">Password</Form.Label>
          <input
            class="form-control"
            id= "validPassword"
            type="password"
           // placeholder="Password*"
            onFocus={(e) => (e.target.placeholder = "")}
            //onBlur={(e) => (e.target.placeholder = "Atleast 3 characters required!")}
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div class="invalid-feedback">
          "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          </div>
      </div>
        <div class="col-12">
          <Form.Label className="formLabel" class="form-label" for = "validConfirmPassword">Confirm Password</Form.Label>
          <input
            class="form-control"
            id="validConfirmPassword"
            type="confirmPassword"
            placeholder="Confirm Password*"
            //onFocus={(e) => (e.target.placeholder = "")}
            //onBlur={(e) => (e.target.placeholder = "Confirm Password required!")}
            required
            value={confirmPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <div class="invalid-feedback">
            Passwords must match
          </div>
      </div>

        <div className="checkbox" for = "validCheck">
          <input
            id="validCheck"
            type="checkbox"
            required
            onChange={(e) => setcheckboxvalue(e.target.value)}
          />
          <div class="invalid-feedback">
            Please accept terms and conditions to register
          </div>
          <label id="TnC">
            {" "}
            I Agree with the
            <Link to="/"> Terms and Conditions </Link>
          </label>
        </div>

        <button className="registerButton" >Signup</button>
        <div>
          <p>
            Already have an Account?
            <Link to="/Login">Login</Link>
          </p>
        </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
