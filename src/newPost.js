import {useEffect, useState} from "react";
import axios from 'axios';
const Url = "http://127.0.0.1:8000/api/post/newpost/"
const img = "http://127.0.0.1:8000/api/post/post/"
const user = "http://127.0.0.1:8000/auth/users/me/"

function NewPost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [isError, setIsError] = useState("");
  const [image, setImage] = useState("");
  const [pk, setPk] = useState();
  const [parent,setParent] = useState("");

  const Access = localStorage.accessToken

  //                                                         AUTHOR that is CURRENTLY LOGGED IN and about to POST (INTERCEPTOR AND .GET)

  useEffect(() => {
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
      //console.log(res.data.id)
    })
    //console.log(author)
  }, [])


  //                                                                           IMAGE HANDLING AND POSTING (.POST)

  const  handleImage = (e) => {
      console.log(e.target.files)
      setImage(e.target.files[0])
  }

  function imagehandle(){
    const formdata = new FormData()
    formdata.append('image', image)
    const post = img + pk + '/postImage/'
    for (const value of formdata.values()) {
      console.log(value);
    
    }
    const config = {
      headers: {
          //"Content-Type": "multipart/form-data",
          Authorization: `JWT ${Access}`,
      },
  };
  axios
    .post(post, {parent, image : formdata}, config)
    .then((res)=>{
      console.log(res)
    })
  }


  //                                                                             CREATING NEW POST (.POST)
  const post = (e) =>
  {
    e.preventDefault();
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
    .post(Url,{
        title,
        text, 
        author,
        category
    })
    .then(res => {
      setPk(res.data.pk)
      setParent(res.data.pk)
      
      
    })
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
            {/*<div>
                <label for="author"><b>Author: </b></label>
                <input type="text" placeholder="Enter Author" name="author" onChange={(e)=>setAuthor(e.target.value)} />
            </div> */}

            {/*<div>
                <label for="date"><b>Date </b></label>
                <input type="datetime-local" name="date" onChange={(e)=>setDate(e.target.value)} />
            </div> */}

            <div>
            <label for="category"><b>Category </b></label>
              <select name="category" onChange={(e)=>setCategory(e.target.value)}>
                <option value="qus"  >questions</option>
                <option value="ent"  >entertainment</option>
                <option value="exp"  >experiences</option>
              </select>
            </div>

            <div>
                <label for="image"><b>Image </b></label>
                <input type="file" name="image" accept = "image/*" onChange={handleImage} />
            </div> 
            
            <button onClick = {post}>Post</button>
            <button onClick = {imagehandle}>Upload Image</button>
      </div>
           
        
      
    );
  }
  
  export default NewPost;