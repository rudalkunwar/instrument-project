import React, { useState, useEffect } from 'react';
import "../Assets/css/Loader.css";
import { useFormik } from 'formik';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const OtpEnter = () => {
   
  
   
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const navigate = useNavigate();
    const flag = sessionStorage.getItem("otp"); // Change from sessionStorage.getItems to sessionStorage.getItem
    const otpemail = sessionStorage.getItem("otpemail");
      
  
    

    useEffect(() => {
        if(flag==null)
        {
            navigate('/forgotpassword');
        }
        

       
       
        const countdown = () => {
            setTimeout(() => {
                if (timer > 0) {
                    setTimer(timer - 1);
                }
            },1000);
        };

        if (isTimerActive && timer > 0) {
            countdown();
        }

        if (timer === 0) {
            toast.warn("OTP has been expired,please resend otp!");
            setIsTimerActive(false);

           
        }
    }, [timer, isTimerActive]);

    const handleResendCode = () => {
    
        setIsTimerActive(true);
        setTimer(60);
        getData();
       
        
    };

    const getData = async () => {
        setIsLoading(true);
        try {
            setIsLoading(true);

            console.log(sessionStorage.getItem("otp")+"this is old otp");
          
            console.log("Email:", otpemail); 
            const values={email:otpemail}
            const response = await axios.post('/forgotpasswordapi',values);
            setTimeout(()=>{toast.success("Email has been send to your email")},50);
            console.log(response.data.message);
            sessionStorage.setItem("otp", response.data.code);
            console.log(sessionStorage.getItem("otp")+"This is new otp");
            
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }


    const verifyCode=(e)=>{
        e.preventDefault();
     
    

            const fieldcode=e.target.fieldcode.value;
            const otpcode=sessionStorage.getItem("otp");   
            if(fieldcode!=otpcode)
            {
                const errors="invalid otp,please resend code";
               toast.error("Invalid otp!");
            }
            else{
                console.log("otp successfully matched");
                sessionStorage.removeItem("otpemail");
                sessionStorage.setItem("otpemail",otpemail);
                console.log(  sessionStorage.getItem("otpemail",otpemail));
             
                navigate('/changepassword');
            }
            
    
    

    
    }


    
    return (
        <div>
            <ToastContainer/>
            <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-24">
                <div className="flex flex-col space-y-2 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Confirm OTP</h2>
                    <p className="text-md md:text-xl">Enter the OTP we just sent you.</p>
                  
                </div>
                <div className="flex flex-col max-w-md m-auto space-y-5 ">
                    <form onSubmit={verifyCode}>
                        <input
                            type="text"
                            placeholder="OTP"
                            name="fieldcode"
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                        />
                        {isLoading ? (<div  className="loader m-auto my-5"></div>) : (
                            <button type="submit"  name="submit" className="bg-black flex m-auto my-5 text-white  px-2 rounded text-semibold hover:bg-gray-700">
                                Confirm
                            </button>
                        )}

                        
                    </form>

                    
                    {isTimerActive ? (
                        <p className="text-sm text-center ">Code will expired in: {timer} seconds</p>
                    ) : (
                        <button type="button" className="text-sm w-28 bg-blue-600 text-white font-semi bold px-1 m-auto rounded hover:bg-blue-400" onClick={handleResendCode}>Resend Code</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OtpEnter;
