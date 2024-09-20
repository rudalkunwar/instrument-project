const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/AdminModel'); // Ensure your model import is correct

const updateadmin = async (req, res) => {
    try {
        // Sample admin details (in practice, these should come from req.body)
        const name = "Admin";
        const email = "admin@admin.com";
        const password = "Aakash12345";

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        const date = new Date();
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            date,
        });

        // Save the admin to the database
        await newAdmin.save();
        console.log("Admin created");

       
       

        // Return the token and success message
        res.status(201).json({
            message: "Admin created successfully",
           
        });

    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Server error" });
    }
};



const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        //
        const admin = await Admin.findOne({ email });

        // Check if admin exists
        if (!admin) {
            return res.status(400).json({ message: "Admin does not exist" });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, admin.password);

        // Check if the password matches
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create the payload for JWT
        const payload = {
            id: admin._id, // Use admin._id for consistency
            email: admin.email
        };

    
        const token = jwt.sign(payload, 'shhhh', { expiresIn: '1h' });

        
        res.status(200).json({
            token,
            message: "Login success"
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {adminlogin, updateadmin};
