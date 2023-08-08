import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage} from 'formik'
import Axios from 'axios'
import { zyadavalidate } from './Productvalidate'
import { useState } from "react";

function Activity() {
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

  return (
    <>
    <Formik
  validationSchema={zyadavalidate}
  initialValues={{
    pname: "",
    description: "",
    price: "",
    image: null,
    colors: [],
    category: "",
  }}
  onSubmit={async (values) => {
    try {
      const formData = new FormData();
      formData.append("pname", values.pname);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      values.colors.forEach((color) => {
        formData.append("colors", color);
      });
      formData.append("image", values.image);

      const res = await Axios.post("http://localhost:3200/user/addactivity", formData, {
        headers: {
          'Authorization': `${token}`
        }
      });

      console.log(res);
      navigate('/Activityshow');
      addtoastMsg();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }}
>
    {({values,setFieldValue}) => (  
      
      <div className="container" style={{marginTop:"100px",width:"800px"}}>
      <center>   
      
       <Form>
      <hr></hr>
      <h1>Current User Can Add its Own Product</h1>
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
        {/* <input  ref={fileRef}  type="file" name="image" onChange={(e)=>setFieldValue("image", e.currentTarget.files[0])} />
        <button type='submit' onClick={()=>{fileRef.current.click()}}>Upload</button>
        { values.file && <Imagepreview key={values.email} file={values.file} /> } */}
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
  </> 
  )
}

export default Activity;


