import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../BaseUrl';

const Login = () => {
  const navigate = useNavigate();
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const loginUser = async()=>{
    try{
      const res = await axios.post(`${baseUrl}api/auth/local`,{
        identifier:username,
        password:password,
      });
      if(res.status===200){
        navigate(`./chat/?username=${username}`)
           alert("welcome to shaolin");
          console.log(res);
      }
    }
    catch(error){
      alert("wrong username or password");
      console.log(error);
    }
  }
  return (
    <div className='Login'>
      <h2>Login</h2>
      <div className='inputs'>
       <input type='text' onChange={(e)=>setUserName(e.target.value)} placeholder='Enter UserName'/>
       <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
       </div>
       <button onClick={loginUser}> Let's Chat </button>
    </div>
  )
}

export default Login
