import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return(
        <>
      <nav class="navbar navbar-expand-lg navbar-grey bg-light navmanual">
      <div class="container-fluid">
      

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
    
            <li class="nav-item">
              <Link to={"/"} class="nav-link active" aria-current="page" >Home</Link>
            </li>
    
            <li class="nav-item">
              <Link to={"/Product"}  class="nav-link active" aria-current="page" >Products</Link>
            </li>
    
            <li class="nav-item">
              <Link to={"/About"} class="nav-link active" aria-current="page" >About</Link>
            </li>
    
            <li class="nav-item">
              <Link to={"/Signup"} class="nav-link active" aria-current="page" >Sign Up</Link>
            </li>
    
            <li class="nav-item">
              <Link to={"/Login"} class="nav-link active" aria-current="page" >Login</Link>
            </li>
    
            <li class="nav-item">
              <Link to={"/Show"} class="nav-link active" aria-current="page" >ShowData</Link>
            </li>
            
          </ul>
         
        </div>
      </div>
    </nav>
        </>
        )
}

export default Footer

