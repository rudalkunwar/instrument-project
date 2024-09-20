const model = require('mongoose');
const Schema = model.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
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
    
});

const admin = model.model('admins', adminSchema);
module.exports = admin;
