import * as Yup from 'yup' 

 let zyadavalidate = Yup.object({
    pname:Yup.string().min(3).max(30).required("The pname Should Be Between 3 To 20 Letters"),
    description:Yup.string().min(5).max(100).required("The Description Should be Between 5 to 30 letters"),
    price:Yup.number().min(500).max(5000).required("The Price Should Be Between 2 To 100 Letters"),
    image: Yup.mixed().required('An image is required')
    .test('fileSize', 'Image must be less than 1MB', (value) =>
      value ? value.size <= 1*1024*1024 : true
    )
    .test('fileType', 'Image must be a JPG, JPEG, or PNG', (value) =>
      value ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type) : true
    ),
    // email:Yup.string().email().required("The Email Must Be Provided"),
    colors:Yup.array().min(1).required("At Least Select one Color"),
    // gender:Yup.string().required("Gender Must Be Selected"),
    category:Yup.string().required("Category must be selected"),
    // address:Yup.string().min(5).max(30).required("Address must be provided"),
    // password:Yup.string().required("Password is requires").matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,"The password Contain letters,Alphabets,Special Characters and of Minimum lenght of 8"),
    // cpassword:Yup.string().required("").oneOf([Yup.ref("password"),null],"Password Don't macthed")
})


export {zyadavalidate}
