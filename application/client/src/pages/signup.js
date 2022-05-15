/*****************************************************
 * Purpose: Allows the user to create an account on the
 * GatorXchange website by filling out the registration
 * form. The users enter sfsu id, SFSU email along with
 * username and password and so they are verified to
 * create and use the website, hence ensuring safety for SFSU
 * staff, students and faculty.
 * Error Messages: None
 * Author: Drashti Shah, Wilfredo Aceytuno
 *****************************************************/
import React from "react";
import { useState } from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [sfsu_id, setID] = useState();
  const [setcheckboxvalue] = useState(false);

  // Prevents form from being submitted if form is not valid
  (function () {
    var forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  // Event handler for submitting the registeration information to send to backend
  const handleSubmit = (e) => {
    // Don't refresh the page upon submitting search queries
    e.preventDefault();
    // Prevents form from being submitted if form is not valid

    // Create registration parameters that will be used for SQL queries into the database
    const userData = {
      username: username,
      email: email,
      password: password,
      sfsu_id: sfsu_id,
    };
    // Send a POST request to the server
    axios
      .post("/register", userData)
      .then((res) => {
        // If status is OK, redirect user to the search results page
        if (res.status === 200) {
          // For checking data is correct in inspector
          console.log("Data submitted is:");
          console.log(userData);
          console.log("Username input is: " + userData.username);
          console.log("Email input is " + userData.email);
          console.log("Password input is " + userData.password);
          console.log("SFSU ID input is " + userData.id);

          // Redirect to the login page after successfully creating an account
          window.location = "/login";
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log("Server status is: " + err.response.status);
        } else if (err.request) {
          console.log(err.request);
          console.log("Network error or server is offline");
        }
        console.log("Registration failed :(");
        console.log(err);
      });
  };

   const check = function() {

    if (document.getElementById('validPassword').value === document.getElementById('validConfirmPassword').value) {
      document.getElementById('confirmMessage').innerHTML = '';
    } 
    else {
      document.getElementById('confirmMessage').style.color = 'red';
      document.getElementById('confirmMessage').innerHTML = 'Password is not matching';
    } 
  }
  return (
  <div className="containerRegistration" >
    <form
      /* on submitting this form it will be sent to the database and the account will be 
  created successfully if the fields are filled correctly */
      class="row row-cols-lg-auto g-3 align-items-center needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="container">
        <div className="field">
          <h1>Sign Up</h1>
          <div class="col-12">
            <Form.Label
              className="formLabel"
              class="form-label is-valid"
              for="validName"
            >
              Username*
            </Form.Label>
            <input
              class="form-control needs-validation"
              id="validName"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}  /** setting the username by using the event handler e */
            />
          </div>
          <div class="col-12">
            <Form.Label className="formLabel" class="form-label" for="validID">
              SFSU ID*
            </Form.Label>
            <input
              class="form-control"
              id="validID"
              required
              pattern="\d{8}[0-9]"
              placeholder="*********"
              value={sfsu_id}
              onChange={(e) => setID(e.target.value)} /** setting the SFSU ID by using the event handler e */
            />
            <div class="invalid-feedback">Enter a valid SFSU ID(9 digits)</div>
          </div>
          <div class="col-12">
            <Form.Label
              className="formLabel"
              class="form-label"
              for="validEmail"
            >
              SFSU Email*
            </Form.Label>
            <input
              class="form-control"
              id="validEmail"
              type="email"
              placeholder="@sfsu.edu"
              required
              pattern=".+@sfsu\.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)} /** setting the email by using the event handler e */
            />
            <div class="invalid-feedback">Enter a SFSU email</div>
          </div>
          <div class="col-12">
            <Form.Label class="form-label" for="validPassword">
              Password*
            </Form.Label>
            <input
              class="form-control"
              id="validPassword"
              type="password"
              placeholder="Password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              value={password}
              onChange={(e) => {setPassword(e.target.value); check()}} /** setting the password by using the event handler e */
            />         
            <div class="invalid-feedback">
             <div class="requiredPassword">Must contain: <br/>
                one number <br/>
                one uppercase <br/>
                one lowercase <br/>
                8 characters or more <br/>
             </div> 
            </div>
          </div>
          <div class="col-12">
            <Form.Label
              className="formLabel"
              class="form-label"
              for="validConfirmPassword"
            >
              Confirm Password*
            </Form.Label>
            <input
              class="form-control"
              id="validConfirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => {setConfPassword(e.target.value); check()}} /** confirming the password by using the event handler e */           
            />
            <span class="passwordErrorMessage"id='confirmMessage'></span>
            <div class="invalid-feedback">Password is required</div>
          </div>

          {/* Ensuring the checkbox is checked while filling the forms, 
              thereby users agree to the terms and conditions of the website */}

          <div className="checkbox" for="validCheck">
            <input
              class="signup-check"
              id="validCheck"
              type="checkbox"
              required
              onChange={(e) => setcheckboxvalue(e.target.value)} /** setting the checkbox value by using the event handler e */
            />

            <label id="TnC">
              I Agree with the
              <Link to="/"> Terms and Conditions </Link>
            </label>
            <div class="invalid-feedback">
              Please accept terms and conditions before register
            </div>
          </div>

          <button className="registerButton" type="submit">
            Signup
          </button>
          <Link className ="cancel-link"to ="/" >Cancel</Link>
          <div className="hasAccount">
            <p> 
              Already have an Account?
              <Link to="/Login"> Login</Link>  {/** having a link directing to login if they already have an accounrt */}
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
  );
};

export default Signup;
