import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState  } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';


const PasswordVerify = () => {
    const navigate = useNavigate();
    
    let {id}=useParams();

  let [userData,setUserData]=useState({
    code:"",
  });

  
  

  let inputHandler=(e)=>{

    setUserData({...userData,[e.target.name]:e.target.value});
    // console.log(userData);
    
  }

  let saveData = async (e)=>{
    e.preventDefault();
    console.log(userData);

    let res = await fetch(`http://localhost:3200/codeVerify`,{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json",
        },
    })
    res = await res.json();
    console.log("result",res)
    if(res.msg==="code does not matced,Resend Again or check code again")
    {
      navigate(`/Forgot`);
      swal({
        title: "Password dosen't Matched",
        text:res.msg,
        icon: "error",
      });
    } 
    if(res.msg==="Password Not Created")
    {
      navigate(`/Forgot`);
      swal({
        title: "Password Not Created",
        text:res.msg,
        icon: "error",
      });
    } 
    if(res.msg==="Password Expired")
    {
      navigate(`/Forgot`);
      swal({
        title: "Password Expired",
        text:res.msg,
        icon: "error",
      });
    } 
    if(res.msg==="Password Matched")
    {
      navigate(`/Reset/${id}`);
      swal({
        title: "Now You Can Update your Password",
        text:res.msg,
        icon: "success",
      });
    } 
   
 }

  return (
    <>
    <div style={{marginTop:"100px"}}>
        <center>    
     <div className="card m-5" style={{borderRadius:"15px",width:"400px",backgroundColor:"#f6f7f8"}}>
  <div className="card-body">
    <h3 className="card-title text-center">Enter Verification Code </h3>
    


<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Code</span>
  <input type="text" name='code' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler}/>
</div>


    <button type="button" class="btn btn-success mt-5" style={{width:"250px"}} onClick={saveData}>verify</button>
  </div>
</div>
</center>

    </div>
    </>
  )
}

export default PasswordVerify;