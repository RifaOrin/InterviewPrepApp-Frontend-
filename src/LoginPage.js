import {useEffect, useState} from "react";
import axios from 'axios';
const Url = "http://127.0.0.1:8000/login/"
function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState("");

    const logindata = (e) =>{
        e.preventDefault();
        axios
        .post(Url, {
            username,
            password
        })
        .then((response)=>console.log("posting data", response))
        .catch((error) => setIsError(error.message));

    }
    return (
        <div className="LoginPage">
            <h1> login page</h1>
            <div>
                <label for="username"><b>Username: </b></label>
                <input type="text" placeholder="Enter Username" name="username" onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            
            <div>
                <label for="password"><b>Password: </b></label>
                <input type="password" placeholder="Enter Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
            </div> 
            
            <button onClick = {logindata}>Login</button>
        
        </div>
        
      
    );
  }
  
  export default LoginPage;