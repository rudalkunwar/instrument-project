const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./UserModel');

const orderSchema = new Schema({
    
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shippingDetails: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postal: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
    ,
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
