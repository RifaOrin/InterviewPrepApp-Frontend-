import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api/post/post/"
function PostDetailPage() {
    const {post_id} = useParams()
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [author, setAuthor] = useState("");
    const [bump, setBump] = useState("");
    const [isError, setIsError] = useState("");
    const [commentData, setComment] = useState([]);
    useEffect(() => {
        axios
          .get(baseUrl + post_id + '/')
          .then((response) => {
              console.log(baseUrl + post_id + '/')
              setText(response.data.text)
              setTitle(response.data.title)
              setDate(response.data.date)
              setAuthor(response.data.author)
              setBump(response.data.bump)
              
            })
          .catch((error) => setIsError(error.message));
      }, []);
      useEffect(() => {
        axios
          .get(baseUrl + post_id + '/comment/')
          .then((res) => {
              //console.log(res)
              setComment(res.data)
              
              
            })
          .catch((error) => setIsError(error.message));
      }, []);
      //console.log(baseUrl + post_id)
    return (
        
            
                <div className="PostDetailPage">
                <h1> details page</h1>
               
                {isError !== "" && <h2>{isError}</h2>}
                <h2>{title}</h2>
                <p>Posted on - {date}</p>
                <p>Posted by - {author}</p>
                <p>Liked by - {bump}  people</p>
                <p>{text}</p>
                <h2>Comments by -</h2>
                {commentData.map((comments) => {
                const {text} = comments;
                return(
                <div className="Comment">
                    
                    <p>{text}</p>
                </div>
            )
        
        })}
                </div>
           
        
      
    );
  }
  
  export default PostDetailPage;