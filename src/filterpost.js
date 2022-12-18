import './post.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

function FilterPost() {
    const {criteria} = useParams()
    const baseUrl = "http://127.0.0.1:8000/api/post/post/?"
    const [myPost, setPostData] = useState([]);
    const [isError, setIsError] = useState("");
    const[nextUrl, setNextUrl] = useState();
    const[previousUrl, setPreviousUrl] = useState();
    const[count, setCount] = useState("");
    
    useEffect(() => {
      console.log(baseUrl + criteria)
        axios
          .get(baseUrl + criteria)
          .then((response) => {
              console.log(response.data.results)
              setPostData(response.data.results)
              setNextUrl(response.data.next)
              setPreviousUrl(response.data.previous)
              setCount(response.data.count)
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
     
    return (
      
        <body className="postbody">
        <div className="Post">
        {count =="0" && <h2>No Posts</h2> }
        {isError !== "" && <h2>{isError}</h2>}
        
        
        {myPost.map((feed) => {
            const {title, date, author_name, pk, category, cover, author,bump} = feed;
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
                    <Link ></Link>
                    Posted By - {author_name}
                  </p>
                  <p class="card__date">Likes - {bump}</p>
                  <Link class="card__cta" to = {'/post/details/' + pk}>Read more</Link>
                </div> 
            )
        })}
        {previousUrl &&
        <button onClick={()=>PaginationHandler(previousUrl)}>Previous</button>}
        {nextUrl &&
        <button onClick={()=>PaginationHandler(nextUrl)}>Next</button>}
        </div>
        </body>
      
    );
  }
  export default FilterPost;