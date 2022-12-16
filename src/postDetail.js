import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api/post/post/"
const user = "http://127.0.0.1:8000/auth/users/me/"

const Access = localStorage.accessToken
function PostDetailPage() {
    const {post_id} = useParams()
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [author, setAuthor] = useState("");
    const [bump, setBump] = useState("");
    const [isError, setIsError] = useState("");
    const [commentData, setComment] = useState([]);
    const[commentTitle, setCommentTitle] = useState("");
    const[commentAuthor, setCommentAuthor] = useState("");
    const[commentImage, setCommentImage] = useState();
    const[commentshowImage, setCommentShowImage] = useState();
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
      axios({
        method: "post",
        url : commentUrl,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data"},
      })
      .then(res => {
        console.log(res.data)
        //setCommentShowImage(res.data.image)
      })
      .catch((error) => setIsError(error.message));
      window.location.reload();
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

    function imagehandle() {
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
    window.location.reload();
    };

   
    return (
        
            
                <div className="PostDetailPage">
                <h1> details page</h1>
               
                {isError !== "" && <h2>{isError}</h2>}
                <h2>{title}</h2>
                <p>Posted on - {date}</p>
                <p>Posted by - {author}</p>
                <p>Upvote - {bump}</p>
                <button onClick = {bumpHandler}>Upvote</button>
                <p>{text}</p>



                <p>
                  <img src={coverImage}/>
                </p>
                <label ><b>Add More Images: </b></label>
                <input  type="file" name="image" accept = "image/*" onChange={handleImage}/>
                <button onClick = {imagehandle}><b>Upload Image</b></button>
                More Images:
                {image.map((images) => {
                      const {image} = images;
                      return(
                        <div className = "image">
                          <img src={image} />
                          
                        </div>
                      )
                })}


                <h2>Post Comment</h2>
                <div>
                  <label for="comment"><b>Comment: </b></label>
                  <input type="text" name="comment" onChange={(e)=>setCommentTitle(e.target.value)}/>
                  <label><b>Comment Image: </b></label>
                  <input type="file" name="image" accept = "image/*" />
                </div>
                <button onClick = {commentHandler}>Comment</button>


                <h2>Comments by -</h2>
                {commentData.map((comments) => {
                const {text} = comments;
                const {author} = comments;
                return(
                <div className="Comment">
                    
                    <p>{text}</p>
                    <p>Commented By - {author} </p>
                    <img src = {commentshowImage} />
                </div>
            )
        
        })}
                </div>
           
        
      
    );
  }
  
  export default PostDetailPage;