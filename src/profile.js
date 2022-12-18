import './post.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [works_at, setWork] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState();
  const [myPost, setPostData] = useState([]);
  const[nextUrl, setNextUrl] = useState();
  const[previousUrl, setPreviousUrl] = useState();
  const Access = localStorage.accessToken

  const navigate = useNavigate();


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

    //                                                                        Getting Current Username and ID
    axios
      .get(
        "http://127.0.0.1:8000/auth/users/me/"
    )
      .then((response) => {
          console.log(response.data)
          setUsername(response.data.username)
          
          axios
          .get("http://127.0.0.1:8000/api/user/profile/" + response.data.id + "/")
          .then((res) => {
            setName(res.data.name)
            setWork(res.data.works_at)
            setGender(res.data.gender)
            setAvatar(res.data.avatar)
          }) 

          axios
          .get("http://127.0.0.1:8000/api/post/post/?search=" + response.data.username)
          .then((response)=>{
              console.log(response.data.results)
              setPostData(response.data.results)
              setNextUrl(response.data.next)
              setPreviousUrl(response.data.previous)
          })
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
   
    function logout(){
        window.localStorage.removeItem("accessToken");
        navigate('/')
    }
    return (
      <div className="ProfilePage">
        {isError == "Request failed with status code 401" && <h2>Please Login or Refresh If Already Logged In</h2>}
        <h1> profile page</h1>
        Haven't Created Your Profile? -
        <Link to = '/profile/edit'>Create Profile</Link>
        <div className="profile">
          <p>Username: {username}</p>
          <p>Name: {name}</p>
          <p>Works At: {works_at}  </p>
          <p>Gender: {gender}  </p>
          <img src = {avatar} />
        </div>
        <br></br>
        Posts -
        <br></br>
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
        <button onClick = {logout} >Log Out</button>
        
      </div> 
    );
  }
  export default Profile;