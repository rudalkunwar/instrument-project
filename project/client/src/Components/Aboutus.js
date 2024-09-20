import React from "react";
import { Link } from "react-router-dom";
import instrument from "../Components/Assets/dataBaseImage/instrument.jpg";
import rudal from "../Components/Assets/dataBaseImage/rudal.jpg";
import aakash from "../Components/Assets/dataBaseImage/aakash.jpg";
import ishika from "../Components/Assets/dataBaseImage/ishika.jpg";


const AboutUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 m-2 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg font-semibold text-lg transition duration-300 ease-in-out"
        >
            Home
        </Link>
            <main className="py-12">
                <div className="container mx-auto px-4">
                    {/* Project Information Section */}
                    <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our Project</h2>
                        <div className="flex flex-col lg:flex-row">
                            <img src={instrument} alt="Project" className="w-full lg:w-1/2 rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-6" />
                            <div className="lg:w-1/2">
                                <h1 className="text-gray-700 text-lg mb-4">
                                    Welcome to Nepal Instrument, where we offer a curated selection of high-quality musical instruments tailored to meet the diverse needs of musicians. Our project is dedicated to bringing together the finest craftsmanship and cutting-edge designs to help you find the perfect instrument that resonates with your musical journey.
                                </h1>
                                <h1 className="text-gray-700 text-lg">
                                    Our team of experts meticulously sources each product, ensuring authenticity and superior quality. With a focus on customer satisfaction, we strive to provide an exceptional shopping experience, supported by reliable delivery and dedicated customer service.
                                </h1>
                            </div>
                        </div>
                    </section>

                    {/* Team Section */}
                    <section className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Team Member 1 */}
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md flex flex-col items-center">
                                <img src={aakash}alt="Team Member 1" className="w-32 h-32 rounded-full mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Aakash Kandel</h3>
                                <p className="text-gray-600">Founder & CEO</p>
                            </div>

                            {/* Team Member 2 */}
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md flex flex-col items-center">
                                <img src={ishika} alt="Team Member 2" className="w-32 h-32 rounded-full mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Ishika Sigdel</h3>
                                <p className="text-gray-600">Co-Founder & CTO</p>
                            </div>

                            {/* Team Member 3 */}
                            <div className="bg-gray-200 p-6 rounded-lg shadow-md flex flex-col items-center">
                                <img src={rudal} alt="Team Member 3" className="w-32 h-32 rounded-full mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Rudal Kunwar</h3>
                                <p className="text-gray-600">Lead Designer</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="bg-gray-900 text-gray-100 py-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-sm">&copy; {new Date().getFullYear()} Nepal Instrument. All rights reserved.</h1>
                    <h1 className="text-sm mt-2">Created with ❤️ by Aakash Kandel</h1>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
