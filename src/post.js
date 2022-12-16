import './post.css';
import {useEffect, useState} from "react";
//import image from './image.png';
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
import NewPost from "./newPost";

//console.log(image);
 
const baseUrl = "http://127.0.0.1:8000/api/post/post/"
function Post() {
    const [myPost, setPostData] = useState([]);
    const [isError, setIsError] = useState("");
    const[nextUrl, setNextUrl] = useState();
    const[previousUrl, setPreviousUrl] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios
          .get(baseUrl)
          .then((response) => {
              console.log(response.data.results)
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
      
        <body className="postbody">
         <NewPost/> 
        <div className="Post">
        
        <h1 className='head'>Our Latest Posts</h1>
        
        {isError !== "" && <h2>{isError}</h2>}
        {myPost.map((feed) => {
            const {title, date, author, pk, category, cover} = feed;
        
          return(
                <div className="card">
                  <div class="card__img-container">
                    <img class="card__img" src={cover} alt="post image" />
   
                  </div>
                  <div class="card__body | flow">
                      <h3 class="card__title">{title}</h3>
                  </div>
                  <div class="card__tags">
                       <span class="card__tag" >{category}</span>
                       
                      
                          
                  </div>
                  <p class="card__date">
                    Posted On - {date}
                  </p>
                  <p class="card__date">
                    Posted By - {author}
                  </p>

                  <Link class="card__cta" to = {'/post/' + pk}>Read more</Link>
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
        </body>
      
    );
  }
  
  export default Post;