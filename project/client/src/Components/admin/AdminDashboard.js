import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalOrders: 0,
    totalProducts: 0,
    latestProducts: [],
    latestOrders: [],
    latestUsers: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [
          usersResponse,
          vendorsResponse,
          ordersResponse,
          productsResponse,
          latestProductsResponse,
          latestOrdersResponse,
          latestUsersResponse
        ] = await Promise.all([
          axios.get('/totalusers', {
            headers: { 'x-access-token': token }
          }),
          axios.get('/totalvendors', {
            headers: { 'x-access-token': token }
          }),
          axios.get('/totalorders', {
            headers: { 'x-access-token': token }
          }),
          axios.get('/totalproducts', {
            headers: { 'x-access-token': token }
          }),
          axios.get('/latestproducts', {
            headers: { 'x-access-token': token }
          }),
          axios.get('/latestorders', {
            headers: { 'x-access-token': token }
          }),
          axios.get('/latestusers', {
            headers: { 'x-access-token': token }
          })
        ]);
        console.log(latestProductsResponse);
        console.log(latestOrdersResponse);
        console.log(latestUsersResponse);
        console.log(usersResponse);
        console.log(vendorsResponse);
        console.log(ordersResponse);
        console.log(productsResponse);


        setData({
          totalUsers: usersResponse.data.totalUsers,
          totalVendors: vendorsResponse.data.totalVendors,
          totalOrders: ordersResponse.data.totalOrders,
          totalProducts: productsResponse.data.totalProducts,
          latestProducts: latestProductsResponse.data.latestProducts,
          latestOrders: latestOrdersResponse.data.latestOrders,
          latestUsers: latestUsersResponse.data.latestUsers
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="text-3xl font-bold text-gray-900">{data.totalUsers}</p>
          </div>
          <i className="fas fa-users fa-2x text-blue-500"></i>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Vendors</h2>
            <p className="text-3xl font-bold text-gray-900">{data.totalVendors}</p>
          </div>
          <i className="fas fa-user-tie fa-2x text-green-500"></i>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
            <p className="text-3xl font-bold text-gray-900">{data.totalOrders}</p>
          </div>
          <i className="fas fa-box fa-2x text-orange-500"></i>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
            <p className="text-3xl font-bold text-gray-900">{data.totalProducts}</p>
          </div>
          <i className="fas fa-cube fa-2x text-red-500"></i>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Products</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <ul className="list-disc pl-6 space-y-2">
            {data.latestProducts.map((product) => (
              <li key={product._id} className="text-gray-700 flex items-center justify-between">
                <span>{product.product_name}</span>
                <span className="text-sm text-gray-500">{new Date(product.created_at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Orders</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <ul className="list-disc pl-6 space-y-2">
            {data.latestOrders.map((order) => (
              <li key={order._id} className="text-gray-700 flex items-center justify-between">
                <span>Order #{order._id}</span>
                <span className="text-sm text-gray-500">Rs {order.totalAmount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Users</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <ul className="list-disc pl-6 space-y-2">
            {data.latestUsers.map((user) => (
              <li key={user._id} className="text-gray-700 flex items-center justify-between">
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">{new Date(user.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
