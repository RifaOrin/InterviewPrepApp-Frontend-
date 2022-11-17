
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
      </Router>
      
      
      
    </div>
  );
}

export default App;
