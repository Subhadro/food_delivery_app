// src/components/HamburgerCarousel.jsx
import React from 'react';
import Slider from 'react-slick';

const HamburgerCarousel = () => {
    const images = [
        {
            src: 'https://b.zmtcdn.com/data/dish_photos/620/b72acbdf86582027b4d9dd938746f620.jpeg?output-format=webp',
            title: 'Delicious Burgers',
            description: 'Enjoy the best burgers in town!',
        },
        {
            src: 'https://b.zmtcdn.com/data/pictures/chains/5/19151205/8c3e27bf3831c85c9a842429546b4039_o2_featured_v2.jpg?output-format=webp',
            title: 'Juicy Steaks',
            description: 'Experience the taste of juicy steaks!',
        },
        {
            src: 'https://b.zmtcdn.com/data/dish_photos/578/6d9d7d0e308826d3415efb3fa670a578.jpg?output-format=webp',
            title: 'Fresh Salads',
            description: 'Healthy and tasty salads, just for you!',
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        appendDots: (dots) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
        ),
    };

    return (
        <div className=" mb-8 overflow-hidden w-auto">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="relative w-full">
                        {/* Background Image */}
                        <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-[300px] sm:h-[400px] object-cover"
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-2">{image.title}</h2>
                            <p className="text-base sm:text-lg mb-4 text-center px-4">{image.description}</p>

                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HamburgerCarousel;
