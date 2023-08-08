import React, { useState } from 'react'
import Axios from 'axios';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HomeProduct = () => {
  let auth = JSON.parse(localStorage.getItem("user"));
  let token = auth.token;


    let navigate = useNavigate()
    let [hdata,setHdata] = useState([])
     useEffect(
      async()=>{
        try{
        const result = await Axios.get(`http://localhost:3200/user/addproducthome`,{
          headers: {
            "Content-type": "multipart/form-data charset=UTF-8",
            'Authorization': `${token}`
          }
        })
        console.log(`the data to show`,result)
        setHdata(result.data)
      }
      catch(error){
        console.log(error.msg)
      }
      
     },[])

    
  return (
    <>
    <div className="row p-5">
  { hdata.length===0?
  <h1>No Data to Show</h1>
  :
    hdata.length>0&&hdata.map((val) => {
    return (
      <div className="col-lg-3 col-md-4 col-6 mt-4">
        <div className="card" style={{ width: "14rem" }}>
          <img
            src={`http://localhost:3200/uploads/${val.image}`}
            className="card-img-top"
            height={170}
            width={140}
            alt="data.name"
          />
          <div className="card-body">
            <h5 className="card-title">{val.pname}</h5>
            <p className="card-text">{val.description}</p>
            <p className="card-text">PKR Rs. {val.price}</p>

          </div>
        </div>
      </div>
    );
  })}
</div>
   <div>
   <center>
    <NavLink to={"/Product"}>
      <button className='btn btn-success m-4'>Read more</button>
    </NavLink>
    </center>
   </div>
    </>
  )
}

export default HomeProduct



// async function fetchData() {
//   try {
//     const response = await axios.get('/api/data');
//     console.log(response.data);
//   } catch (error) {
//     if (error.response) {
//       // Request was made and server responded with a status code that is not in the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);

//       if (error.response.status === 401 && error.response.data.msg === "jwt expired") {
//         // Perform a specific action if the error status is 401 and the message is "jwt expired"
//         console.log("Authorization token has expired");
//       } else {
//         // Perform a default action for other errors
//         console.log("An error occurred while fetching the data");
//       }
//     } else if (error.request) {
//       // Request was made but no response was received
//       console.log(error.request);
//     } else {
//       // Something else happened in setting up the request
//       console.log('Error', error.message);
//     }
//   }
// }
