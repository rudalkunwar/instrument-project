import React, { useEffect, useState } from 'react';
import axios from '../api/api';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [hidden   , setHidden] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/allproductapi');
                setProducts(response.data.products);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const addToCart = async (id, price) => {
        try {
            const response = await axios.post('/addcartapi', { id, price });
            console.log(response.data);
            setProducts(response.data.allcart);
        } catch (error) {
            console.error(error);
        }
    };

    function flitertoggle(e){
   
        const filter = document.getElementById('advancesearch');
        filter.classList.toggle('hidden');
        //drop animation of div
    
      
      }
      
      
    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <div className="container mx-auto py-4 px-4">
                <div className="text-3xl font-bold mb-8 text-center">
                    <h2>Shop Products</h2>
                </div>

                <div className='flex justify-between w-1/2 m-auto'>

                    <div class=" ">
                        <button  class="" >
                        <i  id="filter" onClick={flitertoggle} class="fa-solid fa-filter text-gray-300 text-2xl "></i>
                        </button>
                    </div>

                    <form class="flex items-center max-w-sm mx-auto">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                        </div>
                        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </form>

                    <div>

                    <i class="fa-solid fa-sort text-gray-300 text-2xl"></i>

                    </div>
                </div>



                <div class="container mx-auto p-4  w-11/12 m-auto hidden absolute left-20"id="advancesearch">
                    <div class="bg-white p-4 rounded-lg shadow-lg">
                        <h2 class="text-2xl text-gray-700 font-bold mb-4">Advanced Search</h2>
                        <div class="flex flex-wrap -mx-3 mb-6">

                            <div class="w-full px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="search">
                                    Search
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="search" type="text" placeholder="Search for products" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">

                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="category">
                                    Category
                                </label>
                                <div class="relative">
                                    <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category">
                                        <option>All Categories</option>
                                        <option>Electronics</option>
                                        <option>Fashion</option>
                                        <option>Home & Kitchen</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6h12l-6 6z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price-range">
                                    Price Range
                                </label>
                                <div class="flex space-x-2">
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="min-price" type="number" placeholder="Min" />
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="max-price" type="number" placeholder="Max" />
                                </div>
                            </div>
                        </div>
                        <div className='flex '>
                        <div class="mx-4">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Search
                            </button>
                        </div>

                        <div class="">
                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Reset
                            </button>
                        </div>
                        </div>
                       
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4  w-11/12 m-auto p-4 my-2">
                    {products.map((product, index) => (
                        <div key={index} className="border rounded-lg p-6 bg-white shadow-md flex flex-col ">
                            <div className="w-full h-20 flex justify-center items-center mb-4">
                                <img
                                    src={`http://localhost:5000/${product.image}`}
                                    alt={product.product_name}
                                    className="object-cover h-5/6 rounded"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{product.product_name}</h3>
                            <div class="h-20 overflow-hidden">
                                <h1 className="text-gray-600 mt-2">{product.title}</h1>
                            </div>
                            <div className="flex items-center mt-4">
                                <span className="text-gray-700 font-semibold">Rs {product.price.regular_price}</span>
                                <button
                                    onClick={() => addToCart(product._id, product.price.sales_price)}
                                    className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
