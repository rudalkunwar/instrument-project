

const Product = require('../models/ProductModel');
const Cart = require('../models/CartModel');

//add to cart controller

const add_cart = async (req, res) => {
    const user_id = req.user.id;
    const { product_id, quantity, } = req.body;

  const ifcart = await Cart.findOne({ user_id, product: product_id });
    if (ifcart) {
        return res.status(400).json({ message: "Already added to cart", success: false });
    }

    try {
        const newCart = Cart({
            user_id: user_id,
            product: product_id,
            quantity: quantity,
        });
        await newCart.save();
        return res.status(200).json({ message: "Cart is successfully added", success: true, newCart });
    }
    catch (err) {
        console.error("Error adding to cart:", err);
        return res.status(400).json({ message: "Unable to add to cart", success: false });
    }


}

//fetch cart controller

const fetch_cart = async (req, res) => {
    const user_id = req.user.id;

    try {
        console.log("Searching for user_id:", user_id);
        const allcart = await Cart.find({ user_id }).populate('product');
       
        if(allcart.length==0){
            return res.status(400).json({ message: "Cart is empty", success: false });
        }
        console.log(allcart);
        return res.status(200).json({  success: true, allcart });


    } catch (err) {
        console.error("Error fetching cart:", err);
        return res.status(400).json({ message: "Unable to fetch cart", success: false });
    }
}


//delete cart controller

const delete_cart = async (req, res) => {
    const _id = req.params.id;

    console.log(_id);
    try {
        const cartData = await Cart.findByIdAndDelete(_id);
        if (cartData) {
            return res.status(200).json({ message: "Cart is successfully deleted", success: true });
        }
        else {
            return res.status(400).json({ message: "Cart is not found", success: false });
        }
    } catch (err) {
        return res.status(400).json({ message: "Unable to delete cart", success: false });
    }
}


const increasequantity =  async(req, res) => {
    const userid = req.user.id;
    const _id = req.params.id;
    const {quantity } = req.body;
  
    //update cart
    const cartData = await Cart.findById(_id);
    console.log(cartData);

    if (!cartData)
         {
            return res.status(400).json({ message: "Cart is not found", success: false });
         }

    if (cartData.user_id != userid)
    {
        return res.status(400).json({ message: "You are not authorized to update this cart", success: false });

    }
    
    cartData.quantity = quantity;
    await cartData.save();
    return res.status(200).json({ message: "Cart is successfully updated", success: true, cartData });
}

const decreasequantity = async(req, res) => {
    const userid = req.user.id;
    console.log(userid+"hi aakash i am here");
    const _id = req.params.id;
    const {quantity } = req.body;
    console.log(quantity+"sthsdfsfdsafdsfdsafdsa");
  

   
    //update cart
    const cartData = await Cart.findById(_id);
    console.log(cartData);

    if (!cartData)
         {
            return res.status(400).json({ message: "Cart is not found", success: false });
         }

    if (cartData.user_id != userid)
    {
        return res.status(400).json({ message: "You are not authorized to update this cart", success: false });

    }
    
    cartData.quantity = quantity;
    await cartData.save();
    return res.status(200).json({ message: "Cart is successfully updated", success: true, cartData });
}

module.exports = {add_cart,fetch_cart,delete_cart,increasequantity,decreasequantity};