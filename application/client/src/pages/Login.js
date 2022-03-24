import React, { useState } from 'react'
import Axios from "axios"

const Login = () => {

    const [email, setEmail] = useState("")
    const [passWord, setPassword] = useState("")
    const [login, setLogin] = useState("")

    const login_function = () => {
        Axios.post("http://localhost:3001/register",
            {
                userName: email,
                passWord: passWord,
            }
        ).then((res) => {
            setLogin(res.data)
        }).catch((err) => {
            console.log("error")
        })
    }



    return (
        <div className="container">
            <div className="card">
                <label>Login</label>
                <label>Email:</label>
                {/*event listener to parse binary code to set user values.*/}
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                {/*event listener to parse binary code to set user values.*/}
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={login_function}>Submit</button>
                <p>Don't have an Account?<a href="/SignUp">Register</a></p>
            </div>
        </div>
    )
}

export default Login
