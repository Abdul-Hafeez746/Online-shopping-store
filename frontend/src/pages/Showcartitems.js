import React from 'react'
import { DECREAMENT,EMPTY } from '../redux/actions/Actions';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Showcartitems = () => {
    let selector = useSelector(state=>state.red)
    let dispatch = useDispatch()
    const totalPrice = selector.reduce((total, item) => total + item.price, 0)

  return (
    <>
    <center>
    <h3>Cart Items</h3>
    <div class="container">
    { selector.length>0 ?
    
    <table class="table table-sm  table-borderless table-hover table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {
    selector.map((val,index)=>{
      return(
        <>
        <tr>
      <th scope="row">{index+1}</th>
      <th scope="row">{val.pname}</th>
       <td><img src={`http://localhost:3200/uploads/${val.image}`}  className="card-img-top" height={170} width={140} alt="data.name" />
      </td>
      <td>{val.description}</td>
      <td>{val.price}</td>
      <td><button type="submit" className="btn btn-success"  onClick={()=>dispatch(DECREAMENT(val._id))}>Delete</button>
      </td>
    </tr>
        </>
      )
    })
  }   

  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>total</td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>RS: </td>
    <td>{totalPrice}</td>
    <td>
    <button type="submit" className="btn btn-success"  onClick={()=>dispatch(EMPTY())}>Empty Cart</button>
    </td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>
    <Link to={"/Checkout"}>
    <button type="submit" className="btn btn-success">Checkout</button>
    </Link>
    </td>
    <td></td>
  </tr>
  </tbody>
</table>
    :
    <h1>No Data to Show in Cart</h1>
    }
    </div>
    </center>
    </>
  )
}

export default Showcartitems