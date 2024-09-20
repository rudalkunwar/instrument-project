import React, { useEffect, useState } from 'react';
import axios from '../api/api'; // Adjust the path if needed
import { ToastContainer, toast } from 'react-toastify';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  let count = (currentPage - 1) * itemsPerPage + 1;

  // Fetch orders from API
  const getOrders = async () => {
    try {
      const response = await axios.get('/fetchallorderapi', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      console.log(response);
      setOrders(response.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Update order status (Pending, Process, Delivery)
  const updateOrderStatus = async (id, status) => {
    try {
      await axios.post(`/adminorderapi/${id}`, { status }, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      toast.success(`Order status updated to ${status}`);
      getOrders(); // Refresh orders
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  // Update payment status for COD (Paid, Unpaid)
  const updatePaymentStatus = async (id, paymentStatus) => {
    try {
      await axios.post(`/adminorderapi/${id}`, { paymentStatus }, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      toast.success(`Payment status updated to ${paymentStatus}`);
      getOrders(); // Refresh orders
    } catch (err) {
      console.error(err);
      toast.error('Failed to update payment status');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.shippingDetails.name.toLowerCase().includes(search.toLowerCase()) ||
    order.shippingDetails.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (orders.length === 0) return (<div>Loading...</div>);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="text-3xl mb-8 font-bold ml-10 text-gray-800">
        <h2>Order Management</h2>
      </div>
      <div className="flex justify-between">
        <div className="mb-4 w-10/12 flex ml-12 justify-between items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded w-full max-w-md"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-11/12 m-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-700">S.N</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Customer Name</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Email</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Total Amount</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Order Status</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Payment Method</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Payment Status</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Payment Action</th>
              <th className="py-3 px-4 border-b text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-center">{count++}</td>
                <td className="py-3 px-4 border-b">{order.shippingDetails.name}</td>
                <td className="py-3 px-4 border-b">{order.shippingDetails.email}</td>
                <td className="py-3 px-4 border-b">${order.totalAmount}</td>
                <td className="py-3 px-4 border-b">{order.orderStatus}</td>
                <td className="py-3 px-4 border-b">{order.paymentMethod}</td>
                <td className="py-3 px-4 border-b">{order.paymentStatus}</td>
                <td className="py-3 px-4 border-b text-center">
                  {order.paymentMethod === 'cod' && (
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => updatePaymentStatus(order._id, 'Paid')}
                        className={`px-2 py-1 text-white rounded ${order.paymentStatus === 'Paid' ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'}`}
                        disabled={order.paymentStatus === 'Paid'}
                      >
                        Paid
                      </button>
                      <button
                        onClick={() => updatePaymentStatus(order._id, 'unpaid')}
                        className={`px-2 py-1 text-white rounded ${order.paymentStatus === 'Pending' ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500'}`}
                        disabled={order.paymentStatus === 'unpaid'}
                      >
                        Unpaid
                      </button>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Pending')}
                      className={`px-2 py-1 text-white rounded ${order.orderStatus === 'Pending' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`}
                      disabled={order.orderStatus === 'Pending'}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Process')}
                      className={`px-2 py-1 text-white rounded ${order.orderStatus === 'Process' ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500'}`}
                      disabled={order.orderStatus === 'Process'}
                    >
                      Process
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Delivery')}
                      className={`px-2 py-1 text-white rounded ${order.orderStatus === 'Delivery' ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'}`}
                      disabled={order.orderStatus === 'Delivery'}
                    >
                      Delivery
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
            className={`px-3 py-1 mx-1 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'text-blue-600'}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 mx-1 ${currentPage === Math.ceil(filteredOrders.length / itemsPerPage) ? 'cursor-not-allowed text-gray-400' : 'text-blue-600'}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
