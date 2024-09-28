import React, { useState, useEffect } from 'react';
import image1 from "../Assets/image1.png";
import image2 from "../Assets/image2.png";
import image3 from "../Assets/image3.png";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        setSlides(document.querySelectorAll('.slide'));
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 3000);
        return () => clearInterval(slideInterval);
    }, [slides]);

    useEffect(() => {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentSlide ? 1 : 0;
        });
    }, [currentSlide, slides]);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    return (
        <div className="slide-container w-4/12 h-76 my-10">
            <div className="flex slider">
                <div className="slide slide1"><img src={image1} alt="Slide 1" /></div>
                <div className="slide slide2"><img src={image2} alt="Slide 2" /></div>
                <div className="slide slide3"><img src={image3} alt="Slide 3" /></div>
            </div>
        </div>
    );
};

export default Slider;
