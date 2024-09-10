import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  let count = (currentPage - 1) * itemsPerPage + 1;

  const getProducts = async () => {
    try {
      const response = await axios.get('/fetchproductbyvendorapi', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (products.length === 0) return (<div>Loading...</div>);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer/>
      <div className="text-3xl  mb-8 font-bold text-gray-800">
        <h2>Product Details</h2>
      </div>
     <div class="flex justify-between">
     <div className="mb-4 w-10/12 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by product name or category"
          value={search}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full max-w-md"
        />
      </div>

      <div>
        <Link to="../addproduct" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Product</Link>
      </div>
     </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-700">S.N</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Product Id</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Product Name</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Regular Price</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Sales Price</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Product Stock</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Product Category</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Description</th>
              <th className="py-3 px-4 border-b text-left text-gray-700">Image</th>
              <th className="py-3 px-4 border-b text-center text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-center">{count++}</td>
                  <td className="py-3 px-4 border-b">{product._id}</td>
                  <td className="py-3 px-4 border-b">{product.product_name}</td>
                  <td className="py-3 px-4 border-b">{product.price.regular_price}</td>
                  <td className="py-3 px-4 border-b">{product.price.sales_price}</td>
                  <td className="py-3 px-4 border-b">{product.stock}</td>
                  <td className="py-3 px-4 border-b">{product.category}</td>
                  <td className="py-3 px-4 border-b">{product.description}</td>
                  <td className="py-3 px-4 border-b"><img src={`http://localhost:5000/${product.image}`} alt="product" className="w-20 h-20 object-cover rounded-lg" /></td>
                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex justify-center items-center space-x-4">
                      <i className="fa-solid fa-pen-to-square text-blue-600 text-xl cursor-pointer"></i>
                      <i className="fa-solid fa-trash text-red-600 text-xl cursor-pointer"></i>
                      <i className="fa-solid fa-eye text-gray-500 text-xl cursor-pointer"></i>
                    </div>
                  </td>
                </tr>
              ))
            }
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
          {
            Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))
          }
          <button
            className={`px-3 py-1 mx-1 ${currentPage === Math.ceil(filteredProducts.length / itemsPerPage) ? 'cursor-not-allowed text-gray-400' : 'text-blue-600'}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
