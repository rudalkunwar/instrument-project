const User = require("../models/UserModel");
const Vendor = require("../models/VendorModel");

const profile = async (req, res) => {
    const { email,usertype } = req.body;
    console.log(email,usertype);

    if (usertype == "user") {
        const user = await User.findOne ({email});
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        console.log(user);
        return res.status(200).json({ user });
    }
    else {
        const vendor = await Vendor.findOne ({email});
        vendor.esewaid
        console.log(vendor);
        if (!vendor) {
            return res.status(401).json({ message: "Vendor not found" });
        }
        return res.status(200).json({ vendor });
      
    }   
}
const addesewa = async (req, res) => {
    const { email,usertype,esewaid } = req.body;
    console.log(email,esewaid,usertype);

    if (usertype == "vendor") {
        const vendor = await Vendor.findOne({email});
        if (!vendor) {
            return res.status(401).json({ message: "Vendor not found" });
        }
        console.log(vendor);
        vendor.esewaid=esewaid;
        await vendor.save();
        return res.status(200).json({ vendor });
    }
    else {
        return res.status(401).json({ message: "invalid user" });
    }

}

const updateesewa = async (req, res) => {
    const { email,esewaid,usertype } = req.body;
    console.log(email,esewaid);

   if(usertype=="vendor"){
    const vendor = await Vendor.findOne
    ({email});
    if (!vendor) {
        return res.status(401).json({ message: "Vendor not found" });
    }
    console.log(vendor);
    vendor.esewaid=esewaid;
    await vendor.save();
    return res.status(200).json({ vendor });

}
}




        
module.exports = { profile,addesewa,updateesewa };