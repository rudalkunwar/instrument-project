const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('../models/ProductModel'); // Correct path to Product model
const users = require('../models/UserModel'); // Correct path to User model

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'users', // Ensure 'User' model is correctly defined elsewhere
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
      ref: 'Product', // This should match the Product model name
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
    enum: ['Pending', 'Paid', 'unpaid'],
    default: 'Pending'
  },

  orderStatus: {
    type: String,
    enum: ['Pending', 'Process', 'Delivery'],
    default: 'Pending'
  },


  createdAt: {
    type: Date,
    default: Date.now
},
  updatedAt: {
    type: Date,
    default: Date.now
  },

});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
