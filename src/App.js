
import './App.css';
import { Route,BrowserRouter as Router,Routes,Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import { baseUrl } from './BaseUrl';
function App() {
  const [login,setLogin] = useState(false);
  const [signUp,setSignUp] = useState(false);
  function handleLogin(){
    setLogin(true);
    setSignUp(false);
  }
  function handleSignUp(){
    setLogin(false);
    setSignUp(true);
  }
  return (
    <div className="App">

      <div className='Input'>
      {login && <Login/>}
      {signUp && <SignUp/>}
     <div className='buttons'>
      <button onClick= {handleLogin} > Login </button>
      <button  onClick={handleSignUp}> Sign Up</button>
      </div>
      </div>
    </div>
  );
}

function MainApp(){
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </Router>
  )
}

export default MainApp;
