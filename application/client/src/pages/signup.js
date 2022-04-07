import React from 'react';
import { useState } from 'react';
import "../css/registration.css";
import { Link } from 'react-router-dom';



const Signup = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [val, setVal] = useState();

    

    return (
        <div className="container">
            <div className="card">
                <h1>Sign Up</h1>

                <div id="float-label">
                    <input type="firstName" required
                        value={firstName}
                        onChange={e => setfirstName(e.target.value)}/>
                    <label htmlFor="firstName">First Name*</label>
                </div>
                <div id="float-label">
                    <input type="lastname" required 
                        class="text-input"
                        value={lastName}
                        onChange={e => setlastName(e.target.value)}/>
                    <label htmlFor="lastname">Last Name*</label>
                </div>
                <div id="float-label">
                    <input value="sfsuID"
                        pattern="[0-9]*"
                        value={val}
                        onChange={(e) =>
                        setVal((v) => (e.target.validity.valid ? e.target.value : v))}/>
                    <label htmlFor="sfsuID">SFSU ID*</label>
                </div>
                <div id="float-label">
                    <input type="email" required
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="email">Email*</label>
                </div>
                <div id="float-label">
                    <input type="password" required
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="password">Password*</label>
                </div>

                <div className="checkbox">          
                    <input type="checkbox" id="TnC" checked={false}/>
                    <label id="TnC"> I Agree with the    
                        <Link to="#"> Terms and Condition </Link>
                    </label>
                </div>
                    

                    <button className="registerButton">Signup</button>
                    <div>
                        <p>Already have an Account?
                            <Link to="/Login">Login</Link></p>
                    </div>
                
            </div>
        </div>
    );
};

export default Signup;