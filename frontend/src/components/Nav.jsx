import React from 'react';
import { Link,use } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Nav(){
  let selector = useSelector(state=>state.red)

  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate("/Login")
 }



  let auth = JSON.parse(localStorage.getItem("user"))

    return(
    <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light navmanual">
  <div class="container-fluid">
    <Link to  class="navbar-brand" >Navbar</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">

        
         {
          auth ? 
          <>
          <li class="nav-item">
          <Link to={"/"} class="nav-link active" aria-current="page" >Home</Link>
        </li>

        <li class="nav-item">
          <Link to={"/Product"}  class="nav-link active" aria-current="page" >Products</Link>
        </li>
         {
          auth.whatrole==="admin" ?
         <>
        <li class="nav-item">
          <Link to={"/AddProduct"}  class="nav-link active" aria-current="page" >Add Products</Link>
        </li>
        </>
        :
        ""
         }
        <li class="nav-item">
          <Link to={"/About"} class="nav-link active" aria-current="page" >About</Link>
        </li>
         
         {
          auth.whatrole!=="admin" ?
          <>
        <li class="nav-item">
          <Link to={"/Activity"}  class="nav-link active" aria-current="page" >Add Activity</Link>
        </li>
        <li class="nav-item">
          <Link to={"/Activityshow"}  class="nav-link active" aria-current="page" >Show Activity</Link>
        </li>
        </>
        :
        ""
         }

          <li class="nav-item">
          <Link to={"/Login"} class="nav-link active" aria-current="page" onClick={logout} >Logout</Link>
        </li>

        {
          auth.whatrole==="user" ?
         <>
        <Link to='/Showcartitems'>
      <button type="button" class="btn btn-dark">
      items <span class="badge badge-light">{selector.length}</span>
      </button>
      </Link>
      </>
      :
      ""
        }
        </>
        :
        <>
        <li class="nav-item">
          <Link to={"/Login"} class="nav-link active" aria-current="page" >Login</Link>
        </li>
        <li class="nav-item">
          <Link to={"/Register"} class="nav-link active" aria-current="page" >Register</Link>
        </li>
        </>
        }

     
      </ul>


      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
    )

}

export default Nav