import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slideImg1 from "../../assets/istockphoto-983366460-612x612.jpg";
import slideImg2 from "../../assets/img1.jpg";
import slideImg3 from "../../assets/360_F_309202280_CgsWoCAdLBe9INBvdwBKUkpaLEP4XNLa.jpg";
import { Typewriter } from "react-simple-typewriter";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Slider settings with the afterChange callback
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
    afterChange: (index) => setCurrentSlide(index), // Track the current slide index
  };
  const slides = [
    {
      id: 1,
      image: slideImg1,
      title: "Save Lives Together",
      title2: "Join the Movement to Make a Difference",
      description:
        "Connect with donors and recipients to create a community of life-savers. Your donation can be the difference between life and death.",
      titleAnimation: "animate__fadeInLeft",
    },
    {
      id: 2,
      image: slideImg2,
      title: "Track Your Donations",
      title2: "See the Impact of Your Generosity",
      description:
        "Monitor your donation history, understand where your blood is being used, and stay motivated to continue saving lives.",
      titleAnimation: "animate__pulse",
    },
    {
      id: 3,
      image: slideImg3,
      title: "Celebrate the Gift of Life",
      title2: "Be a Hero, One Drop at a Time",
      description:
        "Join us in celebrating donors and volunteers who make life-saving moments possible. Together, we create a healthier future for all.",
      titleAnimation: "animate__bounceIn animate__slow",
    },
  ];

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative max-h-[calc(100vh-100px)]">
            <div className="relative w-full ">
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

              {/* Image */}
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full h-screen object-bottom object-cover z-0"
              />
            </div>
            <div className="absolute h-[calc(100vh-100px)] top-0 flex flex-col pt-16 justify-center items-center  pl-6  text-white w-full left-0 z-30 font-bold space-y-4">
              <h1
                className={`text-5xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
              >
                <Typewriter
                  words={[`${slide.title}`]}
                  loop={true} // Set to true to loop through the words
                  cursor
                  cursorStyle="_"
                  typeSpeed={130} // Adjust typing speed (default is 100)
                  deleteSpeed={100} // Adjust delete speed (default is 50)
                  delaySpeed={1000} // Delay between typing and deleting (default is 1000)
                />
              </h1>
              <h1
                className={`text-5xl font-bold bg-gradient-to-r text-center from-secondary to-primary text-transparent bg-clip-text`}
              >
                {slide.title2}
              </h1>
              <p className={`lg:w-1/2 text-center text-white`}>
                {slide.description}
              </p>
              <a
                href="/blood-donation-requests"
                className={` btn bg-gradient-to-r from-primary to-secondary text-white`}
              >
                Connect Now
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
