import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedAdmin = () => {
    let auth = JSON.parse(localStorage.getItem("user"))
    let role = auth.whatrole
  return (auth&&role==="admin") ? <Outlet/> : <Navigate to="/Login"/>

}

export default ProtectedAdmin