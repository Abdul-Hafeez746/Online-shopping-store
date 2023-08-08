import React from 'react'
import { useNavigate , Link } from 'react-router-dom';
import { useState  } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';



const Reset = () => {
    const navigate = useNavigate();
    let {id} = useParams()

  let [userData,setUserData]=useState({
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
    
    let res = await fetch(`http://localhost:3200/reset/${id}`,{
        method:'PUT',
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json",
        },
    })
    res = await res.json();
    if(res.msg==="Password  Is Updated")
    {
      navigate("/Login");
      swal({
        title: "Passsword Updated",
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
    <h3 className="card-title text-center">Reset your Password</h3>
    


<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
  <input type="text" name='password' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler}/>
</div>

<div className="input-group input-group-lg mt-5">
  <span className="input-group-text" id="inputGroup-sizing-lg">Confirm Password</span>
  <input type="text" name='cpassword' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={inputHandler}/>
</div>

    <button type="button" class="btn btn-success mt-5" style={{width:"250px"}} onClick={saveData}>save</button>
  </div>
</div>

<div>
    <Link to={`/Login`}>
      <button type="submit"  className="btn btn-success">Login yourselfe</button>
      </Link>  
    </div>
</center>

    </div>
    </>
  )
}

export default Reset