import './newPost.css';
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
    /*axios.interceptors.request.use(
      config => {
        config.headers.authorization = `JWT ${Access}`;
        return config;
      },
      error => {
        return Promise.reject(error); 
      }
    )*/
    const formdata = new FormData()
    formdata.append('image', image)
    formdata.append('parent', parent)
    const post = img + pk + '/postImage/'
    for (const value of formdata.values()) {
      console.log(value);
    
    }
    
 
  axios({
    method: "post",
    url: post,
    data: formdata,
    headers: { "Content-Type": "multipart/form-data", Authorization: `JWT ${Access}` },
  })
  
    .then((res)=>{
      console.log(res)
  })
};


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
      
     <body className="newpostBody">
       <div class="grid-container">
         <div class="grid-item">
           <h1><b>ZarCode</b></h1>
         </div>
    
       </div>
       
        
       <div className="newpostPage">
         <form  class="newpost" onSubmit={e => e.preventDefault()}>
            <h1 className="heading"> Create new post</h1>
            <div class="whole">
            <div className="postTitle_field">
                
                <input type="text" onChange={(e)=>setTitle(e.target.value)} required/>
                <span></span>
                <label>Enter Title</label>
                
                
            </div>
            
            <div className="posttext_field">
                
                <input type="text" onChange={(e)=>setText(e.target.value)} required/>
                <span></span>
                <label>Enter Text</label>
            </div>
              {/*<div>
                <label for="author"><b>Author: </b></label>
                <input type="text" placeholder="Enter Author" name="author" onChange={(e)=>setAuthor(e.target.value)} />
              </div> */}

              {/*<div>
                <label for="date"><b>Date </b></label>
                <input type="datetime-local" name="date" onChange={(e)=>setDate(e.target.value)} />
              </div> */}

            
            <div class="spt">
            <div class="postimage_field">
            <label class="image_label" for="image"><b>Image </b></label>
                <input class="image_input" type="file" name="image" accept = "image/*" onChange={handleImage} required/>
                
            </div> 
            <div class="postCategory_field">
            <label class="category_label" for="category"><b>Category </b></label>
              <select name="category" onChange={(e)=>setCategory(e.target.value)}>
                <option value="qus"  >questions</option>
                <option value="ent"  >entertainment</option>
                <option value="exp"  >experiences</option>
              </select>
            </div>
            
            </div>
            </div>
            <div class="btn">
            <button className="imageButton" onClick = {imagehandle}><b>Upload Image</b></button>
            <button className="postButton" onClick = {post}><b>Post</b></button>
            </div>
            </form> 
      </div>
       </body>
      
           
        
      
    );
  }
  
  export default NewPost;