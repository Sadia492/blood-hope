import React, { useEffect } from "react";
import HeroStories from "../../components/HeroStories";
import img from "../../assets/Blood donation-pana.png";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const Featured = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration
      easing: "ease-in-out", // Easing function
    });
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-12">
      <h2
        className={`text-3xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
      >
        Featured
      </h2>
      <p className="text-center lg:w-3/5 mx-auto     mt-4">
        Explore inspiring stories, real-time donation stats, and upcoming events
        to make a difference. Join us in saving lives and spreading hope through
        the power of blood donation.
      </p>
      <div
        data-aos="fade-up"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6  h-full mx-auto rounded-lg"
      >
        {/* Hero Story */}
        <HeroStories></HeroStories>
        <div>
          <img src={img} alt="" />
        </div>

        <div className="flex flex-col justify-between gap-2 col-span-1 h-full">
          {/* Stats with Infographic */}
          <div className="  shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2
              className={`text-2xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
            >
              Live Donation Stats
            </h2>
            <div className="w-full">
              <div className="bg-red-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-red-600">
                  Units Collected This Month
                </h3>
                <p className="  text-2xl font-bold">500</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600">
                  Lives Saved So Far
                </h3>
                <p className="  text-2xl font-bold">1,200</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="  shadow-md rounded-lg p-6 flex flex-col">
            <h2
              className={`text-2xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
            >
              Upcoming Events
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span>City Hall Blood Drive</span>
                <span className="text-sm    ">Jan 20, 2025</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Community Center Campaign</span>
                <span className="text-sm    ">Jan 22, 2025</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Winter Drive Challenge</span>
                <span className="text-sm    ">Jan 25, 2025</span>
              </li>
            </ul>
            <button
              className={` btn bg-gradient-to-r from-primary to-secondary text-white`}
            >
              View All Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
