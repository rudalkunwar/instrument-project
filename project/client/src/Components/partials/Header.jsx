import React from 'react';
import { Link } from 'react-router-dom';
import aawaj2 from "../Assets/dataBaseImage/Aawaj2.png";

const Header = () => {
    return (
        <div className="flex justify-between text-center mx-20 items-center">
            <div className="text-green-600 text-2xl my-2 font-bold">
                <img src={aawaj2} alt="Company Logo" className="h-20 mr-4" />
            </div>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                    Nepal Instrument
                </h2>
                <p className="text-lg text-gray-600">
                    Discover the finest collection of traditional and modern instruments.
                </p>
            </div>
            <div className="flex space-x-5">
                <Link to="/register" className="text-white text-lg bg-purple-800 btn-hover scale-110 px-4 py-1 rounded-lg">Register</Link>
                <Link to="/login" className="text-white text-lg bg-blue-800 btn-hover scale-110 px-4 py-1 rounded-lg">Login</Link>
            </div>
        </div>
    );
};

export default Header;
