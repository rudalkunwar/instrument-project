import React, { useEffect, useState } from 'react'
import '../Assets/css/Userdetails.css'
import axios from '../api/api'

export default function Product() {
 const [product, setproduct] = useState([null]);
 let count=1;

    const getproduct = async () => {
        try {
            const response = await axios.get('/allproductapi', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            console.log(response.data)
            setproduct(response.data.products)
        }
        catch (err) {
            console.log(err)
        }

    }
 useEffect(() => {
        getproduct()
    }
    , []);

 if(product[0] === null) return (<div>Loading...</div>);

  return (
    <div>
        <div className="text-3xl font-bold mb-8 text-center">
            <h2>Product Details</h2>
        </div>
    
        <body class="main_container  ">
            <div class="header_fixed ">
            <table>
                <thead>
                <tr>
                    <th>S.N</th>
                    <th>Product Name</th>
                    <th> Regular Price</th>
                    <th>Sales_Price</th>
                    <th>Product Stock</th>
                    <th>Product Category</th>
                    <th>Product title</th>
                    <th>Product Image</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    product.map((product) => {
                        return (
                            <tr>
                                <td>{count++}</td>
                                <td>{product.product_name}</td>
                                <td>{product.price.regular_price}</td>
                                <td>{product.price.sales_price}</td>
                                <td>{product.stock}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td><img src={`http://localhost:5000/${product.image}`} alt="product" /></td>
                                <td>
                                    <div>
                                    <i class="fa-solid fa-pen-to-square text-blue-600 text-2xl mx-2"></i>
                                    <i class="fa-solid fa-trash text-red-600 text-2xl mx-2"></i>
                                    <i class="fa-solid fa-eye text-gray-500 text-2xl mx-2"></i>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            </div>
        </body>

    </div>
  )
}
