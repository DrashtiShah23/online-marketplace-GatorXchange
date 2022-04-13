import React from 'react';
import { useState } from 'react';
import "../css/registration.css";
import { Link } from 'react-router-dom';
 //import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { render } from 'react-dom';
import { colours } from 'nodemon/lib/config/defaults';



const Signup = () => {
  
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [val, setVal] = useState();
    const [check, setcheckboxvalue] = useState(false);
   
    

    return (
        <div className="container">
            <div className="card">
                <h1>Sign Up</h1>

                <div id="float-label">
                    <input type="text" placeholder= "FirstName*" 
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = "First Name required!" }
                    required
                        value={firstName}
                        onChange={e => setfirstName(e.target.value)}/>
                    {/* <label htmlFor="firstName">First Name*</label> */}
                </div>
                <div id="float-label">
                <input type="text" placeholder= "LastName*" 
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = "Last Name required!"}required 
                       
                        value={lastName}
                        onChange={e => setlastName(e.target.value)}/>
                    {/* <label htmlFor="lastname">Last Name*</label> */}
                </div>
                <div id="float-label">
                    <input value="sfsuID" placeholder= "SFSU ID*" 
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = "SFSU ID required!"}required 
                        pattern="[0-9]*"
                        value={val}
                        onChange={(e) =>
                        setVal((v) => (e.target.validity.valid ? e.target.value : v))}/>
                    {/* <label htmlFor="sfsuID">SFSU ID*</label> */}
                </div>
                <div id="float-label">
                    <input type="email" placeholder= "Email*" 
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = "Email required!"} required
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    {/* <label htmlFor="email">Email*</label> */}
                </div>
                <div id="float-label">
                    <input type="password" placeholder= "Password*" 
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = "Password required!"} required
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    {/* <label htmlFor="password">Password*</label> */}
                </div>

                <div className="checkbox">          
                    <input type="checkbox" required id="TnC" onChange={e => setcheckboxvalue(e.target.value)}/>
                    <label id="TnC"> I Agree with the    
                        <Link to="/"> Terms and Conditions </Link>
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