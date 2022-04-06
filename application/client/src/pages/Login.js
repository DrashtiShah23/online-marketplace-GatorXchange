import React, { useState } from 'react'
import Axios from "axios"
import { Link } from 'react-router-dom';
import "../css/registration.css"

const Login = () => {

    const [email, setEmail] = useState("");
    const [passWord, setPassword] = useState("");
    const [login, setLogin] = useState("");

    const login_function = () => {
        Axios.post("http://localhost:3001/register",
            {
                userName: email,
                passWord: passWord,
            }
        ).then((res) => {
            setLogin(res.data);
        }).catch((err) => {
            console.log("error");
        });
    };



    return (
        <div className="container">
            <div className="card">
                <h1>Login</h1>

                <div id="float-label">
                    <input type="email" />

                    <label htmlFor="email">
                        E-mail
                    </label>
                </div>  
                <div id="float-label">
                    <input type="password" />

                    <label htmlFor="password">
                        Password
                    </label>

                </div>

                <button className="registerButton"
                    onClick={login_function}>
                        Login
                </button>
                <Link to="Forgotpassword">Forgot Password</Link>
                <p>Don't have an Account?<Link to="/Signup">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
