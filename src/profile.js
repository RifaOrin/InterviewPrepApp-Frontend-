import {useEffect, useState} from "react";
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/profile/"
function Profile() {
  const [profileData, setProfileData] = useState([]);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
          setProfileData(response.data)
        })
      .catch((error) => setIsError(error.message));
  }, []);
    return (
      <div className="ProfilePage">
        <h1> profile page</h1>
        {isError !== "" && <h2>{isError}</h2>}
        {profileData.map((user) => {
            const {identification} = user;
            return(
                <div className="profile">
                    <h2>{identification}</h2>
                    
                </div>
            )
        
        })}
      </div>
           
        
      
    );
  }
  
  export default Profile;