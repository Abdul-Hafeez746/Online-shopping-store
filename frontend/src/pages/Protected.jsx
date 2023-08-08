import React from 'react';
import { Navigate, Outlet ,Route } from 'react-router-dom';


const Protected = () => {      //outlet method
  let auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/Login" />;
};


export default Protected;
