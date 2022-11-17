import {useEffect, useState} from "react";
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/post/"
function Post() {
    const [apiUrl, setApiUrl] = useState(baseUrl);
    const [myPost, setPostData] = useState([]);
    const [isError, setIsError] = useState("");
    useEffect(() => {
        axios
          .get(apiUrl)
          .then((response) => setPostData(response.data.results))
          .catch((error) => setIsError(error.message));
      }, []);
     
    return (
        <div className="Post">
        <h1> post page</h1>
        
        {isError !== "" && <h2>{isError}</h2>}
        {myPost.map((feed) => {
            const {title, text, date, author} = feed;
            return(
                <div className="Feed">
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
            )
        
        })}
        </div>
        
      
    );
  }
  
  export default Post;