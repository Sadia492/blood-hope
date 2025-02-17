import Lottie from "lottie-react";
import React, { useEffect } from "react";
import animation from "../../assets/animation/bloodDoc.json";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const ContactUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration
      easing: "ease-in-out", // Easing function
    });
  }, []);

  return (
    <section className="w-11/12 mx-auto my-12">
      <div className="">
        <h2
          className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
        >
          Contact Us
        </h2>
        <p className="text-center lg:w-3/5 mx-auto text-gray-600 mt-4">
          Have questions or need assistance? Reach out to us, and we’ll be happy
          to help. Your support makes a difference in saving lives.
        </p>

        <div
          data-aos="fade-up"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
        >
          {/* Contact Form */}
          <div className=" p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Send Us a Message
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Message</label>
                <textarea
                  rows="4"
                  placeholder="Enter your message"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className={` btn bg-gradient-to-r from-primary to-secondary text-white w-full`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-6">
                If you have any questions or need further assistance, feel free
                to reach out to us.
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <Lottie
                className="lg:w-4/5 "
                animationData={animation}
                loop={true}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded-full">
                  📞
                </span>
                <span className="ml-4 text-gray-700 font-medium">
                  +1 (234) 567-8901
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded-full">
                  📧
                </span>
                <span className="ml-4 text-gray-700 font-medium">
                  support@blooddonation.org
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded-full">
                  📍
                </span>
                <span className="ml-4 text-gray-700 font-medium">
                  123 Main Street, City, Country
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
