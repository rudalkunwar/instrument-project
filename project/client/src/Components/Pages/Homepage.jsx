import React, { useState, useEffect } from "react";
import axios from '../api/api';
import Header from '../partials/Header';
import Slider from './Slider';
import ProductList from './ProductList';
import Footer from "../partials/Footer";
import Features from "./Features ";

const Homepage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("allproductapi");
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="flex w-auto">
            <div className="w-screen">
                <div className="bg-blue-50 h-screen">
                    <Header />
                    <h2 className="text-3xl font-bold text-center mt-5 text-gray-600">Welcome to our music world!</h2>
                    <div className="flex h-3/6 justify-center">
                        <Slider />
                        <div className="textbox w-7/12 my-10">
                            <p className="px-20 py-10 text-xl">
                                "Welcome to our instrument sanctuary, where passion and precision harmonize..."
                            </p>
                            <div className="mx-20">
                                <a className="bg-green-700 px-2 py-1 rounded font-semibold text-white" href="#">Shop Now</a>
                            </div>
                        </div>
                    </div>
                    <Features />
                    <div className="container mx-auto text-2xl text-center font-bold text-gray-800 mb-8">
                        <h2 className="bg-gray-900 text-gray-200 px-5 py-1 rounded">Latest Products</h2>
                    </div>
                    <ProductList products={products} />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
