import React from 'react'
import { useState  } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, Zoom } from "react-toastify"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const ForgotNumber = () => {
  const navigate = useNavigate();
  var id

  let [userData,setUserData]=useState({
    number:"",
  });  

  let inputHandler=(e)=>{
    setUserData({...userData,[e.target.name]:e.target.value});
  }



  let saveData = async (e)=>{
    e.preventDefault();

    let res = await fetch('http://localhost:3200/Forgotuserbynumber',{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json",
        },
    })
    res = await res.json();
    console.log(res);
    if(res.msg==="Please Enter Some Number First"){
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
    }else if(res.msg==="Email Not Verfied"){
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
    }else if(res.msg==="The Number is Not Registered Yet"){
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
    }else if(res.msg==="OTP through Message Sending..."){
        navigate(`/codeVerify/${res.userId}`)
        swal({
          title: "OTP Sent",
          text:res.msg,
          icon: "success",
        });
    }
 }





  return (
    <>
    <div style={{marginTop:"100px"}}>
        <center>    
    <h3>The Password Will Expire After 1 Minute</h3>
    <h1>This Module otherwise works But Cannot send sms to your phone cause we  dont use any provider</h1>


     <div className="card m-5" style={{borderRadius:"15px",width:"400px",backgroundColor:"#f6f7f8"}}>
  <div className="card-body">
    <h3 className="card-title text-center">Forgot</h3>
    

<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Number</span>
  <input type="number" name='number' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='+923131232124' onChange={inputHandler} required  />
</div>
   <button type="button" class="btn btn-success mt-5" style={{width:"250px"}} onClick={saveData}>Send</button>
  </div>
</div>
    <div>
    <Link to={`/Register`}>
      <button type="submit"  className="btn btn-success">Register yourselfe</button>
      </Link>  
    </div>
    <br></br>
    <div>
    <Link to={`/Forgot`}>
      <button type="submit"  className="btn btn-success">Send Password On Email</button>
      </Link>  
    </div>
</center>
    
    </div>
    <ToastContainer/>
    </>
  )
}

export default ForgotNumber;
