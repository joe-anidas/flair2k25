import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Added for navigation

const FAQ = () => {
  const [Val, setVal] = useState("start");
  const navigate = useNavigate(); // Hook for navigation
  
  const values = {
    hidden: { opacity: 0 },
    start: {
      opacity: 1,
      transition: { duration: 3, delay: 0.5 },
    },
    end: {
      opacity: 0,
      transition: { duration: 3 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Video */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/space-theme.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Back Button */}
      <div className="relative z-10 pt-4 pl-4">
        <button
          onClick={() => navigate(-1)} // Go back in history
          className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back
        </button>
      </div>

      {/* FAQ Content */}
      <div className="relative z-10 pt-10 pb-10">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl px-4">
            <div className="glasscard p-4 md:p-6 rounded-xl backdrop-blur-xl bg-black/30 border border-white/20 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 mt-4">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <motion.details
                  className="w-full rounded-lg bg-gray-900/80 backdrop-blur-sm border border-white/20"
                  whileTap={{ scale: 0.99 }}
                >
                  <summary className="px-4 py-5 cursor-pointer text-lg font-medium">
                    Eligibility
                  </summary>
                  <motion.p
                    variants={values}
                    initial="hidden"
                    animate={Val}
                    onAnimationComplete={() => setVal("start")}
                    className="px-4 py-3 pt-0 ml-4 -mt-2 text-gray-300"
                  >
                    All Engineering College students of any Department are
                    eligible to participate in Flair2k25.
                  </motion.p>
                </motion.details>

                <motion.details
                  className="w-full rounded-lg bg-gray-900/80 backdrop-blur-sm border border-white/20"
                  whileTap={{ scale: 0.97 }}
                >
                  <summary className="px-4 py-5 cursor-pointer text-lg font-medium">
                    Things to be brought
                  </summary>
                  <p className="px-4 py-3 pt-0 ml-4 -mt-2 text-gray-300">
                    College ID card and Bonafide certificate are necessary
                    to be brought on the day of the symposium to participate
                    in Flair2k25.
                  </p>
                </motion.details>

                <motion.details
                  className="w-full rounded-lg bg-gray-900/80 backdrop-blur-sm border border-white/20"
                  whileTap={{ scale: 0.97 }}
                >
                  <summary className="px-4 py-5 cursor-pointer text-lg font-medium">
                    Dress Code
                  </summary>
                  <p className="px-4 py-3 pt-0 ml-4 -mt-2 text-gray-300">
                    Any decent attire, most preferrably formals, collared
                    T-shirts for boys and Churidar for girls. No Jeans and
                    Round neck shirts are allowed.
                  </p>
                </motion.details>

                <motion.details
                  className="w-full rounded-lg bg-gray-900/80 backdrop-blur-sm border border-white/20"
                  whileTap={{ scale: 0.97 }}
                >
                  <summary className="px-4 py-5 cursor-pointer text-lg font-medium">
                    No Mobile Phones
                  </summary>
                  <p className="px-4 py-3 pt-0 ml-4 -mt-2 text-gray-300">
                    Participants are not allowed to use their mobile phones
                    inside the campus. The phone should be either silent or
                    switched off.
                  </p>
                </motion.details>

                <motion.details
                  className="w-full rounded-lg bg-gray-900/80 backdrop-blur-sm border border-white/20"
                  whileTap={{ scale: 0.97 }}
                >
                  <summary className="px-4 py-5 cursor-pointer text-lg font-medium">
                    Timing
                  </summary>
                  <p className="px-4 py-3 pt-0 ml-4 -mt-2 text-gray-300">
                    Participants are expected to assemble 15 minutes prior
                    to the event and being late is not entertained.
                  </p>
                </motion.details>

                <motion.details
                  className="w-full rounded-lg bg-gray-900/80 backdrop-blur-sm border border-white/20"
                  whileTap={{ scale: 0.97 }}
                >
                  <summary className="px-4 py-5 cursor-pointer text-lg font-medium">
                    No Negotiations
                  </summary>
                  <p className="px-4 py-3 pt-0 ml-4 -mt-2 text-gray-300">
                    Judges decision will be final and binding. No arguments
                    regarding the results will be entertained.
                  </p>
                </motion.details>

                <motion.details
                  className="w-full rounded-lg bg-gray-900/80 backdrop-blur-sm border border-white/20"
                  whileTap={{ scale: 0.97 }}
                >
                  <summary className="px-4 py-5 cursor-pointer text-lg font-medium">
                    Queries
                  </summary>
                  <p className="px-4 py-3 pt-0 ml-4 -mt-2 text-gray-300">
                    Event specific queries can be reported to the
                    event-incharge at the venue. Any grievances and other
                    forms of misconduct must be reported to the President
                    (Kabilan) or Vice-President (Akash).
                  </p>
                </motion.details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;