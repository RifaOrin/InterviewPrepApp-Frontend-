import {useEffect, useState} from "react";
import axios from 'axios';
const Url = "http://127.0.0.1:8000/newpost/?"
function NewPost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [isError, setIsError] = useState("");

  const post = (e) =>
  {
    e.preventDefault();
    axios
    .post(Url,{
        title,
        text, 
        author
    })
    .then(res => console.log("creating new post", res))
    .catch((error) => setIsError(error.message));
  }

    return (
     <div className="NewPost">
        <h1> new post</h1>
        <div>
                <label for="title"><b>Post Title: </b></label>
                <input type="text" placeholder="Enter Title" name="title" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            
            <div>
                <label for="text"><b>Post Body: </b></label>
                <input type="text" placeholder="Enter Text" name="text" onChange={(e)=>setText(e.target.value)} />
            </div> 
            <div>
                <label for="author"><b>Author: </b></label>
                <input type="text" placeholder="Enter Author" name="author" onChange={(e)=>setAuthor(e.target.value)} />
            </div> 
            
            <button onClick = {post}>Post</button>
      </div>
           
        
      
    );
  }
  
  export default NewPost;