import React from 'react'
import { useState } from 'react';
//import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { ClimbingBoxLoader } from 'react-spinners';




const Register = () => {

const navigate = useNavigate();


let [loading,setLoading] = useState(false)

const override = {
  display: "block",
  margin: "0 auto",
  color:"green",
  borderColor: "red",
  position: "absolute",
  top: "130%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};




  let [userData,setUserData]=useState({
    pname:"",
    number:"",
    email:"",
    password:"",
    cpassword:"",
  });


  let inputHandler=(e)=>{

    setUserData({...userData,[e.target.name]:e.target.value});
    // console.log(userData);
    
  }

  let saveData = async (e)=>{
    e.preventDefault();


    if (userData.password !== userData.cpassword) {
      swal({
        title: "Passwords do not match",
        text: "Please enter the same password in both fields",
        icon: "error",
      });
      return;
    }
    if(!userData.number){
      swal({
        title: "number not provided",
        text: "Please enter the same number with correct format",
        icon: "error",
      });
      return;
    }
    
    setLoading(true)
    let res = await fetch('http://localhost:3200/register',{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json",
        },
    })
    setLoading(false)
    res = await res.json();

    if(res.msg==="Verify Your Email To Login,Email Sent Successfully")
    {
      navigate("/Login");
      swal({
        title: "Registered",
        text:res.msg,
        icon: "success",
      });
    }

    if(res.msg==="The is Some Error during Registering You"){
      navigate("/register");
      swal({
        title: "Not Registerd",
        text:res.msg,
        icon: "error",
      });
    }

    if(res.msg==="Provide Name With length greater than 3"){
      navigate("/register");
      swal({
        title: "Not Registerd",
        text:res.msg,
        icon: "error",
      });
    }

    if(res.msg==="Provide A Valid Email"){
      navigate("/register");
      swal({
        title: "Not Registerd",
        text:res.msg,
        icon: "error",
      });
    }

    if(res.msg==="Email Already Exists"){
      navigate("/register");
      swal({
        title: "Not Registerd",
        text:res.msg,
        icon: "error",
      });
    }

    if(res.msg==="Error sending email"){
      navigate("/register");
      swal({
        title: "Not Registerd,Check Your Interment Connection",
        text:res.msg,
        icon: "error",
      });

    }
 }

  return (
    <>
     {loading ? (
      <div className="sweet-loading">
      <ClimbingBoxLoader
        loading={loading}
        cssOverride={override}
        color='green'
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    ) : (
    <div style={{marginTop:"100px"}}>
        <center>    
     <div className="card m-5" style={{borderRadius:"15px",width:"400px",backgroundColor:"#f6f7f8"}}>
  <div className="card-body">
    <h3 className="card-title text-center">Sign up</h3>
    

    <div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Name</span>
  <input type="text" className="form-control" name='pname' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler}/>

</div>

<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Number</span>
  <input type="number" name='number' className="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='+923131232124'  onChange={inputHandler} />
</div>

<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
  <input type="text" name='email' className="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler} />
</div>


<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
  <input type="text" name='password' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler}/>
</div>

<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Confirm Password</span>
  <input type="text" name='cpassword' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler}/>
</div>

    <button type="button" class="btn btn-success mt-5" style={{width:"250px"}} onClick={saveData}>Sign up</button>
  </div>
</div>

<div>
    <Link to={`/Login`}>
      <button type="submit"  className="btn btn-success">Login yourselfe</button>
      </Link>  
    </div>
</center>
    </div>
    )
     }
    </>
  )
}

export default Register;
