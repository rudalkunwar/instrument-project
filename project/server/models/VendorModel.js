const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    esewaid:{
        type:Number,
        required:false,
    }
    ,
    panno: {
        type: Number,
        required: true,
    },
    image:{
        type:String,
        required:false,
    },
    address: {
        state: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        city_area: {
            type: String,
            required: true,
        },
    },
    token:{
        type:String,
        default:null,
    }
});



const users = mongoose.model('vendors', vendorSchema);
module.exports = users;
 
