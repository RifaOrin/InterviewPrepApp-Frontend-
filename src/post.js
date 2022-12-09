import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
import NewPost from "./newPost";
 
const baseUrl = "http://127.0.0.1:8000/api/post/post/"
function Post() {
    const [myPost, setPostData] = useState([]);
    const [isError, setIsError] = useState("");
    const[nextUrl, setNextUrl] = useState();
    const[previousUrl, setPreviousUrl] = useState();
    const[postId, setPostId] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios
          .get(baseUrl)
          .then((response) => {
              console.log(response.data.results)
              setPostData(response.data.results)
              setPostId(response.data.results.pk)
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

    const questions = () => {
          navigate('/category/qus')
    }

    const entertainment = () => {
      navigate('/category/ent')
    }
    
    const experience = () => {
      navigate('/category/exp')
    }
     
    return (
        <div className="Post">
        <NewPost/>
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

        <button onClick={()=>experience()}>Experience</button>
        <button onClick={()=>questions()}>Questions</button>
        <button onClick={()=>entertainment()}>Entertainment</button>
        </div>
        
      
    );
  }
  
  export default Post;