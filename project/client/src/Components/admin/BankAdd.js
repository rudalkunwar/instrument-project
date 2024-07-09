import React from 'react'
import axios from '../api/api';

export default function BankAdd() {
const submitHandler = (e) => {
    e.preventDefault();
    const admin_id = e.target.admin_id.value;
    const email = e.target.email.value;
    const main_esewaid = e.target.main_esewaid.value;
const response = axios.post('/addbankapi', {admin_id, email, main_esewaid});
    console.log(response);

   
    alert("Bank Added Successfully");
    };

  return (
    <div>

            <div class="font-[sans-serif] bg-white">
                <div class="max-lg:max-w-xl mx-auto w-full">
                    <div class="bg-white shadow-lg rounded-lg p-4">
                        <h1 class="text-2xl font-bold text-gray-800">Add Bank Details</h1>
                        <form class="mt-4" onSubmit={submitHandler}>
                            <div class="mb-4">
                                <label for="admin_id" class="block text-sm font-medium text-gray-700">Admin Id</label>
                                <input type="text" name="admin_id" id="admin_id" class="form-input
                                mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                <div class="mb-4">
                                    <label for="main_esewaid" class="block text
                                        -sm font-medium text-gray-700">Main Esewa Id</label>
                                    <input type="text" name="main_esewaid" id="main_esewaid" class="form-input
                                            mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                    <div class="mb-4">
                                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="text" name="email" id="email" class="form-input
                                                    mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                        <input type="submit" value="Add Bank" class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" />
                                        <div class="text-center mt-4">

                                            <a href="#" class="no-underline text-indigo-500">Back to Home</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>






            </div>


    </div>
  )
}
