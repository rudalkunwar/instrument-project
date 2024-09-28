import React from 'react'

import { FaHome, FaStore, FaShoppingCart, FaUser, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer>
            <ul className="grid grid-cols-3 gap-4 text-white">
                <li>
                    <a href="#" className="flex items-center hover:text-gray-400">
                        <FaHome className="mr-2" /> Home
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center hover:text-gray-400">
                        <FaStore className="mr-2" /> Store
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center hover:text-gray-400">
                        <FaShoppingCart className="mr-2" /> Order
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center hover:text-gray-400">
                        <FaUser className="mr-2" /> Profile
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center hover:text-gray-400">
                        <FaInfoCircle className="mr-2" /> About
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center hover:text-gray-400">
                        <FaQuestionCircle className="mr-2" /> Help
                    </a>
                </li>
            </ul>
        </footer>

    )
}
