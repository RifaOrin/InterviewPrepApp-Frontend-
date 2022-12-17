
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Post from './post';
import Profile from './profile';
import NewPost from './newPost';
import PostDetailPage from './postDetail';
import SignUp from './signUp';
import Questions from './questions';
import Experience from './experience';
import Entertainment from './entertainment';
import Activate from './activate';
import EditProfile from './editProfile';
import People from './people';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
     
      
      
      <Router>
        
      <Routes>
          <Route path="/" element={<HomePage/>}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
        <Routes>
          <Route path="/post" element={<Post/>}></Route>
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
        <Routes>
          <Route path="/newpost" element={<NewPost/>}></Route>
        </Routes>
        <Routes>
          <Route path="/post/:post_id" element={<PostDetailPage/>}></Route>
        </Routes>
        <Routes>
          <Route path="/category/qus" element={<Questions/>}></Route>
        </Routes>
        <Routes>
          <Route path="/category/exp" element={<Experience/>}></Route>
        </Routes>
        <Routes>
          <Route path="/category/ent" element={<Entertainment/>}></Route>
        </Routes>
        <Routes>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
        <Routes>
          <Route path="/activate" element={<Activate/>}></Route>
        </Routes>
        <Routes>
          <Route path="/profile/edit" element={<EditProfile/>}></Route>
        </Routes>
        <Routes>
          <Route path="/profile/:profile_id" element={<People/>}></Route>
        </Routes>
      </Router>
      
      
      
    </div>
  );
}

export default App;
