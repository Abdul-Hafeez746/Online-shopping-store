import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, Zoom } from "react-toastify"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useMemo } from 'react';
import axios from "axios"
import { useCallback } from 'react';
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  IResolveParams,
} from 'reactjs-social-login';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from 'react-social-login-buttons';

const Login = () => {
const navigate = useNavigate();



  let [userData,setUserData]=useState({
    email:"",
    password:"",
  });

  
  

  let inputHandler=(e)=>{

    setUserData({...userData,[e.target.name]:e.target.value});
    // console.log(userData);
    
  }

  let saveData = async (e)=>{
    e.preventDefault();
    
    let res = await fetch('http://localhost:3200/loginuser',{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json",
        },
    })
    res = await res.json();
    console.log(res);
    if(res.msg==="successfully Login")
    {
      console.log(res);
      toast.success(res.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
        })
        localStorage.setItem("user",JSON.stringify(res));
        navigate("/");
    }
    else if(res.msg==="invalid email or password"){
      console.log("invalid email or password")
      toast.error(res.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
        })
    }
    else if(res.msg==="your email is not verified"){
      console.log("your email is not verified")
      toast.error(res.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
        })
    }
    else if(res.msg==="you are not a register user"){
      console.log("you are not a register user")
      toast.error(res.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
        })
    }
    else{
        navigate("/Login");
    }
    
 }



//  const handleGoogleLogin = async (provider, data ) => {
//   try {
//     // Send the provider and data to the server for saving
//     const res = await fetch('http://localhost:3200/loginuserSocialy', {
//       method: 'POST',
//       body: JSON.stringify({ provider, data  }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//    const response = await res.json();
//    console.log("res after hitting api",response)

//    if(response.msg==="successfully Login")
//    {
//      console.log(response);
//      toast.success(response.msg, {
//        position: "top-right",
//        autoClose: 2000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//        theme: "dark",
//        transition: Zoom,
//        })
//        localStorage.setItem("user",JSON.stringify(response));
//        navigate("/");
//    } else  if(response.msg==="This Email Is already Registered")
//    {
//      console.log(response);
//      toast.success(response.error, {
//        position: "top-right",
//        autoClose: 2000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//        theme: "dark",
//        transition: Zoom,
//        })
//    } 
//   else{
//       navigate("/Login");
//   }
//   } catch (error) {
//     console.log('An error occurred', error);
//   }
// };


const handleGoogleLogin = async (provider, data) => {
  try {
    // Send the provider and data to the server for saving
    const res = await fetch('http://localhost:3200/loginuserSocialy', {
      method: 'POST',
      body: JSON.stringify({ provider, data }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let response = await res.json();
    console.log('Response after hitting the API:', response);
    // localStorage.setItem("user",JSON.stringify(response));
    // navigate("/");
    console.log("response ", response)
    console.log("response msg",response.msg)

    if (response.msg === 'This Email Already exits with some other source') {
      console.log(response);
      toast.error(response.msg, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Zoom,
      });
    } else{
       // Store the desired data in localStorage
       localStorage.setItem('user', JSON.stringify(response));
       navigate('/');
    }
    // else if (response.msg === 'This Email Is already Registered') {
    //   console.log(response);
    //   toast.error(response.msg, {
    //     position: 'top-right',
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'dark',
    //     transition: Zoom,
    //   });
    // } else {
    //   navigate('/Login');
    // }
  } catch (error) {
    console.log('An error occurred:', error);
  }
};



 const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState('');

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);


  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  const onLogout = useCallback(() => {}, []);



  let GOOGLE_CLIENT_ID="383572339491-tj7p1ktp466h97b9o1g139h8mmimjm6r.apps.googleusercontent.com"
  let REDIRECT_URI="http://localhost:3000/"

  return (
    console.log("provier",provider,"profile",profile),
    <>
    <div style={{marginTop:"100px"}}>
        <center>    
     <div className="card m-5" style={{borderRadius:"15px",width:"400px",backgroundColor:"#f6f7f8"}}>
  <div className="card-body">
    <h3 className="card-title text-center">Login</h3>
    

<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
  <input type="text" name='email' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler} />
</div>


<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
  <input type="text" name='password' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler}/>
</div>
    <button type="button" class="btn btn-success mt-5" style={{width:"250px"}} onClick={saveData}>Login</button>
  </div>
</div>
    <div>
    <Link to={`/Register`}>
      <button type="submit"  className="btn btn-success">Register yourselfe</button>
      </Link> 
       <Link to={`/Forgot`}>
      <button type="submit"  className="btn btn-success">Forgot Password</button>
      </Link>   
    </div>
</center>
  <center>
  <LoginSocialGoogle
          client_id={GOOGLE_CLIENT_ID}
          onLoginStart={onLoginStart}
          redirect_uri={REDIRECT_URI}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            handleGoogleLogin(provider, data );
            // localStorage.setItem("user",JSON.stringify(data));
            // navigate("/");
          }}
          onReject={err => {
            console.log(err);
          }}
        >
        <div style={{width:'400px'}}>          
        <GoogleLoginButton />
        </div>
        </LoginSocialGoogle>
  </center>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Login;
