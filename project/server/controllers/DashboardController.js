const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const Vendor=require("../models/VendorModel");

// Function to get dashboard data for a specific user
const dashboard = async (req, res) => {
    try {
     const userid=req.user.id;

        // Ensure userid is provided
        if (!userid) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Fetch orders and products for the specific user
        const user=await Vendor.findById({_id:userid});
        const username=user.name;
        const orders = await Order.find({ userId: userid });
        const products = await Product.find({user:userid}); // Assuming product data is not user-specific

        // Calculate totals
        const totalorder = orders.length;
        const totalproduct = products.length; // If products are user-specific, update this line
       

        // Map order dates for line chart
        const totalorderdate = orders.map(order => order.createdAt);

        return res.status(200).json({
            totalorder,
            totalproduct,
            username,
            totalorderdate
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { dashboard };
