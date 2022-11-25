import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Url = "http://127.0.0.1:8000/auth/users/"

function SignUp(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState("");

    const signin = (e) =>{
        e.preventDefault();
        
        axios
        .post(Url, {
            email,
            username,
            password
        })
        .then((response) => {   
            console.log(response.data)
            
        
        })
        .catch((error) => setIsError(error.message));
        navigate('/login')

    }
    return(
        <div className="singupPage">
            <h1>Sign up</h1>
            <div>
                <label for="username"><b>Username: </b></label>
                <input type="text" placeholder="Enter Username" name="username" onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            
            <div>
                <label for="password"><b>Password: </b></label>
                <input type="password" placeholder="Enter Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
            </div> 

            <div>
                <label for="Email"><b>Email Address: </b></label>
                <input type="email" placeholder="Enter Email Address" name="Email" onChange={(e)=>setEmail(e.target.value)} />
            </div> 
            
            <button onClick = {signin}>Sign Up</button>
        </div>
    )
}
export default SignUp;