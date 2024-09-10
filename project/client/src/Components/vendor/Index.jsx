import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { ToastContainer } from 'react-toastify';
import Vendorheaders from './Vendorheaders';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// Mock Data for Orders and Users
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Orders Over Time',
      data: [120, 150, 180, 200, 220, 250, 270],
      fill: false,
      borderColor: '#4F46E5', // Indigo color for the line
      backgroundColor: '#E0E7FF', // Light indigo for fill
      tension: 0.2,
      borderWidth: 2,
    },
  ],
};

const pieData = {
  labels: ['Active Users', 'Inactive Users', 'New Users'],
  datasets: [
    {
      data: [400, 150, 50],
      backgroundColor: ['#4F46E5', '#3B82F6', '#10B981'],
    },
  ],
};

export default function Index() {
  const userData = useSelector(state => state.authenticate);
  const navigate = useNavigate();
  const [data, setData] = useState([]);


const fetchData = async () => {
  try{
    const response=await axios.get('/dashboard',{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    });
    console.log(response);
    setData(response.data);
    
  }catch(error){
    console.log(error);
  }
}

useEffect(() => {
  fetchData();
}, []);

  if (!userData.isLoggedin) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-200 ">
      <ToastContainer />
      <Vendorheaders />

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome, {data.username}!</h2>
          <h1 className="text-gray-600 mb-4 text-base leading-relaxed">
            This is the admin dashboard for vendors. You can manage your products, orders, and customers from here.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Sales Card */}
            

            {/* Total Customers Card */}
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-800 mb-1">Total Product</h3>
                <h1 className="text-gray-500 text-sm">Your total listed product</h1>
                <h1 className="text-gray-800 text-xl font-semibold mt-1">{data.totalproduct}</h1>
              </div>
              <div className="bg-orange-100 p-4 rounded-full">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </div>
            </div>

            {/* Pending Orders Card */}
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-800 mb-1">Total Orders</h3>
                <h1 className="text-gray-500 text-sm">Total order completed:</h1>
                <h1 className="text-gray-800 text-xl font-semibold mt-1">{data.totalorder}</h1>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Orders Overview</h3>
              <Line data={lineData} options={{ 
                responsive: true, 
                plugins: { 
                  legend: { display: false }, 
                  tooltip: { callbacks: { label: (tooltipItem) => `$${tooltipItem.raw}` } }
                }
              }} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">User Statistics</h3>
              <Pie data={pieData} options={{ 
                responsive: true, 
                plugins: { 
                  legend: { position: 'top' }, 
                  tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` } }
                }
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
