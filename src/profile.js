import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Profile() {
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");

  const Access = localStorage.accessToken

  const navigate = useNavigate();


  useEffect(() => {
    
    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `JWT ${Access}`;
        return config;
      },
      error => {
        return Promise.reject(error); 
      }
    )
    axios
      .get(
        "http://127.0.0.1:8000/auth/users/me/"
    )
      .then((response) => {
          setUsername(response.data.username)
        })
      .catch((error) => setIsError(error.message));
      
  }, []);
   
    function logout(){
        window.localStorage.removeItem("accessToken");
        navigate('/')
    }
    return (
      <div className="ProfilePage">
        <h1> profile page</h1>
        {username}
        <br></br>
        <button onClick = {logout} >Log Out</button>
        {isError == "Request failed with status code 401" && <h2>Please Login or Refresh If Already Logged In</h2>}
  
        
      </div>
           
        
      
    );
  }
  
  export default Profile;