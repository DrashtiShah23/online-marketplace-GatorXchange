import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../css/registration.css";
import { Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const login_function = () => {
    Axios.post("http://localhost:3001/register", {
      email: email,
      password: password,
    })
      .then((res) => {
        setLogin(res.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  return (
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



          <button className="registerButton" onClick={login_function}>
            Login
          </button>
          <Link to="Forgotpassword">Forgot Password</Link>
          <p>
            Don't have an Account? <Link to="/Signup">Register</Link>
          </p>
      </div>
    </div>
  );
};

export default Login;
