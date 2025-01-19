import React from "react";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import animate from "../assets/animation/bloodMan.json";

export default function WelcomeUser() {
  const { user } = useAuth();
  return (
    <section className="bg-gradient-to-r flex justify-between from-secondary to-primary text-white py-10 px-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        {/* User Avatar */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-full overflow-hidden shadow-md">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt={user?.displayName || "User Avatar"}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Welcome Message */}
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {user?.displayName || "User"}! 👋
            </h1>
            <p className="text-sm text-gray-200 mt-2">
              Thank you for being a part of our community.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex  justify-end items-center">
        <Lottie className="lg:w-40 " animationData={animate} loop={true} />
      </div>
    </section>
  );
}
