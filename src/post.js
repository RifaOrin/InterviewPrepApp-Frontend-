import {useEffect, useState} from "react";
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/post/"
function Post() {
    const [myPost, setPostData] = useState([]);
    const [isError, setIsError] = useState("");
    const[nextUrl, setNextUrl] = useState();
    const[previousUrl, setPreviousUrl] = useState();
    useEffect(() => {
        axios
          .get(baseUrl)
          .then((response) => {
              setPostData(response.data.results)
              setNextUrl(response.data.next)
              setPreviousUrl(response.data.previous)
            })
          .catch((error) => setIsError(error.message));
      }, []);
    
    const PaginationHandler = (url) => {
        axios
          .get(url)
          .then((response) => {
            setPostData(response.data.results)
            setNextUrl(response.data.next)
            setPreviousUrl(response.data.previous)
          }) 
          .catch((error) => setIsError(error.message));
    }
    
    
     
    return (
        <div className="Post">
        <h1> post page</h1>
        
        {isError !== "" && <h2>{isError}</h2>}
        {myPost.map((feed) => {
            const {title, text, date, author} = feed;
            return(
                <div className="Feed">
                    <h2>{title}</h2>
                    <p>Posted on - {date}</p>
                    <p>Posted by - {author}</p>
                    <p>{text}</p>
                </div>
            )
        
        })}
        {previousUrl &&
        <button onClick={()=>PaginationHandler(previousUrl)}>Previous</button>}
        {nextUrl &&
        <button onClick={()=>PaginationHandler(nextUrl)}>Next</button>}
        </div>
        
      
    );
  }
  
  export default Post;