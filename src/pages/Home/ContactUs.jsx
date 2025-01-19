import React from "react";

const ContactUs = () => {
  return (
    <section className=" py-10 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
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
