import {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
function People(){
    const{profile_id} = useParams()
    const [name, setName] = useState("");
    const [works_at, setWork] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState();

    const base = "http://127.0.0.1:8000/api/user/profile/"
    useEffect(()=>{
        axios
        .get(base + profile_id + "/")
        .then((res)=>{
            console.log(res.data)
            setName(res.data.name)
            setWork(res.data.works_at)
            setGender(res.data.gender)
            setAvatar(res.data.avatar)
        })
    },[])
    return(
        <div className="profile">
        <h1> profile page</h1>
          <p>Name: {name}</p>
          <p>Works At: {works_at}  </p>
          <p>Gender: {gender}  </p>
          <img src = {avatar} />
        </div>
       
    )
} 
export default People;