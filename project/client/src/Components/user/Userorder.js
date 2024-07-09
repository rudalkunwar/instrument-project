import React, { useEffect, useState } from 'react'
import '../Assets/css/Userdetails.css'
import axios from '../api/api'

export default function Userorder() {
    const [order, setorder] = useState([])

    const getorder = async () => {
        try {
            const response = await axios.get('/fetchorderapi', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            console.log(response.data)
            setorder(response.data.orders)
        }
        catch (err) {
            console.log(err)
        }

    }



    useEffect(() => {
        getorder()

    }, [])

    const cancelorder = async (id) => {
        alert('Are you sure you want to cancel this order?')

        try {
            const response = await axios.delete(`/deleteorderapi/${id}`, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            console.log(response.data)
            getorder()
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
            <div className="text-3xl font-bold mb-8 text-center">
                <h2>Order Details</h2>
            </div>

            <body class="main_container  ">


                <div class="header_fixed ">
                    <table>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>OrderId</th>
                                <th>PaymentMethod</th>
                                <th>TotalPrice</th>
                                <th>Date</th>
                                <th>status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((item, index) =>
                            (
                                <tr>
                                    <td>{index + 1}</td>

                                    <td>{item._id}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>{item.totalAmount}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.paymentStatus}</td>
                                    <td>
                                        <div>
                                            <button>View</button>
                                            {item.paymentStatus != 'Paid' ? (<button onClick={() => { cancelorder(item._id) }} class="bg-red-800 mx-5"> Cancel Order</button>) : null}


                                        </div>
                                    </td>
                                </tr>
                            ))
                            }

                        </tbody>
                    </table>
                </div>
            </body>



        </div>
    )
}
