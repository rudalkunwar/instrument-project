
const User = require('../models/UserModel');
const Vendor = require('../models/VendorModel');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const register = async (req, res) => {

    const { name, phone, email, password, confirm_password, date, gender } = req.body;
    const { state, district, city_area } = req.body;

    const existingUser = await User.findOne({ email });
    const vendoruser = await Vendor.findOne({ email });

    if (req.body.usertype == "user") {
        try {

            if (vendoruser) {
                return res.status(401).json({ message: "Already used as vendor" })

            }

            console.log(req.body);




            if (password !== confirm_password) {
                return res.status(400).json({ message: "Passwords do not match" });
            }
            const hashPassword = await bcrypt.hash(password, 10);


            if (existingUser) {
                return res.status(400).json({ message: "User already exists with this email" });
            }

            const newUser = new User({
                
                name,
                phone,
                email,
                password: hashPassword,
                date,
                gender,
                address: {
                    state,
                    district,
                    city_area
                }
            });

            await newUser.save();

            return res.status(200).json({ message: "Successfully registered" });

        } catch (error) {
            console.error("Error during registration:", error);
            return res.status(400).json({ message: "Invalid registration. Please check your input." });
        }
    }

    else {

        try {
            const { panno } = req.body;


            if (existingUser) {
                return res.status(401).json({ message: "Already used as user" })

            }
            console.log(req.body);





            if (password !== confirm_password) {
                return res.status(400).json({ message: "Passwords do not match" });
            }
            const hashPassword = await bcrypt.hash(password, 10);


            if (vendoruser) {
                return res.status(400).json({ message: "User already exists with this email" });
            }

            const newUser = new Vendor({
                name,
                phone,
                email,
                password: hashPassword,
                panno,
                address: {
                    state,
                    district,
                    city_area
                }
            });

            await newUser.save();

            return res.status(200).json({ message: "Successfully registered" });

        } catch (error) {
            console.error("Error during registration:", error);
            return res.status(400).json({ message: "Invalid registration. Please check your input." });
        }
    }

};




const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        const userData = await User.findOne({ email });
        const vendorData = await Vendor.findOne({ email }); // Assuming vendors also have unique emails

        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (!passwordMatch) {
                console.log("Password does not match");
                return res.status(401).json({ message: "Incorrect password" });
            } else {
                const usertype = "user";


                console.log("User found successfully");
                const token = jwt.sign({ id: userData._id, email, usertype }, 'shhhh',
                    {
                        expiresIn: "2h"
                    }
                );

                userData.token = token;
                userData.password = undefined;

                //set the value in cookies

                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,

                };


                return res.status(200).cookie("token", token, options).json({ success: true, message: "successfully login", token, userData, usertype });

            }
        } else if (vendorData) {
            const passwordMatch = await bcrypt.compare(password, vendorData.password);
            if (!passwordMatch) {
                console.log("Password does not match");
                return res.status(401).json({ message: "Incorrect password" });
            } 
            else
             {
                const usertype = "vendor";


                console.log("User found successfully");
                const token = jwt.sign({ id: vendorData._id, email, usertype }, 'shhhh',
                    {
                        expiresIn: "2h"
                    }
                );

                vendorData.token = token;
                vendorData.password = undefined;

                //set the value in cookies

                const option = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,

                };
                


                return res.status(200).cookie("token", token, option).json({ success: true, message: "successfully login", token, vendorData, usertype });

            }
        } else {
            console.log("User with email " + email + " is not found");
            return res.status(401).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



//forgot password

const forgotpassword = async (req, res) => {
    const { email } = req.body;
    console.log(email + "this is email");

    const forgotemail = await User.findOne({ email });
    const name = forgotemail.name;
    if (!forgotemail) {
        return res.status(401).json({ message: "Email not registered yet" });
    }

    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aakashkandel9777@gmail.com',
            pass: 'tcgu mvxp ovqv iagl'
        }
    });

    const mailOptions = {
        from: 'aakashkandel9777@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        html: `
        <p>Dear ${name},</p>
        <p>We've received a request to reset the password for your account. As part of our security measures, we've generated a one-time password (OTP) for you:</p>
        <h2>${otp}</h2>
        <p>Please note that this OTP is valid for one minute only.</p>
        <p>If you did not initiate this request, we advise you to ignore this message. Rest assured, your account security is our top priority.</p>
        <p>For your safety, please do not reply to this email.</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send OTP email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'OTP email sent successfully', code: otp });
        }
    });
};






const changepassword = async (req, res) => {

    console.log(req.body);
    const { password, confirm_password, email } = req.body;
    if (password != confirm_password) {
        return res.status(401).json({ message: "Password must be same" });
    }
    else {
        try {
            const passHash = await bcrypt.hash(password, 10);

            const updatedUser = await User.findOneAndUpdate(
                { email: email },
                { password: passHash },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(401).json({ message: "User not found" });
            }

            return res.status(200).json({ message: "Password changed successfully" });
        } catch (error) {
            console.error("Error updating password:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }

    }

}





module.exports = { register, login, forgotpassword, changepassword,};