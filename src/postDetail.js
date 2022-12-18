import './postDetails.css'
import { Link, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api/post/post/"
const user = "http://127.0.0.1:8000/auth/users/me/"

const Access = localStorage.accessToken
function PostDetailPage() {
    //                                                                             Post
    const {post_id} = useParams()
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [author, setAuthor] = useState("");
    const [bump, setBump] = useState("");
    const [isError, setIsError] = useState("");
    const[authorName, setAuthorName] = useState("");

    //                                                                             Comment
    const [commentData, setComment] = useState([]);
    const[commentTitle, setCommentTitle] = useState("");
    const[commentAuthor, setCommentAuthor] = useState("");
    const[commentAuthorName, setCommentAuthorName] = useState("");
    const[commentImage, setCommentImage] = useState();
    

    //                                                                              Image
    const[image, setImage]= useState([]);
    const[coverImage, setCoverImage] = useState([]);
    const[postImage, setPostImage] = useState([]);
    useEffect(() => {

      //                                                     AUTHOR that is CURRENTLY LOGGED IN and about to comment (INTERCEPTOR AND .GET)                        


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
        setCommentAuthor(res.data.id)
        setCommentAuthorName(res.data.username)
        //console.log(res.data.id)
      })
      //console.log(author)



      //                                                                   POST DETAILS of the CURRENT POST (.GET)


        axios
          .get(baseUrl + post_id + '/')
          .then((response) => {
              //console.log(baseUrl + post_id + '/')
              setText(response.data.text)
              setTitle(response.data.title)
              setDate(response.data.date)
              setAuthor(response.data.author)
              setBump(response.data.bump)
              setCoverImage(response.data.cover)
              setAuthorName(response.data.author_name)
              
            })
          .catch((error) => setIsError(error.message));



          //                                                                 COMMENTS of CURRENT POST (.GET)

          axios
          .get(baseUrl + post_id + '/comment/')
          .then((res) => {
              //console.log(res)
              setComment(res.data)
              
              
            })
          .catch((error) => setIsError(error.message));
          //                                                                    Getting Images of Current Post

          axios
          .get(baseUrl + post_id + '/postImage/')
          .then((res) => {
            //console.log(res.data)
            setImage(res.data)
          })



      }, []);
      
    

    //                                                                      POSTING COMMENT WITH HEADER (.POST)

    /*const handleCommentImage = (e) => {
      console.log(e.target.files)
      setCommentImage(e.target.files[0])
    }*/

    const commentHandler = (e) => {
      e.preventDefault();
      const commentUrl = baseUrl + post_id + '/comment/'

      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `JWT ${Access}`;
          return config;
        },
        error => {
          return Promise.reject(error); 
        }
      )

      const formdata = new FormData();
      formdata.append('text', commentTitle)
      formdata.append('author', commentAuthor)
      //formdata.append('image', commentImage)
      formdata.append('author_name', commentAuthorName)
      axios({
        method: "post",
        url : commentUrl,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data"},
      })
      .then(res => {
        console.log(res.data)
        
      })
      .catch((error) => setIsError(error.message));
      //window.location.reload();
    }


    //                                                               updating BUMP (.PUT)
    const bumpHandler = (e) => {
      axios
      .put(baseUrl + post_id + '/', {
        bump : bump + 1,
        author : author,
        text : text,
        title : title
      })
      .then(res => {
        console.log(res.data.bump)
      })
      .catch((error) => setIsError(error.message));
      window.location.reload();
    }

    //                                                   Posting More Images with Add more Image (.POST)

    const handleImage = (e) => {
        console.log(e.target.files)
        setPostImage(e.target.files[0])
    }

    const imagehandle = (e) => {
      e.preventDefault();
      const formdata = new FormData()
      formdata.append('image', postImage)
      formdata.append('parent', post_id)
      const post = baseUrl + post_id + '/postImage/'
      
      
   
    axios({
      method: "post",
      url: post,
      data: formdata,
      headers: { "Content-Type": "multipart/form-data", Authorization: `JWT ${Access}` },
    })
    
      .then((res)=>{
        console.log(res)
    })
    //window.location.reload();
    };

   
    return (
        
            
                <div className="PostDetailPage">
                <h1 className = "details"> POST DETAILS</h1>
                <div className = "detailsCard">
                  {isError !== "" && <h2>{isError}</h2>}
                  <div className = "grid-c">
                    <div className="grid-items1"><h1 className="titl">{title}</h1></div>
                    <div className="grid-items2"><img className = "cardImg" src={coverImage}/>
                    </div>
                    
                  </div>
                  <div className='t'>
                  <p className="txti">{text}</p>
                  </div>
                  <div className="idn">
                  <p>Posted on - {date}</p>
                  <p>Posted by - <Link className="pro" to = {'/profile/user/' + author}>{authorName}</Link></p>
                  <p>Likes - {bump}</p>
                  
                  </div>
                  <div className='b'>
                  <button className="like" onClick = {bumpHandler}>Like</button>
                  <button className="editPost">Edit Post</button>
                  <button className="deletePost">Delete Post</button>
                  </div>
                  
                </div>



                <div className='addcard'>
                {
                /*<label ><b>Add More Images: </b></label>
                <input  type="file" name="image" accept = "image/*" onChange={handleImage}/>*/}
                
                  <label for="formFile" class="form-label">Add more images</label>
                  <input class="form-control" type="file" id="formFile"/>
                  
                <button className='bi' onClick = {imagehandle}><b>Upload Image</b></button>
                
                </div>
                <h1 className="more" >More Images</h1>
                {image.map((images) => {
                      const {image} = images;
                      return(
                        <div className='icard'>
                        <div className = "image">
                          <img className='ci' src={image} />
                          
                        
                          </div>
                        </div>

                      )
                })}

                <div className='cp'>
                <h2 className='writeComment'>Post Comment</h2>
                
                  
                  <label for="comment" className='cmnt'><b>Comment: </b></label>
                  <input type="text" class="form-control" id="hlw" onChange={(e)=>setCommentTitle(e.target.value)}/>
                  {/*<input type="text" name="comment" onChange={(e)=>setCommentTitle(e.target.value)}/>*/}
                
                <div className='cmntimg'>
                  <label for="formFile" class="form-label">Comment image:</label>
                  <input class="form-control" type="file" id="formFile"/>

                  
                  {/*<label><b>Comment Image: </b></label>
                  <input type="file" name="image" accept = "image/*"  /> {/*onChange={handleCommentImage}*/}
                </div>
                <button className="cmntbton" onClick = {commentHandler}><b>Comment</b></button>
                </div>

                
                <h2 className='com'>Comments</h2>
                {commentData.map((comments) => {
                const {text} = comments;
                const {author_name} = comments;
                //const{image} = comments;
                return(
                <div className="Comment">
                    
                    <p className='cmnttxt'>{text}</p>
                    <p className='authortxt'> - {author_name} </p>
                    {/*<img src = {image} />*/}
                </div>
            )
        
        })}
                </div>
           
        
      
    );
  }
  
  export default PostDetailPage;