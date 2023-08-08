import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage} from 'formik'
import Axios from 'axios'
import { zyadavalidate } from './Productvalidate'
import { useState } from "react";

function Addproduct() {
  const [image, setImage] = useState(null);
  let auth = JSON.parse(localStorage.getItem("user"));
  let token = auth.token;


  let navigate = useNavigate()

  let addtoastMsg = () => {
        toast.success('Product has been Added', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }

      let errtoastMsg = () => {
        toast.error('You Are Not An Admin', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
  

  return (
    <>
    <Formik 
    validationSchema={zyadavalidate}
    initialValues={{
        pname:"",  
        description:"",
        price:"",
        image:null,
        // email:"",
        colors:[],
        // gender:"",
        category:"",
        // address:"",
        // password:"",
        // cpassword:""
        }}
    onSubmit={ async(values)=>{
    console.log(values)
    let res = await Axios.post("http://localhost:3200/admin/addproduct",values,{
      headers: {
        "Content-type": "multipart/form-data charset=UTF-8",
        'Authorization': `${token}`
      }
    })

    if(res==="Unauthorized")
    {
      errtoastMsg()
    }
   else{
      console.log(res)
      navigate('/Product')
      addtoastMsg()
    
    }
    }}
    >

    {({values,setFieldValue}) => (  
      
      <div className="container" style={{marginTop:"100px",width:"800px"}}>
      <center>   
      
       <Form>
      <hr></hr>
      <h1>Admin Can Add Product</h1>
      <hr></hr>

        <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="pname" id="inputGroup-sizing-lg">Product Name</span>
        <Field type="text" className="form-control" name='pname' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <ErrorMessage name="pname"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div>


        <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="description" id="inputGroup-sizing-lg">Description</span>
        <Field type="text" className="form-control" name='description' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <ErrorMessage name="description"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div>


        <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="price" id="inputGroup-sizing-lg">Price</span>
        <Field type="text" className="form-control" name='price' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <ErrorMessage name="price"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div>



        {/* <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="email" id="inputGroup-sizing-lg">Email</span>
        <Field type="text" className="form-control" name='email' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <ErrorMessage name="email"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div>
     */}

        <div className="input-group input-group-lg mt-5">
        <label htmlFor="colors" className="input-group-text" name="colors" id="inputGroup-sizing-lg">Color</label>
                <br/>
                <label className="input-group-text" name="colors" id="inputGroup-sizing-lg">
                    <Field type="checkbox" name="colors" value="red"   />
                    Red
                </label>
                <label className="input-group-text" name="colors" id="inputGroup-sizing-lg">
                    <Field type="checkbox" name="colors" value="green"   />
                    Green
                </label>
                <label className="input-group-text" name="colors" id="inputGroup-sizing-lg">
                    <Field type="checkbox" name="colors" value="blue"  />
                    Blue
                </label>
        <ErrorMessage name="colors"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
         </div>
        
        
        
         {/* <div className="input-group input-group-lg mt-5">
        <label htmlFor="gender" className="input-group-text" name="gender" id="inputGroup-sizing-lg">Gender </label>
          <label className="input-group-text" name="colors" id="inputGroup-sizing-lg">
            <Field type="radio" name="gender" value="male"  />
            Male
          </label>
          <label className="input-group-text" name="colors" id="inputGroup-sizing-lg">
            <Field type="radio" name="gender" value="female"  />
            Female
          </label>
          <ErrorMessage name="gender"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
         </div> */}


         <div className="input-group input-group-lg mt-5">
        <label htmlFor="category" className="input-group-text" name="category" id="inputGroup-sizing-lg">Choose a Category</label>
          <Field as="select" className="input-group-text" id="inputGroup-sizing-lg" name="category" >
          <option   value="null">-----</option>
          <option  value="men">MEN</option>
          <option  value="women">Women</option>
          <option  value="shoes">Shoes</option>
          <option  value="Other">Other</option>
          </Field>
          <ErrorMessage name="category"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
         </div>

        
         {/* <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="address" id="inputGroup-sizing-lg">Address</span>
        <Field type="text" className="form-control" name='address' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <ErrorMessage name="address"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div> */}


        {/* <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="password" id="inputGroup-sizing-lg">Password</span>
        <Field type="text" className="form-control" name='password' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <ErrorMessage name="password"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div>
         */}

        {/* <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="cpassword" id="inputGroup-sizing-lg">Confirm Password</span>
        <Field type="text" className="form-control" name='cpassword' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <ErrorMessage name="cpassword"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div> */}
        

          
         {/* Just For Image */}
        <div className="input-group input-group-lg mt-5">
        <label className="input-group-text" name="image" id="inputGroup-sizing-lg" htmlfor="image">Image</label>
        <input  className="input-group-text" id="inputGroup-sizing-lg" type="file" name="image" onChange={(e)=>{setFieldValue("image", e.currentTarget.files[0]);setImage(URL.createObjectURL(e.target.files[0]))}} />
        <br></br>
        <center>
        {
          image && (
            <h1>Image</h1>
          )
        }
        {image && (
        <div>
        <img src={image} alt="Preview" style={{ maxWidth: '50%', maxHeight: '50%' }} />
        </div>
        )}
        </center>

        {/* <input  ref={fileRef}  type="file" name="image" onChange={(e)=>setFieldValue("image", e.currentTarget.files[0])} />
        <button type='submit' onClick={()=>{fileRef.current.click()}}>Upload</button>
        { values.file && <Imagepreview key={values.email} file={values.file} /> } */}
        <ErrorMessage name="image"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
         </div>


        <br/>
        <br/>
      


        <button className="btn btn-success" type='submit'>Add</button>

      </Form>
      </center>
      </div>
    )}
    </Formik>
    <ToastContainer/>
  </> 
  )
}

export default Addproduct;

// {


//   let addtoastMsg = () => {
//     toast.success('Product has been Added', {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//       });
//   }

//   let [pname, setPname] = useState("");
//   let InputEvent = (e) => {
//     setPname(e.target.value);
//     console.log(e);
//     console.log(e.target.value);
//   }

//   let [description, setDescription] = useState("");
//   let InputEvent1 = (e) => {
//     setDescription(e.target.value);
//     console.log(e);
//     console.log(e.target.value);
//   }

//   let [price, setPrice] = useState("");
//   let InputEvent2 = (e) => {
//     setPrice(e.target.value);
//     console.log(e);
//     console.log(e.target.value);
//   };


//   let [category, setCategory] = useState("");
//   let handleCategory = (e) => {
//     setCategory(e.target.value);
//     console.log(e);
//     console.log(e.target.value);
//   };


  
//   let [image, setImage] = useState(null);
//   let handleimage = (e) => {
//        setImage(e.target.files[0])
//   }


// let navigate = useNavigate()
  

//   let onSubmit =async(e) => {
//     e.preventDefault();

//     let formdata = new FormData()

//     formdata.append("pname",pname)
//     formdata.append("description",description)
//     formdata.append("price",price)
//     formdata.append("category",category)
//     formdata.append("image",image)

//     let res =await fetch("http://localhost:3200/addproduct", {
//       method: "POST",
//       body: JSON.stringify({ pname,description,price,category,image}),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       let result = await res.json()
//       console.log("The Data Submitted is:",result)
//     alert("Form Has Benn Submitted");
//     navigate("/Product")
//      addtoastMsg()
//   }



//   return (
//     <>
//       <div style={{marginTop:"100px"}}>
//         <center>   
//         <form>
//      <div className="card m-5" style={{borderRadius:"15px",width:"400px",backgroundColor:"#f6f7f8"}}>
//   <div className="card-body">
//     <h3 className="card-title text-center">Add Product</h3>
    

//     <div className="input-group input-group-lg mt-5">
//   <span className="input-group-text" id="inputGroup-sizing-lg">Product Name</span>
//   <input type="text" className="form-control" name='pname' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={InputEvent} />
// </div>


// <div className="input-group input-group-lg mt-5">
//   <span className="input-group-text" id="inputGroup-sizing-lg">Description</span>
//   <input type="text" name='description' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={InputEvent1} />
// </div>


// <div className="input-group input-group-lg mt-5">
//   <span className="input-group-text" id="inputGroup-sizing-lg">Price</span>
//   <input type="text" name='price' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={InputEvent2}/>
// </div>



// <div className="input-group input-group-lg mt-5">
// <label className="input-group-text" id="inputGroup-sizing-lg" for="category">Choose a Category</label>
//           <select name="category" onChange={handleCategory}>
//           <option value="null">----</option>
//           <option value="men">Men</option>
//           <option value="women">Women</option>
//           <option value="shoes">shoes</option>
//           <option value="Other">Other</option>
//           </select>
// </div>

//           <br/>
//           <br/>

      


//     <button type="button" class="btn btn-success mt-5" style={{width:"250px"}} onClick={onSubmit}>Add</button>
//   </div>
// </div>
// </form> 
// </center>
//     </div>
//     </>
//   );
// }
