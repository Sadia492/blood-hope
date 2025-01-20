import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../assets/iStock-1044148970-649ea50eeb9847ecaa1e8417110a9203.webp";
import img2 from "../assets/john.jpg";
import img3 from "../assets/sarah.jpg";

const HeroStories = () => {
  const stories = [
    {
      id: 1,
      img: img,
      title: "Meet Sarah",
      description:
        "Sarah, a leukemia survivor, received the life-saving transfusion she needed thanks to donors like you. Every drop matters!",
    },
    {
      id: 2,
      img: img2,
      title: "Meet John",
      description:
        "John survived a critical accident because of timely blood donations. Your contributions make a real difference!",
    },
    {
      id: 3,
      img: img3,
      title: "Meet Emma",
      description:
        "Emma's complicated surgery was a success because of the availability of blood. Your generosity saves lives!",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="w-full p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Hero Stories
      </h2>
      <Slider {...settings}>
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center rounded-lg">
            <img
              src={story.img}
              alt={story.title}
              className="rounded-lg mb-4 object-cover w-full h-64"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {story.title}
            </h3>
            <p className="text-gray-600 text-center">{story.description}</p>
            <button
              className={` btn bg-gradient-to-r from-primary to-secondary text-white`}
            >
              Read More
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroStories;
