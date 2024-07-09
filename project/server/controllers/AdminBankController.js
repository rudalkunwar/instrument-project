

const Bank = require('../models/AddBankModel');
const User=require('../models/UserModel');

const addbank = async (req, res) => {
    const { admin_id,  main_esewaid, email } = req.body;
    console.log(admin_id,  main_esewaid, email);

    const bank = new Bank({
        admin_id,  main_esewaid, email
    });

    await bank.save();
    console.log(bank); 
    return res.status(200).json({message:"added successfully", bank });
}

module.exports = { addbank };
