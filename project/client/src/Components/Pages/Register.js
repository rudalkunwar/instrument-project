import React, { useState } from 'react'
import MainRegister from "../Global/Register"

export default function Register() {
  const [userType, setUserType] = useState("");
  const [title, settitle] = useState("")

  const userbutton = () => {
    setUserType("user");
    settitle("Registration for user")
    console.log(userType);
    console.log(title);
  }

  const vendorbutton = () => {
    setUserType("vendor");
    settitle("Registration for vendor")
    console.log(userType);
    console.log(title);
  }
  return (
    <div>
      <div class="flex  justify-center m-5 ">
        <div class="mx-5">
          <button onClick={userbutton} class="relative  inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
            <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">User Registration</span>
          </button>
        </div>

        <div class="mx-5">
          <button onClick={vendorbutton} class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
            <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Vendor Registration</span>
          </button>
        </div>


      </div>

      {userType == "" ? (<div class="bg-green-300 h-[90vh] ">
        <div class="flex  justify-center items-center h-full">
          <h2 class="font-semibold">Please select your types for registration</h2>
        </div>
      </div>) : (<MainRegister title={title}  userType={userType} />)}


    </div>
  )
}
