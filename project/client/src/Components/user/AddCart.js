import React, { useEffect, useState } from 'react'
import axios from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, productFetch } from '../features/Addtocart';
import '../Assets/css/cartloader.css'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function AddCart() {
  const [count, setCount] = useState(null);
  const [price, setprice] = useState([null]);
  const [quantity, setquantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get cart items from store
  const { success, cartItems, message } = useSelector(state => state.cart);
  console.log(cartItems);

  //dispatch cart fetch function to the store before page load
  useEffect(() => {

    dispatch(productFetch());
  }, [dispatch]);


  //if there is any change in message then show toast message

  useEffect(() => {
    if (message) {

      dispatch(productFetch());
    }
  }
    , [message]);






  //calculate total and know how many items are in cart
  useEffect(() => {
    if (success === "completed") {
      let total = 0;
      let counter = 0;
      cartItems.allcart.forEach(cart => {
        total += cart.quantity * cart.product.price.sales_price;
        counter++;
      });
      setprice(total);
      setCount(counter);
    }
  }, [success, cartItems]);


  //delete cart item

  const findcartid = (id) => {
    dispatch(deleteCart(id));
    toast.success("Item removed from cart");


  }

  //get user name

  const sessiondata = useSelector(state => state.authenticate);
  let slug = "";
  const name = sessiondata.userInfo.name;

  if (name != null) {

    slug = name.replace(" ", "-");
  }

  const addquantity = async (id) => {
    console.log("this is id", id);
    const q = cartItems.allcart.find(cart => cart._id === id);
    let increasequantity = q.quantity;
    increasequantity++;

    const response = await axios.put(`/increasequantity/${id}`, {
      cart_id: id,
      quantity: increasequantity,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    });
    setquantity(response.data.cartData.quantity);
    console.log(response.data);
    toast.success(response.data.message);



  }

  useEffect(() => {
    if (quantity) {
      dispatch(productFetch());
    }
  }, [quantity]);

  const decreasequantity = async (id) => {
    const q = cartItems.allcart.find(cart => cart._id === id);
    let decreasequantity = q.quantity;
    if (decreasequantity > 1) {
      decreasequantity--;

      const response = await axios.put(`/decreasequantity/${id}`, {
        cart_id: id,
        quantity: decreasequantity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });

      setquantity(decreasequantity);
      console.log("decrease quantity", decreasequantity);
    } else {
      toast.error("Quantity can not be less than 1");
    }


  }


  const handleCheckout = () => {
    if (cartItems.length !== 0) {
      toast.dismiss();
      navigate('../checkout');
    } else {
      toast.dismiss();
      toast.error("Sorry! Cart is empty");
    }
  };



  return (
    <div class=" bg-gray-800 h-screen">
      <ToastContainer />



      <section class=" py-8 antialiased dark:bg-gray-800 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">Shopping Cart</h2>

          <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div class="space-y-6">








                {success == "completed" ? (
                  cartItems.allcart.map((cart, index) => (
                    <div key={index} class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" class="shrink-0 md:order-1">
                          <img class="hidden h-20 w-20 dark:block" src={`http://localhost:5000/${cart.product.image}`} alt="imac image" />
                        </a>

                        <label for="counter-input" class="sr-only">Choose quantity:</label>
                        <div class="flex items-center justify-between md:order-3 md:justify-end">
                          <div class="flex items-center">
                            <button type="button" id="decrement-button" onClick={() => { decreasequantity(cart._id) }} data-input-counter-decrement="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                              <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                              </svg>
                            </button>
                            <input type="text" id="counter-input" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={cart.quantity} required />
                            <button type="button" onClick={() => addquantity(cart._id)} id="increment-button" data-input-counter-increment="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                              <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                              </svg>
                            </button>
                          </div>
                          <div class="text-end md:order-4 md:w-32">
                            <p class="text-base font-bold text-gray-900 dark:text-white">Rs {cart.product.price.sales_price}</p>
                          </div>
                        </div>

                        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{cart.product.title}</a>

                          <div class="flex items-center gap-4">

                            <div class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">Available Stock: <span class="text-green-500">
                              {cart.product.stock}</span> </div>


                            <button onClick={() => findcartid(cart._id)} type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                              <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>),




                  )

                )

                  : (<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div class="FB-Loading-Card">
                      <div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>)}



              </div>

            </div>

            <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div class="space-y-4">
                  <div class="space-y-2">
                    {/* <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Total Price</dt>
                      <dd class="text-base font-medium text-gray-900 dark:text-white">Rs {price}</dd>
                    </dl> */}

                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Total items</dt>
                      <dd class="text-base font-medium text-green-600">{count} items</dd>
                    </dl>


                  </div>

                  <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd class="text-base font-bold text-gray-900 dark:text-white">Rs {price}</dd>
                  </dl>
                </div>

                <button onClick={handleCheckout} class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</button>

                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                  <Link to=".." title="" class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                    Continue Shopping
                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

