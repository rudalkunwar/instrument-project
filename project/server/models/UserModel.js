const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    date: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
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



const users = mongoose.model('users', userSchema);
module.exports = users;
 
