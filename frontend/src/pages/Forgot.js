import React from 'react'
import { useState  } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, Zoom } from "react-toastify"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Forgot = () => {

  let [userData,setUserData]=useState({
    email:"",
  });


  

  let inputHandler=(e)=>{

    setUserData({...userData,[e.target.name]:e.target.value});
    // console.log(userData);
    
  }


  let saveData = async (e)=>{
    e.preventDefault();

    let res = await fetch('http://localhost:3200/Forgotuser',{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json",
        },
    })
    res = await res.json();

    console.log(res);
    if(res.msg==="you are not a registered user"){
      console.log("you are not a registered user")
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
    }
    else if(res.msg==="Email Sent Successfully"){
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
    }
 }



  return (
    <>
    <div style={{marginTop:"100px"}}>
        <center>    
    <h3>The Password Will Expire After 1 Minute</h3>

     <div className="card m-5" style={{borderRadius:"15px",width:"400px",backgroundColor:"#f6f7f8"}}>
  <div className="card-body">
    <h3 className="card-title text-center">Forgot</h3>
    

<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
  <input type="text" name='email' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  onChange={inputHandler} />
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
    <Link to={`/ForgotNummber`}>
      <button type="submit"  className="btn btn-success">Send Password On Number</button>
      </Link>  
    </div>
</center>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Forgot;
