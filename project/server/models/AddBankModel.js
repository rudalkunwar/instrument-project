const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User=require('../models/UserModel');




const adminbankSchema = new Schema({
    
    admin_id: {
        type:String,
        
        required: true,
        
    },
  
    main_esewaid: {
        type: Number,
        required: true,
    },
    email: {
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
const adminbank = mongoose.model('adminbank', adminbankSchema);
module.exports = adminbank;

