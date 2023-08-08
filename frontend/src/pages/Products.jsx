import React from "react"
// import db from "../Data/Productsdata"
// import ProductCard from "./ProductCard"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, Zoom } from "react-toastify"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate'
import { INCREAMENT} from '../redux/actions/Actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function Products(){
  let auth = JSON.parse(localStorage.getItem("user"));
  let token = auth.token
  let role = auth.whatrole

  let dispatch = useDispatch()
  let navigate = useNavigate()

  let [pdata,setPdata] = useState([])

   let [check,setChecked] = useState([])
    let handleCheckbox = (e) => { 
      let value = e.target.value
      let checked = e.target.checked
      console.log(value,checked)
      if(checked){
        setChecked([...check,value])
      }else{
         setChecked(check.filter(e=>(e!==value)))
       }
    }


    let showpdata = async() => {
    let res = await fetch("http://localhost:3200/user/addproduct",{
      headers: {
       "Content-type": "multipart/form-data charset=UTF-8",
       'Authorization': `${token}`
      }
    })
     let result =await res.json()
     console.log("The Data To Show Is ",result)
     if(result.msg=="jwt expired"){
      localStorage.clear()
      navigate('/Login')
     }

     if(result && result.length>0){
      // setPdata(result.slice(0,50))
      setPdata(result)
     }
    }

    useEffect(()=>{
        showpdata()
    },[])


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


   

    let multipleDelete = async() => {
      console.log(check)
      let ids = { ids: check }
      console.log("ids ", ids)
      let res = prompt("Press 'Y or y' to Delete All Data")
      console.log(res)
      if(res==="y" || res==="Y"){
      let del = await axios.delete(`http://localhost:3200/admin/deletemultiple`, {
      headers: {
        'Authorization': `${token}`
      },
      data: ids
    })
      if (del) {
        showpdata()
        deltoastymsg()
      }    
    }else{
      alert("Data Could Not Be Deleted")
    }
    }



    let allDelete = async() => {
      let res = prompt("Press 'ALL' to Delete All Data")
      console.log(res)
      if(res==="ALL"){
        let del = await axios.delete(`http://localhost:3200/admin/deleteall`, {
          headers: {
           "Content-type": "multipart/form-data charset=UTF-8",
           'Authorization': `${token}`
         }
      })       
        if (del) {
         showpdata()
         deltoastymsg()
        } 
      }else{
        alert("Data Could Not Be Deleted")
      }
        
    }


    let Delete = async(id) => {
          let res = prompt("Press 'Y or y' to Delete All Data")
          console.log(res)
          if(res==="y" || res==="Y"){
        let res = await fetch(`http://localhost:3200/admin/Removecard/${id}`,{
           headers: {
            "Content-type": "multipart/form-data charset=UTF-8",
            'Authorization': `${token}`
          },
          method: "delete"
         })
          let result = res.json()
          if(result){
           console.log("The Data Is Deleted:Refresh the page")
           showpdata()
           deltoastymsg()
          }
        }else{
          alert("Data Could Not be Deleted")
        }
      }

    

     



     


      let [pageNumber,setpageNumber] = useState(0)
      let perPageItem = 8
      let pageVisited = pageNumber*perPageItem
      let displayUser = null;
      if (pdata.length === 0) {
      displayUser = <p className="text-center">No products available On Products Page. Please add some products.</p>;
      }else{
      displayUser = pdata.slice(pageVisited,pageVisited+perPageItem).map((items,ind)=>{
        return(
        <>
        <div className="col-lg-3 col-md-4 col-6 mt-4">
      <div className="card" style={{ width: "14rem" }}>

      <img src={`http://localhost:3200/uploads/${items.image}`}  className="card-img-top" height={170} width={140} alt="data.name" />

        <div className="card-body">
        {
          (role==="admin")? (
            <td>
       <input type="checkbox" name={`select${ind}`} onChange={handleCheckbox} value={items._id} />
        </td>
          ):
          ""
        }
          <h5 className="card-title">{items.pname}</h5>
          <p className="card-text">{items.description}</p>
          <p className="card-text">PKR Rs. {items.price}</p>

          {
            (role==="user") ?
            <>
            <button type="submit" className="btn btn-success"  onClick={()=>dispatch(INCREAMENT(items))}>Add to Cart</button>
            <hr></hr>
            </>
            :
            <>
            <Link to={`/Updateproduct/${items._id}`}>
            <button type="submit"  className="btn btn-success">Update Card</button>
            </Link>  
            <hr></hr>
            <div>
            <button type="submit" className="btn btn-danger" onClick={()=>Delete(items._id)} >Delete Card</button>
            </div>
            </>
          }
        </div>
      </div>
    </div>
            
          </>
        )
      })
    }





      let pageCount = Math.ceil(pdata.length / perPageItem)


      let changePage = ({selected}) => {
        setpageNumber(selected)

      }



    return(
        <>
      <h1 className="m-4 fs-2 fw-bold text-center text-success">
        Products Page
      </h1>
      {
        (role==="admin")?(
          <center>
          <div>
            <button type="submit" className="btn btn-danger" onClick={allDelete}>All Card Delete</button>
          </div>
          <br/>
          <div>
            <button type="submit" className="btn btn-danger" onClick={multipleDelete}>Multiple Delete Card</button>
          </div>
          </center>
        ):
        ""
      }
      <div className="container pages">
          <div className="row">       
               {displayUser}
               <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttns"}
                nextLinkClassName={"nextBttns"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
               />
            </div>
        </div>
      <ToastContainer />

        </>
    )
}

export default Products