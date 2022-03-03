import React from 'react';
import { useState } from 'react';


const SignUp = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
		<div className="container">
        <div className="card">
        <div className="card-info">
            <h1 class="form-title">Sign Up</h1>
            <div>
                <label>First Name: </label>
                <input  input type="fname" required name="fname" placeholder="First Name" class="text-input"
                value = {firstName} 
                onChange = {e => setfirstName(e.target.value)}
                />
            </div>
            <div>
                <label>Last Name: </label>
                <input  input type="lname" required name="lname" placeholder="Last Name" class="text-input"
                value = {lastName} 
                onChange = {e => setlastName(e.target.value)}
                />
            </div>
            <div>
                <label >Email: </label>
                <input  input type="email" required name="email" placeholder="email" class="email"
                value = {email} 
                onChange = {e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password: </label>
                <input input type="password" required name="password" placeholder="Password" class="text-input"
            
                value= {password}
                onChange = {e => setPassword(e.target.value)}
                />
            </div>
			<button>Submit</button>
            <div>
                <p>Already have an Account?
					<a href="/Login">    Login</a></p>
            </div>
        </div>
        </div>
		</div>
    );
};

export default SignUp;