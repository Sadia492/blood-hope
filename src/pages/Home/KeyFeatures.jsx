import React, { useEffect } from "react";
import animationData from "../../assets/animation/bloodDoc.json";
import animationData2 from "../../assets/animation/animation2.json";
import animationData3 from "../../assets/animation/animation3.json";
import Lottie from "lottie-react";
// import { Typewriter } from "react-simple-typewriter";
import Aos from "aos";
import "aos/dist/aos.css";
export default function KeyFeatures() {
  useEffect(() => {
    Aos.init({
      duration: 2000, // Animation duration
      easing: "ease-in-out", // Easing function
    });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mt-12">
        Key Features
      </h2>
      <p className="text-center     lg:w-1/2 mb-12 mx-auto">
        Discover the powerful features of our platform that drive change and
        connect people. Together, we can ignite impact, spread awareness, and
        build a global network of support for those in need.
      </p>
      <div
        data-aos="fade-up"
        // className="bg-[url('https://i.ibb.co.com/MsBQY5f/cool-background.png')] bg-no-repeat bg-cover p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto ">
          <div className="bg-base-100 rounded-xl p-8 shadow-2xl">
            <div className="text-center flex justify-center items-center">
              <Lottie
                style={{ width: "70%", height: "70%" }}
                animationData={animationData}
                loop={true}
              />
            </div>

            <h2 className="font-bold text-2xl mt-4">Save Lives Together</h2>
            <p className="text-justify mt-2     font-medium">
              Every drop counts! BloodHope connects donors with those in urgent
              need, ensuring that every donation makes a life-saving impact.
              Life matters to us.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl p-8 shadow-2xl">
            <div className="text-center flex justify-center items-center">
              <Lottie
                style={{ width: "50%", height: "50%" }}
                animationData={animationData2}
                loop={true}
              />
            </div>
            <h2 className="font-bold text-2xl">Spread the Hope</h2>
            <p className="text-justify mt-2     font-medium">
              Share urgent donation requests across social media and online
              networks. Together, we can reach more people and save more lives.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl p-8 shadow-2xl">
            <div className="text-center flex justify-center items-center">
              <Lottie
                style={{ width: "50%", height: "50%" }}
                animationData={animationData3}
                loop={true}
              />
            </div>
            <h2 className="font-bold text-2xl">Connect & Support</h2>
            <p className="text-justify mt-2     font-medium">
              BloodHope builds a strong donor community worldwide. Supporters
              can find, connect, and assist those in need—because together, we
              make a difference.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
