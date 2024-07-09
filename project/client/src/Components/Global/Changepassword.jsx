import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import schemaValidate from "../../schemas/Confimpass";
import axios from "../api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';






const Changepassword=()=> {
    const email = sessionStorage.getItem("otpemail");
console.log(email);
    const navigate=useNavigate();

    
 
   useEffect(()=>{
    if(email==null)
    {
        
        navigate('/forgotpassword');
    }
    console.log(email);
   
   },)
    console.log("otpemail: " + email);

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues:{
            password: "",
            confirm_password: "",
        },
        validationSchema: schemaValidate,
        onSubmit: async (values) => {
            try {
        console.log("this is value"+values.password);

                const response = await axios.post('/changepasswordapi',{...values,email});
                console.log(response.data);
                setTimeout(()=>{
                    toast.success("Password has been Successfully Changed");
                },50);
               
                navigate('/');
            } catch (error) {
                console.log(error.response.data.message);
                toast.error(error.response.data.message);
            }
        }

    });

    return (
        <div>
            <ToastContainer />
            <section className="bg-gray-50 bg-slate-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Change your Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password" value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} name="confirm_password" id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    {errors.confirm_password && touched.confirm_password && <p className="text-red-600">{errors.confirm_password}</p>}
                                </div>

                                <button type="submit" name="submit" className="w-full text-white bg-blue-600 hover:bg-blue-500 rounded p-1 ">Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Changepassword;

