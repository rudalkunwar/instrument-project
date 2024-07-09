import React, { useState, useEffect } from "react";
import UserNavbar from "../Navbar/UserNavbar";
import '../Assets/css/Index.css';
import image1 from "../Assets/image1.png";
import image2 from "../Assets/image2.png";
import image3 from "../Assets/image3.png";
import { useDispatch, useSelector } from "react-redux";
import axios from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addcart } from "../features/Addtocart"; // Ensure the action name is correct
import { useNavigate} from "react-router-dom";

const IndexLoggedin = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [products, setProducts] = useState([]);

    const reduxdata = useSelector(state => state.authenticate);
  
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get("allproductapi");
            setProducts(response.data.products);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setSlides(document.querySelectorAll('.slide'));
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 3000);
        return () => clearInterval(slideInterval);
    }, [slides]);

    useEffect(() => {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentSlide ? 1 : 0;
        });
    }, [currentSlide, slides]);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    const addToCart =async (product_id,) => {
        const quantity=1;
        const cartItem = {  product_id,quantity};
        
        try{
            const response = await axios.post(
                '/addcartapi',
                cartItem,
                {
                    headers: {
                       
                        'x-access-token': localStorage.getItem('token'),
                    },
                }
            );
            console.log(response);
           
            toast.success(response.data.message);
            Navigate('addtocart')
        }catch(error)
        {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

   

    return (
        <div className="flex w-auto">
            <ToastContainer />
            <div>
                <UserNavbar />
            </div>

            <div className="w-screen ml-12">
                <div className="bg-blue-50 h-screen">
                    <div className="flex justify-between text-center mx-20 items-center">
                        <div className="text-green-600 text-2xl my-2 font-bold">Logo</div>
                        <div className="text-2xl font-bold">
                            <h2>Nepal Instrument</h2>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-black text-2xl btn-hover"><ion-icon name="notifications-outline"></ion-icon></a>
                            <a href="#" className="text-white text-center text-xl bg-red-600 btn-hover px-2 rounded-lg">Hotline<ion-icon name="call-outline"></ion-icon></a>
                        </div>
                        <div className="flex space-x-5">
                            <h2 className="text-xl font-bold text-purple-600">Welcome!<span className="text-blue-700 font-semibold"> {reduxdata.userInfo.name}</span></h2>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-center mt-5 text-gray-600">Welcome to our music world!</h2>
                    </div>

                    <div className="flex h-3/6 justify-center">
                        <div className="slide-container w-4/12 h-76 my-10">
                            <div className="flex slider">
                                <div className="slide slide1"><img src={image1} alt="Slide 1" /></div>
                                <div className="slide slide2"><img src={image2} alt="Slide 2" /></div>
                                <div className="slide slide3"><img src={image3} alt="Slide 3" /></div>
                            </div>
                        </div>

                        <div className="textbox w-7/12 my-10">
                            <div>
                                <p className="px-20 py-10 text-xl">
                                    "Welcome to our instrument sanctuary, where passion and precision harmonize. Explore our curated collection, each instrument a testament to craftsmanship and musical expression. From classic melodies to modern tunes, discover the soulful resonance waiting to be unlocked in every finely crafted piece."
                                </p>
                            </div>
                            <div className="mx-20">
                                <a className="bg-green-700 px-2 py-1 rounded font-semibold text-white" href="#">Shop Now</a>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="border rounded-lg p-6 shadow-md bg-green-200">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2v-2a2 2 0 0 0-2-2H6zm1 2h8v8H7V4zm8 10v2H5v-2h10zM8 8H6v6h2V8z" clipRule="evenodd" />
                                    </svg>
                                    Free Delivery
                                </h3>
                                <h1 className="text-gray-600 mt-2">Get free delivery on all orders above $50. We ensure timely and secure delivery of your instruments.</h1>
                            </div>

                            <div className="border rounded-lg p-6 shadow-md bg-yellow-200">
                                <h3 className="text-lg font-semibold text-gray-800">Genuine Products</h3>
                                <h1 className="text-gray-600 mt-2">We guarantee authentic and high-quality instruments sourced directly from trusted manufacturers.</h1>
                            </div>

                            <div className="border rounded-lg p-6 shadow-md bg-purple-200">
                                <h3 className="text-lg font-semibold text-gray-800">Huge Saving</h3>
                                <h1 className="text-gray-600 mt-2">Enjoy exclusive discounts and offers on a wide range of instruments. Save big on your purchases!</h1>
                            </div>

                            <div className="border rounded-lg p-6 shadow-md bg-blue-200">
                                <h3 className="text-lg font-semibold text-gray-800">Easy Return</h3>
                                <h1 className="text-gray-600 font-normal mt-2">Not satisfied with your purchase? No worries! We offer hassle-free returns and refunds within 30 days.</h1>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto mt-10 px-4 py-8">
                        <div className="feature_product grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product, index) => (
                                <div key={index} className="border rounded-lg p-6 bg-white shadow-md">
                                    <div className="w-full h-40 p-3 m-auto">
                                        <img src={`http://localhost:5000/${product.image}`} alt={product.product_name} className="w-5/12 h-40 m-auto object-cover mb-4" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{product.product_name}</h3>
                                    <h1 className="text-gray-600 mt-2">{product.title}</h1>
                                    <div className="flex items-center mt-4">
                                        <span className="text-gray-700 font-semibold">Rs {product.price.regular_price}</span>
                                        <button onClick={() => addToCart(product._id,product.price.sales_price)} className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <footer className="py-12 bg-gray-900 text-white">
                        <div className="container mx-auto">
                            <div className="flex justify-around items-center mb-8">
                                <div className="flex items-center">
                                    <img src="company_logo.png" alt="Company Logo" className="h-12 mr-4" />
                                    <p className="text-lg">Instrument Nepal - Your Destination for Quality Instruments</p>
                                </div>

                                <ul className="grid grid-cols-3 gap-4">
                                    <li><a href="#" className="hover:text-gray-400">Home</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Store</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Order</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Payment</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Profile</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Notification</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Message</a></li>
                                    <li><a href="#" className="hover:text-gray-400">About</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Help</a></li>
                                </ul>
                            </div>

                            <div>&copy; 2024 Instrument Nepal. All rights reserved.</div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default IndexLoggedin;
