import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin, userLogout } from "../state/action/SessionData";
import Navbar from "../Navbar/VendorNavbar";
import { ToastContainer, toast } from 'react-toastify';
import Vendorheaders from './Vendorheaders';



export default function Index() {
  const userData = useSelector(state => state.authenticate);
  const navigate = useNavigate();

  if (userData.isLoggedin == false) {
    navigate('/login');
  }
  console.log(userData);

  return (
    <div>
      <ToastContainer />
      <Vendorheaders/>

      <div class=" mx-auto m bg-green-400">
      
        <div class="flex w-auto">
          
         
          <div class="md:col-span-2 w-screen ml-12">
          <div class="bg-white p-4 rounded mt-9">
              <h2 class="text-lg font-semibold mb-4">Welcome, Vendor!</h2>

              <p>This is the admin dashboard for vendors. You can manage your products, orders, and customers from here.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-4">

              <div class="relative bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-4">
                  <h3 class="text-lg font-semibold mb-2">Total Sales</h3>
                  <p class="text-gray-600 text-sm">Your total sales for this month:</p>
                  <p class="text-gray-800 text-xl font-bold mt-2">$5,000</p>
                </div>
              </div>


              <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold mb-2">Total Customers</h3>
                <p class="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p class="text-gray-800 text-xl font-bold mt-2">500</p>
              </div>



            </div>


            
          </div>
        </div>
      </div>
    </div>
  )
}
