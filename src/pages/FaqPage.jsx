import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Smoke from "../ui/Smoke"; // Import your Smoke component
import Navbar from "../components/Navbar3";

const FaqPage = () => {
  const [Val, setVal] = useState("start");
  const navigate = useNavigate();
  
  // Redirect to /home on page refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleBeforeUnload = () => {
      // This will trigger on page refresh/reload
      sessionStorage.setItem('shouldRedirectToHome', 'true');
    };

    // Check if we should redirect on component mount
    if (sessionStorage.getItem('shouldRedirectToHome') === 'true') {
      sessionStorage.removeItem('shouldRedirectToHome');
      navigate('/home', { replace: true });
      return;
    }

    // Add event listener for page refresh
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  const values = {
    hidden: { opacity: 0 },
    start: {
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
    end: {
      opacity: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
      <Navbar />
      <div className="fixed inset-0 z-0">
        <Smoke />
      </div>
      
      {/* Back Button - Updated positioning */}
      <div className="relative z-10 pt-24 pl-6"> {/* Changed from pt-6 to pt-24 to account for navbar height */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center bg-black/40 backdrop-blur-lg text-gray-300 hover:text-white 
          transition-all duration-300 px-6 py-3 rounded-xl border border-red-700/50 shadow-lg 
          hover:shadow-red-800/40 hover:bg-red-900/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-2" 
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
          <span className="text-lg font-medium">Back</span>
        </motion.button>
      </div>

      {/* FAQ Content */}
      <div className="relative z-10 pt-6 pb-20"> {/* Reduced from pt-10 to pt-6 since we added space above */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl px-4">
            <motion.div 
              className="p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-black/40 border border-red-800/30 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 mt-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-red-300">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: "Eligibility",
                    answer: "All Engineering College students of any Department are eligible to participate in Flair2k25."
                  },
                  {
                    question: "Things to be brought",
                    answer: "College ID card and Bonafide certificate are necessary to be brought on the day of the symposium to participate in Flair2k25."
                  },
                  {
                    question: "Dress Code",
                    answer: "Any decent attire, most preferrably formals, collared T-shirts for boys and Churidar for girls. No Jeans and Round neck shirts are allowed."
                  },
                  {
                    question: "No Mobile Phones",
                    answer: "Participants are not allowed to use their mobile phones inside the campus. The phone should be either silent or switched off."
                  },
                  {
                    question: "Timing",
                    answer: "Participants are expected to assemble 15 minutes prior to the event and being late is not entertained."
                  },
                  {
                    question: "No Negotiations",
                    answer: "Judges decision will be final and binding. No arguments regarding the results will be entertained."
                  },
                  {
                    question: "Queries",
                    answer: "Event specific queries can be reported to the event-incharge at the venue. Any grievances and other forms of misconduct must be reported to the President (Faize Fathima S) or Vice-President (Kevin Andrew A)."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="w-full rounded-xl bg-gradient-to-r from-black/50 to-red-900/20 backdrop-blur-sm border border-red-800/30 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.details
                      whileTap={{ scale: 0.99 }}
                      className="w-full"
                    >
                      <summary className="px-5 py-6 cursor-pointer text-lg font-medium bg-gradient-to-r from-black/40 to-red-900/10 hover:from-black/50 hover:to-red-900/30 transition-all duration-300 group">
                        <span className="group-hover:text-red-300 transition-colors duration-300">
                          {faq.question}
                        </span>
                      </summary>
                      <motion.div
                        variants={values}
                        initial="hidden"
                        animate={Val}
                        onAnimationComplete={() => setVal("start")}
                        className="px-5 py-4 pt-2 ml-2 -mt-1 text-gray-300"
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.details>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="bg-black/80 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 LICET. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
