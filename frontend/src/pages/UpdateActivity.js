import React from "react";
import { useNavigate ,useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import swal from 'sweetalert';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Axios from 'axios'
import { zyadavalidate } from './Productvalidate'

function UpdateActivity()  {
  let auth = JSON.parse(localStorage.getItem("user"));
  let token = auth.token;

  let navigate = useNavigate()
  let params = useParams()

  let sweetMsg = () => {
    swal({
      title: "Updated",
      text: "Prdouct Data updated in Database Successsfully",
      icon: "success",
    });
  }

  let [image,setImage] = useState("")
  let [initialValues,setInitialValues]=useState({
    pname:"",  
    description:"",
    price:"",
    image:"",
    // email:"",
    colors:[],
    // gender:"",
    category:"",
    // address:"",
    // password:"",
    // cpassword:""
  })


    useEffect(() => {
      const fetchData = async () => {
        const result = await Axios.get(`http://localhost:3200/user/Updateactivity/${params.id}`,{
          headers: {
            "Content-type": "multipart/form-data charset=UTF-8",
            'Authorization': `${token}`
          }
        });
        console.log(`the data get by id`,result)
        setInitialValues(result.data);  // just without checkbox write this line
      
      };
      fetchData();
    }, [params.id]);


  return (
    <>
    <Formik 
    validationSchema={zyadavalidate}
    initialValues={initialValues}
    onSubmit={ async(values)=>{
    console.log(`the values are`,values)
    let res = await Axios.put(`http://localhost:3200/user/Updateactivity/${params.id}`,values,{
      headers: {
        "Content-type": "multipart/form-data charset=UTF-8",
        'Authorization': `${token}`
      }
    })
    console.log(res)
      navigate('/Activityshow')
      sweetMsg()
    }}
    >


    

{({values,setFieldValue}) => (  
      
      <div className="container" style={{marginTop:"100px",width:"800px"}}>
      <center>   
       <Form>
      <hr></hr>
      <h1>Update Product</h1>
      <hr></hr>
        <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="pname" id="inputGroup-sizing-lg">Product Name</span>
        <Field type="text" className="form-control" name='pname' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <span  className="input-group-text" id="inputGroup-sizing-lg"  >old value</span>
        <Field  value={initialValues.pname} />
        <ErrorMessage name="pname"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div>


        <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="description" id="inputGroup-sizing-lg">Description</span>
        <Field type="text" className="form-control" name='description' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  /> 
        <span  className="input-group-text" id="inputGroup-sizing-lg"  >old value</span>
        <Field  value={initialValues.description}  />
        <ErrorMessage name="description"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div>


        <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="price" id="inputGroup-sizing-lg">Price</span>
        <Field type="text" className="form-control" name='price' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  />
        <span  className="input-group-text" id="inputGroup-sizing-lg"  >old value</span>
        <Field  value={initialValues.price}  />
        <ErrorMessage name="price"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div>



        {/* <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="email" id="inputGroup-sizing-lg">Email</span>
        <Field type="text" className="form-control" name='email' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"   />
        <span  className="input-group-text" id="inputGroup-sizing-lg"  >old value</span>
        <Field  value={initialValues.email}  />
        <ErrorMessage name="email"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div> */}
    

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
                    <Field type="checkbox" name="colors" value="blue" />
                    Blue
                </label>
        <ErrorMessage name="colors"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
         </div>
        
        
        
         {/* <div className="input-group input-group-lg mt-5">
        <label htmlFor="gender" className="input-group-text" name="gender" id="inputGroup-sizing-lg">Gender </label>
          <label className="input-group-text" name="colors" id="inputGroup-sizing-lg">
            <Field type="radio" name="gender" value="male"   />
            Male
          </label>
          <label className="input-group-text" name="colors" id="inputGroup-sizing-lg">
            <Field type="radio" name="gender" value="female" />
            Female
          </label>
          <ErrorMessage name="gender"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
         </div> */}


         <div className="input-group input-group-lg mt-5">
        <label htmlFor="category" className="input-group-text" name="category" id="inputGroup-sizing-lg">Choose a Category</label>
          <Field as="select" className="input-group-text" id="inputGroup-sizing-lg" name="category"  >
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

{/*         
         <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="address" id="inputGroup-sizing-lg">Address</span>
        <Field type="text" className="form-control" name='address' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
        <span  className="input-group-text" id="inputGroup-sizing-lg"  >old value</span>
        <Field  value={initialValues.address}  />
        <ErrorMessage name="address"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div> */}


        {/* <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="password" id="inputGroup-sizing-lg">Password</span>
        <Field type="password" className="form-control" name='password' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"    />
        <span  className="input-group-text" id="inputGroup-sizing-lg"  >old value</span>
        <Field  value={initialValues.password} />
        <ErrorMessage name="password"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div> */}
        

        {/* <div className="input-group input-group-lg mt-5">
        <span className="input-group-text" name="cpassword" id="inputGroup-sizing-lg">Confirm Password</span>
        <Field type="password" className="form-control" name='cpassword' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
        <ErrorMessage name="cpassword"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        </div> */}
        

          
         {/* Just For Image */}
        <div className="input-group input-group-lg mt-5">
        <label className="input-group-text" name="image" id="inputGroup-sizing-lg" htmlfor="image">Image</label>
        <input  className="input-group-text" id="inputGroup-sizing-lg" type="file" name="image" onChange={(e)=>{setFieldValue("image", e.currentTarget.files[0]);setImage(URL.createObjectURL(e.target.files[0]))}} />
        <center>Old Image<td><img src={`http://localhost:3200/uploads/${initialValues.image}`} width={100} height={100} alt="uploading error" /></td></center>
         
        {image && (
          <h1>New Image</h1>
        )}
        {image && (
        <div>
        <img src={image} alt="Preview" style={{ maxWidth: '70%', maxHeight: '70%' }} />
        </div>
        )}
        
        {/* <input  ref={fileRef}  type="file" name="image" onChange={(e)=>setFieldValue("image", e.currentTarget.files[0])} />
        <button type='submit' onClick={()=>{fileRef.current.click()}}>Upload</button>
        { values.file && <Imagepreview key={values.email} file={values.file} /> } */}
        <ErrorMessage name="image"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
         </div>


        <br/>
        <br/>
      


        <button className="btn btn-success" type='submit'>Save</button>

      </Form>
      </center>
      </div>
    )}
    </Formik>
    </>
  )
}


export default UpdateActivity;