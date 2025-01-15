import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../BaseUrl';
import axios from 'axios';
const SignUp = () => {
    const [email,setEmail] = useState("");
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async () => {
        try {
            const emailRes = await axios.get(`${baseUrl}api/users?filters[email][$eq]=${email}`);
            const usernameRes = await axios.get(`${baseUrl}api/users?filters[username][$eq]=${username}`);
          
          console.log(emailRes);
          console.log(usernameRes);

          if (emailRes.data.length > 0) {
            alert('Email already exists.');
            return;
          }
          if (usernameRes.data.length > 0) {
            alert('Username already exists.');
            return;
          }
          console.log("okay okay")
          const response = await axios.post(`${baseUrl}api/auth/local/register`, {
            email: email,
            username: username,
            password: password,
          });
          if (response.status === 200) {
            alert('user created successfully');
            navigate(`./chat/?username=${username}`);
          }
        } catch (error) {
          alert("please enter credentials again");
          console.error(error);
        }
      };
  return (
    <div className='SignUp'>
        <h2>SignUp</h2>
     <div className='inputs'>
      <input type='mail' placeholder='enter your email ID ' onChange={(e)=>setEmail(e.target.value)}/>
      <input type='text'  placeholder='Enter your UserName' onChange={(e)=>setUserName(e.target.value)} />
      <input type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handleSignUp}> Let's Chat</button>
      </div>
    </div>

  )
}

export default SignUp
