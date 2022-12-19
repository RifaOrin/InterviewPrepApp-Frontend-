import './post.css';
import './profile.css';
import './newPost.css';
import cover from './cover.png';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
const Url = "http://127.0.0.1:8000/api/post/newpost/"

function Profile() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isError, setIsError] = useState("");
  const [author, setAuthor] = useState("");
  const[poster, setPoster] = useState("");
  const [pk, setPk] = useState();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [works_at, setWork] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState();
  const [myPost, setPostData] = useState([]);
  const[nextUrl, setNextUrl] = useState();
  const[previousUrl, setPreviousUrl] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
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
          setAuthor(response.data.id)
          setPoster(response.data.username)
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
  
  const  handleImage = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
}

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
    const formdata = new FormData()
    formdata.append('title', title)
    formdata.append('text', text)
    formdata.append('author', author)
    formdata.append('category', category)
    formdata.append('author_name', poster)
    formdata.append('cover', image)
    
    axios({
      method: "post",
      url : Url,
      data: formdata,
      headers: { "Content-Type": "multipart/form-data"},
    })
    
      .then((res)=>{
        console.log(res)
        setPk(res.data.pk)
    })
    //window.location.reload(true);
  }

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
      <body className='profileBody'>
      <div className="ProfilePage">
        <head>
          
        </head>
        {isError == "Request failed with status code 401" && <h2>Please Login or Refresh If Already Logged In</h2>}
        <div className='profile-container'>
          <img src={cover} alt="cover" className='cover-img'/>
          <div className='profile-details'>
            <div className='pd-left'>
              <div className='pd-row'>
              <img src = {avatar} className='pd-img'/>
              <div>
                <h3 className='pd-name'>{name}</h3>
                <p className='pd-username'>@{username}</p>
              </div>
              </div>
            </div>
            <div className='pd-right'></div>
          </div>
           
           <div className='profile-info'>
             <div className='info-col'>
                <div className='profile-intro'>
                  <h3 className='about'>About</h3>
                  <hr></hr>
                  <ul>
                    <li>Works at {works_at}</li>
                    <li>Lives in Dhaka, Bangladesh</li>
                    <li>{gender}</li>
                    <li>email - zisan321@gmail.com</li>
                  </ul>
                </div>
             </div>
             <div className='post-col'>
             <form  class="newpost" onSubmit={e => e.preventDefault()}>
            <h1 className="heading"><b>Create new post</b> </h1>
            
            <form className='newposti'>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)} required/>
                {/*<input type="text" className="input-box" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)} required/>*/}
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Text" onChange={(e)=>setText(e.target.value)} required/>
                {/*<input type="text" className="input-box-text" placeholder="Enter Text"onChange={(e)=>setText(e.target.value)} required/>*/} 
            </form>   
           <div class="spt">
            <div class="postimage_field">
            <label class="image_label" for="image"><b>Image</b></label>
                
                <input class="image_input" type="file" name="image" accept = "image/*" onChange={handleImage}/>
                
            </div> 
            <div class="postCategory_field">
            <label class="category_label" for="category"><b>Category </b></label>
              <select name="category" onChange={(e)=>setCategory(e.target.value)}>
                <option value="questions"  >Questions</option>
                <option value="entertainment"  >Entertainment</option>
                <option value="experiences"  >Experiences</option>
              </select>
            </div>
            
            </div>
            
            <div class="bton">
            <button className="postButton" onClick = {post}><b>Post</b></button>
            </div>
            </form>
            {/*  */}
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
             </div>
           </div>
        </div>
    
        Haven't Created Your Profile? -
        <Link to = '/profile/edit'>Create Profile</Link>
        
        
        

        {previousUrl &&
        <button onClick={()=>PaginationHandler(previousUrl)}>Previous</button>}
        {nextUrl &&
        <button onClick={()=>PaginationHandler(nextUrl)}>Next</button>}
        <button onClick = {logout} >Log Out</button>
        
      </div>
      </body> 
    );
  }
  export default Profile;