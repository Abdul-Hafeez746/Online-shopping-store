import React, { useEffect } from 'react'
import { useState } from 'react';
//import {  toast } from 'react-toastify';
import { ToastContainer, Zoom } from "react-toastify"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const ActivityShow = () => {
    let auth = JSON.parse(localStorage.getItem("user"));
    let token = auth.token;
  let [userData,setUserData]=useState([]);

  let deltoastymsg = () => {
    toast.error('Product has been deleted', {
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

  let Delete = async(id) => {
    alert("Are You Sure You Want to Delet The data")
    let res = await fetch(`http://localhost:3200/user/Removeactivity/${id}`,{
      headers: {
        "Content-type": "multipart/form-data charset=UTF-8",
        'Authorization': `${token}`
      },
      method: "delete"
     })
      let result = res.json()
      if(result){
       console.log("The Data Is Deleted:Refresh the page")
       showData()
       deltoastymsg()
      }
  }
  

    
    let showData =async ()=>{
        let result = await fetch('http://localhost:3200/user/showactivity',{
            headers:{
              "Content-type": "multipart/form-data charset=UTF-8",
              'Authorization': `${token}`
            }
        });
        let activity = await result.json();
        setUserData(activity);
        }

        useEffect(()=>{
          showData()
        },[])

  return (
   
   <div>
      <h1 className='display-0 fw-bold my-4 text-primary'>Current User Can Saw Its Own Added Products,Delete and Updete Them</h1>
        <hr />
    <table  class="table table-hover w-75 mx-auto">
    <thead>
    <tr className='bg-warning'>
      <th scope="col">Sr.No.</th>
      <th scope="col">Product name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Image</th>
      <th scope="col">colors</th>
      <th scope="col">category</th>
      <th scope="col">actions</th>


    </tr>
  </thead>
    <tbody>
        {userData.length===0?
         <center><h1><p>No Data To Show</p></h1></center>
        :
          userData.length>0&&
            userData.map((user, ind)=>{
                return(
                    <>
                        <tr key={user._id}>
                            <th scope="row">{ind+1}</th>
                            <td>{user.pname}</td>
                            <td>{user.description}</td>
                            <td>{user.price}</td>
                            <td><img src={`http://localhost:3200/uploads/${user.image}`}  className="card-img-top" height={170} width={140} alt="data.name" /></td>
                            <td>{user.colors}</td>
                            <td>{user.category}</td>
                            <td>
                            <Link to={`/UpdateActivity/${user._id}`}>
                           <button type="submit"  className="btn btn-success">Update Card</button>
                           </Link>  
                            <hr></hr>
                           <button type="submit" className="btn btn-danger" onClick={()=>Delete(user._id)}>Delete Card</button>
                            </td>
                           </tr>
                    </>
                )
            })
        }
        </tbody>
    </table>
    <ToastContainer/>
</div>   
  )
}

export default ActivityShow;
