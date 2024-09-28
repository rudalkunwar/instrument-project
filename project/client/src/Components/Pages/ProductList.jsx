import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
    return (
        <div className="container mx-auto mt-10 px-4 py-8">
            <div className="latest-products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {products?.slice(0, 5).map((product, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
                        <div className="relative">
                            <img
                                src={`http://localhost:5000/${product.image}`}
                                alt={product.product_name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
                                New
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.product_name}</h3>
                            <h4 className="text-gray-700 text-sm mb-4">{product.title}</h4>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500 line-through text-sm">Rs {product.price.regular_price}</span>
                                <span className="text-red-500 font-semibold text-lg">Rs {product.price.sales_price}</span>
                            </div>
                            <Link to={`productview/${product._id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4 block text-center">
                                View Product
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
