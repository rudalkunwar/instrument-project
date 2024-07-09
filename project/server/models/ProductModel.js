const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const Vendor = require('./VendorModel'); 


const productSchema = new Schema({
   user:{
    type: Schema.Types.ObjectId,
    ref: 'vendors',
    required: true
   },
    product_name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        regular_price: {
            type: Number,
            required: true,
        },
        sales_price: {
            type: Number,
            required: true,
        }
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    visibility: { 
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    warranty: { 
        warranty_year: {
            type: Number,
        },
        warranty_month: {
            type: Number,
        }
    },
    image: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});
const Product = mongoose.model('Product', productSchema); 
module.exports = Product;
