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
        <div className="Post">
        <NewPost/>
        <h1> post page</h1>
        
        {isError !== "" && <h2>{isError}</h2>}
        {myPost.map((feed) => {
            const {title, text, date, author, pk, category} = feed;
            return(
                <div className="card">
                  <div class="card__img-container">
                    <img class="card__img" src="//unsplash.it/400/300" alt="random unsplash image" />
   
                  </div>
                  <div class="card__body | flow">
                      <h3 class="card__title">{title}</h3>
                  </div>
                  <div class="card__tags">
                      {category == 'qus' && <p class="card__tag">Category - Question</p> }
                      {category == 'ent' && <p class="card__tag">Category - Entertainment</p> }
                      {category == 'exp' && <p class="card__tag">Category - Experience</p> }
                          
                  </div>
                  <p class="card__date">
                    Posted On - {date}
                  </p>
                  <p>
                    Posted By - {author}
                  </p>

                  <Link to = {'/post/' + pk}>Read more</Link>
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