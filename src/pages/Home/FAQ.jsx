import React, { useEffect } from "react";
// import { Typewriter } from "react-simple-typewriter";
import humanImg from "../../assets/human.png";
// import Aos from "aos";
import "aos/dist/aos.css";
import Aos from "aos";

export default function FAQ() {
  useEffect(() => {
    Aos.init({
      duration: 2000, // Animation duration
      easing: "ease-in-out", // Easing function
    });
  }, []);

  return (
    <div id="faq" className="w-11/12 mx-auto mt-12" data-aos="fade-up">
      <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-500 lg:w-1/2 mb-12 mx-auto">
        Got questions? We've got answers! Browse through our frequently asked
        questions to find helpful information and make your experience smoother.
      </p>
      <div
        data-aos="fade-up"
        className="flex flex-col lg:flex-row justify-center items-center mt-12"
      >
        <div className="flex-1 w-full justify-center items-center flex">
          <img className="w-[500px] object-cover" src={humanImg} alt="" />
        </div>
        <div className="flex-1 space-y-6">
          <div className="collapse collapse-plus bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              🌍 Who can donate blood?
            </div>
            <div className="collapse-content">
              <p>
                ✅ Anyone who is healthy, between 18-65 years old (varies by
                country), and weighs at least 50kg can donate. Some medical
                conditions or recent travel may affect eligibility.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              🏥 Is donating blood safe?
            </div>
            <div className="collapse-content">
              <p>
                🩹 Yes! Blood donation is completely safe. A new, sterile needle
                is used for each donation and then safely discarded. There's no
                risk of infection during the process.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              ⏳ How often can I donate blood?
            </div>
            <div className="collapse-content">
              <p>
                🩸 You can donate whole blood every 8-12 weeks, depending on
                your country’s guidelines. Platelet & plasma donations may have
                different intervals. Always check with your local blood bank!
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              💪 What should I do before and after donating?
            </div>
            <div className="collapse-content">
              <p>
                ✅ Before: Eat a healthy meal, stay hydrated, and avoid alcohol.
                ✅ After: Rest for a few minutes, drink plenty of fluids, and
                avoid strenuous activities for the day.
              </p>
            </div>
          </div>
          {/* <div className="collapse collapse-plus bg-base-200 bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              🕒 How long does it take for funds to be transferred?
            </div>
            <div className="collapse-content">
              <p>
                Funds are typically processed and transferred within 7–10
                business days after the campaign ends. ✅💵 This allows time for
                verification and ensures safe delivery to the campaign owner.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
