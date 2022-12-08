import './signUp.css';

import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
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
        <body className="signupbody">
        <div className="singupPage">
            
            <form  class="signup">
            <h1 className="title">Create account</h1>
            <h2>Already have an account? <span><Link to = '/login'>Log in</Link></span></h2>

               <div class="signup__field">
                    <input class="signup__input" type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} required />
                    <label class="signup__label" for="username">Username</label>
              </div>

             <div class="signup__field">
                    <input class="signup__input" type="text" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} required />
                    <label class="signup__label" for="email">Email</label>
            </div>

            <div class="signup__field">
                   <input class="signup__input" type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}required />
                   <label class="signup__label" for="password">Password</label>
           </div>
           


            
                
            
            
            <button className="Register" onClick={signin}>Sign Up</button>
            

            </form> 
            
            
            
        
        </div>
        </body>
    );
}
export default SignUp;