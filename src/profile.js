import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [works_at, setWork] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState();
  const [id, setId] = useState();
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

    //                                                                        Getting Current Username and ID
    axios
      .get(
        "http://127.0.0.1:8000/auth/users/me/"
    )
      .then((response) => {
          setUsername(response.data.username)
          setId(response.data.id)
        })
      .catch((error) => setIsError(error.message));
      console.log(id)
      axios
      .get("http://127.0.0.1:8000/api/user/profile/" + id + "/")
      .then((res) => {
        setName(res.data.name)
        setWork(res.data.works_at)
        setGender(res.data.gender)
        setAvatar(res.data.avatar)
      }) 
      
  }, []);
   
    function logout(){
        window.localStorage.removeItem("accessToken");
        navigate('/')
    }
    return (
      <div className="ProfilePage">
        <h1> profile page</h1>
        Haven't Created Your Profile? -
        <Link to = '/profile/edit'>Create Profile</Link>
        <div className="profile">
          <p>Username: {username}</p>
          <p>Name: {name}</p>
          <p>Works At: {works_at}  </p>
          <p>Gender: {gender}  </p>
          <img src = {avatar} />
        </div>
        <br></br>
        <button onClick = {logout} >Log Out</button>
        {isError == "Request failed with status code 401" && <h2>Please Login or Refresh If Already Logged In</h2>}
  
        
      </div>
           
        
      
    );
  }
  
  export default Profile;