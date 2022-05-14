import React from "react";
import { useState } from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState("");
  //const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [sfsu_id, setID] = useState();
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
        
        form.addEventListener('click', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })();

  // Event handler for submitting the registeration information to send to backend
  const handleSubmit = (e) => {
    // Don't refresh the page upon submitting search queries
    e.preventDefault();
// Prevents form from being submitted if form is not valid

// Create search parameters that will be used for SQL queries into the database
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


      // Redirect to the search results page which renders the search results component
      window.location = "/login";
      // navigate('/search', {replace: true});
      // <Routes>
      // <Route path="/search" element={<SearchResults/>} />
      // </Routes>
      // <Navigate to="/search" replace={true} />
      //setSearchSubmitted(true);
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

// Reset the search term, category, and search submitted state values after submission
// setSearchTerm('');
// setCategory('');
// setSearchSubmitted(false);
};
  return (
  <form class="row row-cols-lg-auto g-3 align-items-center needs-validation" onSubmit={handleSubmit} noValidate>
    {/* <Form onSubmit={handleSubmit}> */}
    <div className="container" >
      <div className="field">
        <h1>Sign Up</h1>
        <div class="col-12">
          <Form.Label className="formLabel" class="form-label is-valid" for = "validName">Username*</Form.Label>
          <input
            class="form-control needs-validation" 
            id= "validName"
            type="text"
            placeholder="Username"
            //onFocus={(e) => (e.target.placeholder = "")}
           //onBlur={(e) => (e.target.placeholder = "First Name")}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <label htmlFor="firstName">First Name*</label> */}
        </div>
        <div class="col-12">
          <Form.Label className="formLabel" class="form-label" for = "validID">SFSU ID*</Form.Label>
          <input
            class="form-control"
            id="validID"
           // placeholder="SFSU ID*"
            //onFocus={(e) => (e.target.placeholder = "")}
            required
            pattern="\d{8}[0-9]"
            placeholder="*********"
            value={sfsu_id}
            onChange={(e) =>
              //setVal((v) => (e.target.validity.valid ? e.target.value : v))
              setID(e.target.value)
            }
          />
          <div class="invalid-feedback">
            Enter a valid SFSU ID(9 digits).
          </div>
          {/* <label htmlFor="sfsuID">SFSU ID*</label> */}
        </div>
        <div class="col-12">
          <Form.Label className="formLabel" class="form-label" for = "validEmail">SFSU Email*</Form.Label>
          <input
            class="form-control"
            id="validEmail"
            type="email"
            placeholder="@sfsu.edu"
          //onFocus={(e) => (e.target.placeholder = "")}
            //onBlur={(e) => (e.target.placeholder = "xyz@sfsu.edu")}
            required
            pattern=".+@sfsu\.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div class="invalid-feedback">
            Enter a SFSU email.
          </div>  
        </div>
        <div class="col-12">
          <Form.Label class="form-label" for ="validPassword">Password*</Form.Label>
          <input
            class="form-control"
            id= "validPassword"
            type="password"
            placeholder="Password"
            //onFocus={(e) => (e.target.placeholder = "")}
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
          <Form.Label className="formLabel" class="form-label" for = "validConfirmPassword">Confirm Password*</Form.Label>
          <input
            class="form-control"
            id="validConfirmPassword"
            type="confirmPassword"
            placeholder="Confirm Password"
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
          
          <label id="TnC">
            {" "}
            I Agree with the
            <Link to="/"> Terms and Conditions </Link>
          </label>
          <div class="invalid-feedback">
            Please accept terms and conditions to register*
          </div>
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
      {/* </Form> */}
    </form>
    
  );
};

export default Signup;