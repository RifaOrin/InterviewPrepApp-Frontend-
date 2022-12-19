import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
function Navbar(){
    const [username, setUsername] = useState("");
    const [isError, setIsError] = useState("");
    const navigate = useNavigate();
    const Access = localStorage.accessToken
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
              console.log(response.data)
              setUsername(response.data.username)
          })
          .catch((error) => setIsError(error.message)); 
      }, []);

      function logout(){
        window.localStorage.removeItem("accessToken");
        navigate('/')
    }

    return(

        <>
        <Link to = "/">Home</Link>
        <Link to = "about">About</Link>
        <Link to = "/post">Post</Link>
        <Link to="/post/filter/category=entertainment">Entertainment</Link>
        <Link to="/post/filter/category=questions">Questions</Link>
        <Link to="/post/filter/category=experiences">Experiences</Link>
        <Link to="/post/filter/ordering=date">Date - Ascending</Link>
        <Link to="/post/filter/ordering=-date">Date - Descending</Link>
        <Link to="/post/filter/ordering=bump">Bump - Ascending</Link>
        <Link to="/post/filter/ordering=-bump">Bump - Descending</Link>
        <Link to="/profile">{username}</Link>
        <button onClick = {logout} >Log Out</button>
        </>
    )
}
export default Navbar;