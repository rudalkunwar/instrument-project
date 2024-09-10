import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import { Link } from 'react-router-dom';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/allproductapi');
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchTerm, selectedCategory, minPrice, maxPrice, products]);

    const filterProducts = () => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory && selectedCategory !== 'All Categories') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (minPrice) {
            filtered = filtered.filter(product => product.price.regular_price >= minPrice);
        }

        if (maxPrice) {
            filtered = filtered.filter(product => product.price.regular_price <= maxPrice);
        }

        setFilteredProducts(filtered);
    };

    const addToCart = async (id, price) => {
        try {
            const response = await axios.post('/addcartapi', { id, price });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
    const flitertoggle = () => setHidden(!hidden);

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <div className="container mx-auto py-4 px-4">
                <div className="text-3xl font-bold mb-8 text-center">
                    <h2>Shop Products</h2>
                </div>

                <div className='flex justify-between w-10/12 m-auto mb-4'>
                    {/* <div>
                        <button onClick={flitertoggle} className="text-gray-300 text-2xl">
                            <i className="fa-solid fa-filter"></i>
                        </button>
                    </div> */}

                    <form className="flex items-center max-w-sm mx-auto">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                placeholder="Search product & Category"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </form>

                    <div>
                        <i className="fa-solid fa-sort text-gray-300 text-2xl"></i>
                    </div>
                </div>

                <div className={`container mx-auto p-4 w-11/12 m-auto ${hidden ? 'hidden' : 'block'} absolute left-20`}>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl text-gray-700 font-bold mb-4">Advanced Search</h2>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="search">
                                    Search
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="search"
                                    type="text"
                                    placeholder="Search for products"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                                    Category
                                </label>
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="category"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    <option>All Categories</option>
                                    <option>Electronics</option>
                                    <option>Fashion</option>
                                    <option>Home & Kitchen</option>
                                </select>
                            </div>

                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price-range">
                                    Price Range
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="min-price"
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                    />
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="max-price"
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mx-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={filterProducts}
                                >
                                    Search
                                </button>
                            </div>
                            <div>
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All Categories');
                                        setMinPrice('');
                                        setMaxPrice('');
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-11/12 m-auto p-4 my-2">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
                        <div className="relative">
                            <img
                                src={`http://localhost:5000/${product.image}`}
                                alt={product.product_name}
                                className="w-full h-48 object-cover"
                            />
                          
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.product_name}</h3>
                            <h4 className="text-gray-700 text-sm mb-4">{product.title}</h4>
                            <div className="flex flex-col space-y-2 mb-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-500 line-through text-sm">Rs {product.price.regular_price}</span>
                                    <span className="text-red-500 font-semibold text-lg">Rs {product.price.sales_price}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link to={`../productview/${product._id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
