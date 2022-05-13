/**
 * The login file 
 */




import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/registration.css";
import { Form } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");


   // Event handler for submitting the registeration information to send to backend
  const handleSubmit = (e) => {
    // Don't refresh the page upon submitting search queries
    e.preventDefault();
// Prevents form from being submitted if form is not valid

// Create search parameters that will be used for SQL queries into the database
const LoginData = {
  email: email,
  password: password,
};
// Send a POST request to the server
axios.
post("/login", LoginData)
  .then((res) => {
    // If status is OK, redirect user to the search results page
    if (res.status === 200) {
      // For checking data is correct in inspector
      console.log("Data submitted is:");
      console.log(LoginData);
      console.log("Email input is " + LoginData.email);
      console.log("Password input is " + LoginData.password);



      // Redirect to the home results page which renders the search results component
      window.location = "/";
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

  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="container">
      <div className="field">
        <h1>Login</h1>

        <div class="col-12">
          <Form.Label className="formLabel" class="form-label">Email</Form.Label>
          <input
            class="form-control" 
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label htmlFor="firstName">First Name*</label> */}
        </div>

        <div class="col-12">
          <Form.Label className="formLabel" class="form-label">Password</Form.Label>
          <input
            class="form-control" 
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <label htmlFor="firstName">First Name*</label> */}
        </div>

          <button className="registerButton" type = "submit">
            Login
          </button>
          <Link to="Forgotpassword">Forgot Password</Link>
          <p>
            Don't have an Account? <Link to="/Signup">Register</Link>
          </p>
      </div>
    </div>
    </form>
  );
};


export default Login;
