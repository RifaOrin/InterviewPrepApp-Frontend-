import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Url = "http://127.0.0.1:8000/api/user/profile/"
const user = "http://127.0.0.1:8000/auth/users/me/"
function CreateProfile(){
    const[name, setName] = useState("");
    const[work, setWork] = useState("");
    const [author, setAuthor] = useState("");
    const[gender, setGender] = useState("");
    const[lives, setLives] = useState("");
    const [isError, setIsError] = useState("");
    const[profileImage, setProfileImage] = useState("");
    const[coverPhoto, setCoverPhoto] = useState("");
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

    const handleProfileImage = (e) => {
      console.log(e.target.files)
      setProfileImage(e.target.files[0])
    }
    const handleCoverPhoto = (e) => {
      console.log(e.target.files)
      setCoverPhoto(e.target.files[0])
    }
    const create = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('parent', author)
        formdata.append('name', name)
        formdata.append('works_at', work)
        formdata.append('gender', gender)
        formdata.append('lives', lives)
        formdata.append('avatar', profileImage)
        formdata.append('coverPhoto', coverPhoto)
        axios({
            method : "post",
            url : Url,
            data : formdata,
            headers: { "Content-Type": "multipart/form-data", Authorization: `JWT ${Access}`},
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
            <label>Lives in:</label>
            <input type="text" onChange={(e)=>setLives(e.target.value)} required/>
            <label>Gender:</label>
            <select name="gender" onChange={(e)=>setGender(e.target.value)}>
              <option value="Male" selected>Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label ><b>Profile Picture: </b></label>
                <input type="file" name="image" accept = "image/*" onChange={handleProfileImage}/>
            <label ><b>Cover Photo: </b></label>
                <input type="file" name="image" accept = "image/*" onChange={handleCoverPhoto}/>
            <button onClick={create}>Create Profile</button>
        </div>
    );
}
export default CreateProfile;