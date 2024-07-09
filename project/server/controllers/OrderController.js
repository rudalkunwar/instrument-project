require('dotenv').config()

const Order = require('../models/OrderModel');
const getEsewaPaymentHash = require('../functions/esewaHashfunction');
const verifyEsewaPayment = require('../functions/esewaVerifyfunction');
const Payment = require('../models/PaymentModel');
const Cart = require('../models/CartModel');




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


    const purchasedItemData = await Order.findById(
      paymentInfo.response.transaction_uuid
    );


    if (!purchasedItemData) {
      return res.status(500).json({
        success: false,
        message: "Purchase not found",
      });
    }


    const paymentData = await Payment.create({
      pidx: paymentInfo.decodedData.transaction_code,
      transactionId: paymentInfo.decodedData.transaction_code,
      orderId: paymentInfo.response.transaction_uuid,
      amount: purchasedItemData.totalAmount,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
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
module.exports = { orderplace, fetchorder, EsewaPaymentVerify, getorder, deleteorder }