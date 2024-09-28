import React from 'react';
const Features = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="border rounded-lg p-6 shadow-md bg-green-200">
                    <h3 className="text-lg font-semibold text-gray-800">Free Delivery</h3>
                    <h1 className="text-gray-600 mt-2">Get free delivery on all orders above $50. We ensure timely and secure delivery of your instruments.</h1>
                </div>
                <div className="border rounded-lg p-6 shadow-md bg-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-800">Genuine Products</h3>
                    <h1 className="text-gray-600 mt-2">We guarantee authentic and high-quality instruments sourced directly from trusted manufacturers.</h1>
                </div>
                <div className="border rounded-lg p-6 shadow-md bg-purple-200">
                    <h3 className="text-lg font-semibold text-gray-800">Huge Saving</h3>
                    <h1 className="text-gray-600 mt-2">Enjoy exclusive discounts and offers on a wide range of instruments. Save big on your purchases!</h1>
                </div>
                <div className="border rounded-lg p-6 shadow-md bg-blue-200">
                    <h3 className="text-lg font-semibold text-gray-800">Easy Return</h3>
                    <h1 className="text-gray-600 font-normal mt-2">We offer hassle-free returns and refunds within 30 days.</h1>
                </div>
            </div>
        </div>
    );
};

export default Features;
