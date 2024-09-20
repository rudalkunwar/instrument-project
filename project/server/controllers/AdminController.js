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

        // Create a JWT token
        const token = jwt.sign(
            { id: newAdmin._id, email: newAdmin.email },
            process.env.JWT_SECRET, // Use your JWT secret here
            { expiresIn: '1h' } // Token expiration time
        );

        // Return the token and success message
        res.status(201).json({
            message: "Admin created successfully",
            token: token
        });

    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Server error" });
    }
};

console.log("Admin created");
console.log(updateadmin);

module.exports = updateadmin;
