
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Post from './post';
import Profile from './profile';
import NewPost from './newPost';
import PostDetailPage from './postDetail';

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
        
      </Router>
      
      
      
    </div>
  );
}

export default App;
