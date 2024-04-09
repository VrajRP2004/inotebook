import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
// import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        {/* <Alert message="I am vraj" /> */}
        <div className="contaier">
          <Routes >
            <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
