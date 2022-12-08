import {useEffect, useState} from "react";
import axios from 'axios';
const Url = "http://127.0.0.1:8000/api/post/newpost/"
function NewPost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [isError, setIsError] = useState("");

  const post = (e) =>
  {
    e.preventDefault();
    axios
    .post(Url,{
        title,
        text, 
        author, 
        date,
        category
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

            <div>
                <label for="date"><b>Date </b></label>
                <input type="datetime-local" name="date" onChange={(e)=>setDate(e.target.value)} />
            </div> 

            <div>
            <label for="category"><b>Category </b></label>
              <select name="category" onChange={(e)=>setCategory(e.target.value)}>
                <option value="qus"  >questions</option>
                <option value="ent"  >entertainment</option>
                <option value="exp"  >experiences</option>
              </select>
            </div>
            
            <button onClick = {post}>Post</button>
      </div>
           
        
      
    );
  }
  
  export default NewPost;