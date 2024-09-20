const User = require('../models/UserModel');
const Vendor = require('../models/VendorModel');
const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

// Function to get the total number of users
const totaluser = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ totalUsers: count });
    } catch (err) {
        res.status(400).json({ error: 'Error getting total users' });
    }
};

// Function to get the total number of vendors
const totalvendor = async (req, res) => {
    try {
        const count = await Vendor.countDocuments();
        res.json({ totalVendors: count });
    } catch (err) {
        res.status(400).json({ error: 'Error getting total vendors' });
    }
};

// Function to get the total number of orders
const totalorder = async (req, res) => {
    try {
        const count = await Order.countDocuments();
        res.json({ totalOrders: count });
    } catch (err) {
        res.status(400).json({ error: 'Error getting total orders' });
    }
};

// Function to get the total number of products
const totalproduct = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.json({ totalProducts: count });
    } catch (err) {
        res.status(400).json({ error: 'Error getting total products' });
    }
};

// Function to get the latest 5 orders
const latestorder = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
        res.json({ latestOrders: orders });
    } catch (err) {
        res.status(400).json({ error: 'Error getting latest orders' });
    }
};

// Function to get the latest 5 products
const latestproduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(5);
        res.json({ latestProducts: products });
        console.log(products);
    } catch (err) {
        res.status(400).json({ error: 'Error getting latest products' });
    }
};

// Function to get the latest 5 users
const latestuser = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).limit(5);
        res.json({ latestUsers: users });
    } catch (err) {
        res.status(400).json({ error: 'Error getting latest users' });
    }
};



module.exports = {
    totaluser,
    totalvendor,
    totalorder,
    totalproduct,
    latestorder,
    latestproduct,
    latestuser
};
