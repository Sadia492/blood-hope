import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
// import { Typewriter } from "react-simple-typewriter";

export default function Newsletter() {
  useEffect(() => {
    Aos.init({
      duration: 2000, // Animation duration
      easing: "ease-in-out", // Easing function
    });
  }, []);

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
        Newsletter
      </h2>
      <p className="text-center text-gray-500 lg:w-1/2 mb-12 mx-auto">
        The Newsletter section encourages users to stay connected by subscribing
        to receive the latest updates, news, and exclusive offers. It includes
        an email input field and a clear call-to-action button.
      </p>
      <div
        data-aos="fade-up"
        className="bg-gradient-to-r from-primary to-secondary mb-12 text-white py-16"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Stay Updated with Our Latest News
          </h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter and be the first to know about new
            campaigns, offers, and exciting updates.
          </p>
          <form className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-l-lg w-1/3 text-gray-800 placeholder-gray-600"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-r-lg hover:bg-secondary focus:outline-none"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
