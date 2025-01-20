import React from "react";
import HeroStories from "../../components/HeroStories";

const Featured = () => {
  return (
    <div className="w-11/12 mx-auto mt-12">
      <h2 className="font-bold text-3xl text-center">Featured</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  h-full mx-auto rounded-lg">
        {/* Hero Story */}
        <HeroStories></HeroStories>

        <div className="flex flex-col justify-between col-span-1 h-full">
          {/* Stats with Infographic */}
          <div className=" bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Live Donation Stats
            </h2>
            <div className="w-full">
              <div className="bg-red-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-red-600">
                  Units Collected This Month
                </h3>
                <p className="text-gray-700 text-2xl font-bold">500</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600">
                  Lives Saved So Far
                </h3>
                <p className="text-gray-700 text-2xl font-bold">1,200</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className=" bg-white shadow-md rounded-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span>City Hall Blood Drive</span>
                <span className="text-sm text-gray-500">Jan 20, 2025</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Community Center Campaign</span>
                <span className="text-sm text-gray-500">Jan 22, 2025</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Winter Drive Challenge</span>
                <span className="text-sm text-gray-500">Jan 25, 2025</span>
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
