import React, {useState, useEffect} from 'react'
import Axios from "axios" 


const Login = () => {

    const [userName, setUsername] = useState("") 
    const [passWord, setPassword] = useState("")
    const [login, setLogin] = useState("") 

    const login_function = () => {
        Axios.post("http://localhost:3001/register", 
        {
            userName: userName, 
            passWord: passWord
        }
        ).then((res) => {
            setLogin(res.data) 
        }).catch((err) => {
            console.log("error")
        })
    }
    

    
    return (
        <div>
            <label>Login:</label>
            <label>Username:</label>
            {/*event listener to parse binary code to set user values.*/}
            <input type="text" onChange={(e) => setUsername(e.target.value)}/> 
            <label>Password:</label>
            {/*event listener to parse binary code to set user values.*/}
            <input type= "text" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={login_function}>Submit</button>
        </div>
    )
}

export default Login
