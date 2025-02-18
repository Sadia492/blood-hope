import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";
// import { Typewriter } from "react-simple-typewriter";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/reviews`);
      setReviews(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    Aos.init({
      duration: 2000, // Animation duration
      easing: "ease-in-out", // Easing function
    });
  }, []);

  return (
    <div className="w-11/12 mx-auto my-12">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mt-12">
        Testimonials
      </h2>
      <p className="text-center     lg:w-1/2 mb-12 mx-auto">
        The testimonial section highlights user feedback and experiences,
        showcasing reviews and ratings from satisfied customers. It builds trust
        and credibility.
      </p>
      <div data-aos="fade-up">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews?.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col items-center">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <FaQuoteLeft className="text-5xl my-6 text-primary" />
                <h3 className="text-2xl text-primary font-bold">
                  {review.name}
                </h3>
                <p className="py-8 text-center lg:w-1/2">{review.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
