import React from 'react';
import Nav from './components/Nav';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Login from './pages/Login';
import Slider from './components/slider';
import Footer from './components/Footer';
import Addproduct from './pages/Addproducts';
import Updateproduct from './pages/Updateproduct';
import Register from './pages/Register';
import Protected from './pages/Protected';
import ProtectedAdmin from './pages/ProtectedAdmin';
import Activity from './pages/Activity';
import ActivityShow from './pages/ShowActivity';
import Showcartitems from './pages/Showcartitems';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import PasswordVerify from './pages/PasswordVerify';
import UpdateActivity from './pages/UpdateActivity';
import ForgotNumber from './pages/ForgotNumber';
import SuccessFullyLogin from './pages/successFullyLogin';

function App() {
  return (
    <div className="App">
    <Nav />
    <Slider/>
     

    <Routes>
    <Route element={<Protected/>} >    // outlet metod
    <Route path='/' element={<Home/>} />
    <Route path='/Product' element={<Products/>} />
    <Route path='/About' element={<About/>} />
    <Route path='/Activity' element={<Activity/>} />
    <Route path='/Activityshow' element={<ActivityShow/>} />
    <Route path='/Showcartitems' element={<Showcartitems/>} />
    <Route path='/UpdateActivity/:id' element={<UpdateActivity />} />
    <Route path='/Checkout' element={<Checkout/>} />
    <Route path='/AddProduct' element={<Addproduct/>} />
    <Route path='*' element={<Error/>} />
    </Route>

    <Route element={<ProtectedAdmin/>} >
    <Route path='/' element={<Home/>} />
    <Route path='/Product' element={<Products/>} />
    <Route path='/AddProduct' element={<Addproduct/>} />
    <Route path='/Updateproduct/:id' element={<Updateproduct />} />
    <Route path='/About' element={<About/>} />
    <Route path='*' element={<Error/>} />
    </Route>

    

    <Route path='/Login' element={<Login/>} />
    <Route path='/Register' element={<Register/>} />
    <Route path='/Forgot' element={<Forgot/>} />
    <Route path='/Reset/:id' element={<Reset/>} />
    <Route path='/codeVerify/:id' element={<PasswordVerify/>} />


    <Route path='/ForgotNummber' element={<ForgotNumber/>} />

    <Route path='/success' element={<SuccessFullyLogin/>} />



    <Route path='*' element={<Error/>} />

   

    </Routes>   
    <Footer/>
    </div>
  );
}

export default App;


