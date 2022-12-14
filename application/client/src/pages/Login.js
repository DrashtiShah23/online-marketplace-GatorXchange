/**************************************************************
 * Purpose: Allows the user to login to the user account on the
 * GatorXchange website by entering their sfsu email and 
 * password. It also gives a link to register at bottom if guest
 * users have not created an account
 * Error Messages: None
 * Author: Mary Tangog, Drashti Shah
 *************************************************************/

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import { Form } from "react-bootstrap";
import axios from "axios";
import { LoginContextProvider } from "../LoginContext";
import { UserContextProvider } from "../UserContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const {user, setUser} = useContext(UserContextProvider)
  // const {loginState, setLoginState} = useContext(LoginContextProvider);

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //     console.log(foundUser.user_id)
  //   }
  //   console.log(loggedInUser)
    
  // }, []);

  // logout the user
  // const handleLogout = () => {
  //   setUser({});
  //   setEmail("");
  //   setPassword("");
  //   //localStorage.clear();
  //   setLoginState(false);
  // };

  // Event handler for submitting the login information to send to backend
  const handleSubmit = (e) => {
    // Don't refresh the page upon submitting login queries
    e.preventDefault();
    // Prevents form from being submitted if form is not valid

    // Create login parameters that will be used for SQL queries into the database
    const LoginData = {
      email: email,
      password: password,
    };
    // Send a POST request to the server
    axios
      .post("/login", LoginData)
      .then((res) => {
        // If status is OK, redirect user to the home page
        if (res.status === 200) {
          // For checking data is correct in inspector
          console.log("Data submitted is:");
          console.log(LoginData);
          console.log("Email input is " + LoginData.email);
          console.log("Password input is " + LoginData.password);
          
          // Set global login state to true
          // setLoginState(true);
          // console.log(res.data);
          // setUser(res.data);
          //localStorage.setItem("user", JSON.stringify(res.data))
          alert('Login successful!');
          // Redirect to the home results page 
          window.location = "/";
     
        }
      })
      /**If error is caught, it will display error messages on console */
      .catch((err) => {
        if (err.response) {
          console.log("Server status is: " + err.response.status);
        } else if (err.request) {
          console.log(err.request);
          console.log("Network error or server is offline");
        }
        console.log("Login failed :(");
        console.log(err);
      });
  };

  // if (user) {
  //   return (
  //     <div>
  //       <p>{user.username} logged in!</p>
  //       <p>User ID is: {user.user_id}</p>
  //       <button onClick={handleLogout}>logout</button>
  //     </div>
  //   )
  // }

//  if (loginState) {
//    return (
//      <div>
//        <p>{user.username} logged in</p>
//        <p>User ID is: {user.user_id}</p>
//        <button onClick={handleLogout}>logout</button>
//      </div>
//    )
//  }
  


  return (
    <form onSubmit={handleSubmit}>
      <div className="container-login">
        <div className="field-login">
          <h1 className="h1-login">Login</h1>

          <div className="col-12-login">
            <Form.Label className="formLabel-login form-label-email">
              Email
            </Form.Label>
            <input
              className="form-control-login"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} /** setting the email by using the event handler e */
            />
        
          </div>

          <div className="col-12-login">
            <Form.Label className="formLabel-login form-label-password">
              Password
            </Form.Label>
            <input
              className="form-control-login"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} /** setting the password by using the event handler e */
            />
      
          </div>

          <button className="Login-Button" type="submit">
            Login
          </button>
          <Link to="Forgotpassword">Forgot Password</Link>
          <p className="login">
            {/** having a link directing to signup if they haven't already created  accounrt */}
            Don't have an Account? <Link to="/Signup">Register here!</Link> 
          </p>
          <div></div>
        </div>
      </div>
    </form>  
  );
};

export default Login;
