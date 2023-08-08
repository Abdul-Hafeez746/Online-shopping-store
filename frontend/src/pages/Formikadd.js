import React, { useRef } from 'react'
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { zyadavalidate } from './Zyadavalidate'

const Formikadd = () => {

  let navigate = useNavigate()
  let fileRef = useRef(null)

  return (
    <>
    <Formik 
    validationSchema={zyadavalidate}
    initialValues={{
        pname:"",  
        description:"",
        price:"",
        image:null,
        email:"",
        interests:[],
        gender:"",
        degree:"",
        address:"",
        password:"",
        cpassword:""}}
    onSubmit={ async(values)=>{
    console.log(values)
    let res = await Axios.post("http://localhost:3400/multer/createdata",values,{
      headers: {
        "Content-type": "multipart/form-data charset=UTF-8",
      }
    })
      navigate('/show')
    
    }}
    >

    {({values,setFieldValue}) => ( <Form>
      <hr></hr>
        <label htmlFor='pname'>P Name </label>
        <Field type='text' name='pname'/>
        <ErrorMessage name="pname"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        <br/>
        <br/>

        <label htmlfor="description">Description </label>
        <Field type="text" name="description" />
        <ErrorMessage name="description"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>

        <br/>
        <br/>

        <label htmlfor="price">Price </label>
        <Field type="number" name="price" />
        <ErrorMessage name="price"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>

        <br/>
        <br/>


        <label htmlfor="email">Email </label>
        <Field type="text" name="email" />
        <ErrorMessage name="email"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
         
        <br/>
        <br/>

        <label htmlFor="interests">Interests</label>
                <br/>
                <label>
                    <Field type="checkbox" name="interests" value="music"   />
                    Music
                </label>
                <label>
                    <Field type="checkbox" name="interests" value="sports"   />
                    Sports
                </label>
                <label>
                    <Field type="checkbox" name="interests" value="reading"  />
                    Reading
                </label>
        <ErrorMessage name="interests"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>
        
        <br/>
        <br/>

        <label htmlFor="gender">Gender </label>
          <label>
            <Field type="radio" name="gender" value="male"  />
            Male
          </label>
          <label>
            <Field type="radio" name="gender" value="female"  />
            Female
          </label>
          <ErrorMessage name="gender"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>

        <br/>
        <br/>

        <label for="degree">Choose a Category</label>
          <Field as="select" name="degree" >
          <option  value="null">-----</option>
          <option  value="bscs">BSCS</option>
          <option  value="mphil">MPhil</option>
          <option  value="PHD">PHD</option>
          <option  value="Other">Other</option>
          </Field>
          <ErrorMessage name="degree"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>

        
        <br/>
        <br/>

        <label for="address">Address: </label>
        <Field as="textarea" name="address"  />
        <ErrorMessage name="address"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>

        <br/>
        <br/>

        <label htmlfor="password">Password </label>
        <Field type="text" name="password"  />
        <ErrorMessage name="password"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>

        <br/>
        <br/>

        <label htmlfor="cpassword">Password </label>
        <Field type="text" name="cpassword"  />
        <ErrorMessage name="cpassword"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>

         <br/>
        <br/>

          
         {/* Just For Image */}
        <label htmlfor="image">Image </label>
        <input type="file" name="image" onChange={(e)=>setFieldValue("image", e.currentTarget.files[0])} />
        {/* <input  ref={fileRef}  type="file" name="image" onChange={(e)=>setFieldValue("image", e.currentTarget.files[0])} />
        <button type='submit' onClick={()=>{fileRef.current.click()}}>Upload</button>
        { values.file && <Imagepreview key={values.email} file={values.file} /> } */}
        <ErrorMessage name="image"> 
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
         </ErrorMessage>


        <br/>
        <br/>
      


        <button type='submit'>Click Me</button>

      </Form>
    )}
    </Formik>
    </>
  )
}

export default Formikadd
