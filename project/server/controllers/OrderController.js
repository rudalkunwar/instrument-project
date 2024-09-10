require('dotenv').config()

const Order = require('../models/OrderModel');
const getEsewaPaymentHash = require('../functions/esewaHashfunction');
const verifyEsewaPayment = require('../functions/esewaVerifyfunction');
const Payment = require('../models/PaymentModel');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');




const orderplace = async (req, res) => {
  console.log(req.user);
  const { shippingDetails, paymentMethod, items, totalAmount, paymentStatus } = req.body;
  console.log(shippingDetails, paymentMethod, items, totalAmount, paymentStatus);
  const user = req.user.id;
  const cart = await Cart.find({ user_id: user }).populate('product');
  console.log(cart);
  if (cart.length == 0) {
    return res.status(400).json({ message: "cart is empty " });
  }

  const order = new Order({

    customer: req.user.id,
    shippingDetails: {
      name: shippingDetails.name,
      email: shippingDetails.email,
      street: shippingDetails.street,
      city: shippingDetails.city,
      state: shippingDetails.state,
      postal: shippingDetails.postal

    },
    paymentMethod,
    items,
    totalAmount,

  });
  console.log(order);

  const purchasedItemData = await order.save();
  if (!purchasedItemData) {
    return res.status(400).json({ message: "order not placed" });
  }
  console.log(purchasedItemData);

  const totalPrice = purchasedItemData.totalAmount;
  const paymentInitiate = await getEsewaPaymentHash({
    amount: totalPrice,
    transaction_uuid: purchasedItemData._id,
  });


  res.json({
    message: "order placed successfully",
    success: true,
    payment: paymentInitiate,
    purchasedItemData,
    paymentmethod: paymentMethod,
  });



}

const fetchorder = async (req, res) => {
  console.log("order fetching here...")
  const orders = await Order.find({ customer: req.user.id }).sort({ createdAt: -1 });;

  if (!orders) {
    return res.status(400).json({ message: "order not found" });
  }

  return res.status(200).json({ message: "successfully fetch order", orders });
}

const EsewaPaymentVerify = async (req, res) => {
  const { data } = req.query;
  console.log(data + " this is data query");


  try {

    const paymentInfo = await verifyEsewaPayment(data);
    console.log("this is payment info");
    console.log(paymentInfo);


    const purchasedItemData = await Order.findById(
      paymentInfo.response.transaction_uuid
    );
console.log(purchasedItemData);

    if (!purchasedItemData) {
      return res.status(500).json({
        success: false,
        message: "Purchase not found",
      });
    }


    const paymentData = await Payment.create({
      pidx: paymentInfo.response.transaction_code,
      transactionId: paymentInfo.response.transaction_code,
      orderId: paymentInfo.response.transaction_uuid,
      amount: purchasedItemData.totalAmount,
      // dataFromVerificationReq: paymentInfo,
      // apiQueryFromUser: req.query,
      paymentGateway: "esewa",
      status: "success",
    });


    purchasedItemData.paymentStatus = "Paid";


    await purchasedItemData.save();

    const cartdel = await Cart.deleteMany({ user_id: purchasedItemData.customer });
    if (!cartdel) {
      return res.status(400).json({ message: "cart not deleted" });
    }
    else {
      console.log("cart deleted");
    }



    const ispayment = await Payment.findOne({ orderId: paymentInfo.response.transaction_uuid });


    res.json({
      success: true,
      message: "Payment successful",
      paymentData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during payment verification",
      error: error.message,
    });
  }
}

const getorder = async (req, res) => {
  //sorted in acending order
  const order = await Order.find({ customer: req.user.id }).populate('customer', 'name email').sort({ createdAt: 1 });
  if (order) {
    return res.status(200).json({ status: "success", message: "order fetched", order });
  }
  else {
    res.status(400).json({ message: "order not found" });
  }
}



const deleteorder = async (req, res) => {
  const order = await Order.find({ _id: req.params.id }).deleteOne();
  console.log(order);
  if (order) {
    return res.status(200).json({ status: "success", message: "order deleted" });
  }
  else {
    res.status(400).json({ message: "order not found" });
  }
}



//vendor

//find order product details where vendor id is equal to user id
const fetchorderbyvendor = async (req, res) => {
  try {
    const user_id = req.user.id;
    console.log(user_id); 

    // Fetch the vendor's products
    const vendorProducts = await Product.find({ user: user_id }).select('_id'); // Select only the _id field

    // Find all orders and populate the product details within items
    const orders = await Order.find()
    .populate('items','Product') // Populate product details within items
    .sort({ createdAt: -1 });
     

    console.log(orders);

    // Filter orders to include only those that contain items with products from the vendor
    const filteredOrders = orders.map((order) => {
      const filteredItems = order.items.filter((item) => 
        vendorProducts.some((vendorProduct) => 
          vendorProduct._id.toString() === item.productId._id.toString()
        )
      );
      
      return {
        _id: order._id,
        customer: order.customer,
        shippingDetails: order.shippingDetails,
        paymentMethod: order.paymentMethod,
        items: filteredItems,
        totalAmount: order.totalAmount, // Make sure to include the total amount
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
      };
    }).filter((order) => order.items.length > 0); // Only include orders with filtered items

    console.log(filteredOrders);

    return res.status(200).json({ status: "success", message: "Orders fetched", orders: filteredOrders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "An error occurred while fetching orders" });
  }
};



const fetchorderbyvendororderid = async (req, res) => {
  try {
    const user_id = req.user.id;

    
    const { id } = req.params; // Retrieve the order ID from URL parameters
    console.log(id);

    console.log(user_id);
    
    // Fetch the vendor's products
    const vendorProducts = await Product.find({ user: user_id });

    // Fetch the order by its ID
    const order = await Order.findById({_id:id})
      .populate('items','Product') // Populate product details within items
      .sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }

    // Filter items based on the vendor's products
    const filteredItems = order.items.filter(item => 
      vendorProducts.some(vendorProduct => vendorProduct._id.toString() === item.productId.toString())
    );

    // Construct the response object
    const response = {
      _id: order._id,
      customer: order.customer,
      shippingDetails: order.shippingDetails,
      paymentMethod: order.paymentMethod,
      items: filteredItems,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
    };

    console.log(response);

    return res.status(200).json({ status: "success", message: "Order fetched", order: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "An error occurred while fetching the order" });
  }
};



module.exports = { orderplace, fetchorder, EsewaPaymentVerify, getorder, deleteorder,fetchorderbyvendor,fetchorderbyvendororderid };