import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Url = "http://127.0.0.1:8000/api/user/profile/"
const user = "http://127.0.0.1:8000/auth/users/me/"
function EditProfile(){
    const[name, setName] = useState("");
    const[work, setWork] = useState("");
    const [author, setAuthor] = useState("");
    const[gender, setGender] = useState("");
    const [isError, setIsError] = useState("");
    const Access = localStorage.accessToken
    const navigate = useNavigate();
    useEffect(() => {
        //                                                         AUTHOR that is CURRENTLY LOGGED IN and about to POST (INTERCEPTOR AND .GET)
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
          .get(user)
          .then((res) => {
            setAuthor(res.data.id)
           
          })
          
    }, [])
    const edit = (e) => {
        e.preventDefault();
        axios
        .post(Url, {
            parent_id : author,
            name,
            work,
            gender
            
        })
        .then((response) => {   
            console.log(response.data)
        
        })
        .catch((error) => setIsError(error.message));
        //navigate('/profile')
    }
    return(
        <div className = "EditProfile">
            <h1>Edit Profile</h1>
            <label>Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} required/>
            <label>Works at:</label>
            <input type="text" onChange={(e)=>setWork(e.target.value)} required/>
            <label>Gender:</label>
            <select name="gender" onChange={(e)=>setGender(e.target.value)}>
            <option value="m">Male</option>

            <option value="f">Female</option>

            <option value="o" selected>Other</option>
              </select>
            <button onClick={edit}>Create/Edit Profile</button>
        </div>
    );
}
export default EditProfile;