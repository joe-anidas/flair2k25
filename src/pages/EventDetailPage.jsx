import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar3";
import Snow from "../ui/Snow";
import eventsData from "../data/events";

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventSlug } = useParams();
  const [eventDeets, setEventDeets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const event = eventsData.find((e) => e.slug === eventSlug);
      setEventDeets(event || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [eventSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Snow />
        </div>
        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p className="text-sm md:text-base">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventDeets) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Snow />
        </div>
        <div className="text-center max-w-md mx-auto relative z-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Event Not Found</h2>
          <p className="mb-6 text-gray-300 text-sm md:text-base">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="py-2 px-4 md:px-6 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-md hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-red-500/30 font-medium active:shadow-[0_0_20px_rgba(220,38,38,0.8)] active:scale-95 text-sm md:text-base"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 z-0">
        <Snow />
      </div>

      <div className="fixed top-0 left-0 w-full h-full z-10">
        <video autoPlay loop muted className="w-full h-full object-cover opacity-80">
          <source src="/space-theme.webm" type="video/webm" />
        </video>
      </div>

      <div className="absolute inset-0 z-20">
        <div className="absolute top-10 left-5 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-80 lg:h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-30 pt-28 sm:pt-24 md:pt-24 pb-8 md:pb-12 px-3 md:px-4 max-w-6xl mx-auto">
        <div className="mb-6 md:mb-6 flex flex-row sm:flex-row justify-between items-center gap-2 md:gap-4">
          <button
            onClick={() => navigate("/home")}
            className="flex-1 sm:flex-initial py-2 px-3 md:px-6 bg-gradient-to-r from-red-800 to-red-950 text-white rounded-md hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-md hover:shadow-red-500/40 font-medium flex items-center justify-center border border-red-600/30 hover:border-red-500/50 active:shadow-[0_0_20px_rgba(220,38,38,0.8)] active:scale-95 text-xs sm:text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 mr-1 sm:mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden xs:inline sm:inline">Back to All Events</span>
            <span className="xs:hidden">Back</span>
          </button>
          
          {/* Register Button */}
          <a
            href={eventDeets.registrationLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 sm:flex-initial py-2 px-3 md:px-6 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-md transition-all duration-300 shadow-md font-medium flex items-center justify-center border border-red-500/40 ${
              !eventDeets.registrationLink 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:from-red-500 hover:to-red-700 hover:shadow-red-500/50 hover:border-red-400/60 active:shadow-[0_0_20px_rgba(220,38,38,0.8)] active:scale-95"
            } text-xs sm:text-sm md:text-base`}
            onClick={!eventDeets.registrationLink ? (e) => e.preventDefault() : undefined}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 md:h-5 md:w-5 mr-1 sm:mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Register Now</span>
          </a>
        </div>

        <div className="relative backdrop-blur-md bg-black/30 rounded-xl p-4 md:p-6 mb-6 md:mb-8 shadow-xl shadow-red-900/20 overflow-hidden">
          <div className="absolute inset-0 rounded-xl border border-red-500/30 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.7)]"></div>
          <div className="absolute inset-0 rounded-xl border border-red-500/20 shadow-[0_0_25px_rgba(220,38,38,0.9)] animate-ping opacity-20" style={{ animationDuration: "3s" }}></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                  {eventDeets.title}
                </h1>
                <p className="text-red-300 font-medium text-sm md:text-base">{eventDeets.description}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="bg-black/20 p-3 md:p-4 rounded-lg mb-4 md:mb-6 border border-gray-700/50">
                <pre className="whitespace-pre-wrap text-xs md:text-sm lg:text-base overflow-x-auto">
                  {eventDeets.rules}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-black/20 p-3 md:p-4 rounded-lg border border-gray-700/50">
                  <h3 className="text-red-400 font-bold mb-2 text-sm md:text-base">When</h3>
                  <p className="text-white text-xs md:text-sm lg:text-base">
                    {eventDeets.time} {eventDeets.date}
                  </p>
                </div>

                <div className="bg-black/20 p-3 md:p-4 rounded-lg border border-gray-700/50">
                  <h3 className="text-red-400 font-bold mb-2 text-sm md:text-base">Where</h3>
                  <p className="text-white text-xs md:text-sm lg:text-base">{eventDeets.location}</p>
                </div>

                <div className="bg-black/20 p-3 md:p-4 rounded-lg border border-gray-700/50">
                  <h3 className="text-red-400 font-bold mb-2 text-sm md:text-base">Organizers</h3>
                  <p className="text-white text-xs md:text-sm lg:text-base">{eventDeets.organizers}</p>
                </div>

                <div className="bg-black/20 p-3 md:p-4 rounded-lg border border-gray-700/50">
                  <h3 className="text-red-400 font-bold mb-2 text-sm md:text-base">For Queries</h3>
                  <p className="text-white text-xs md:text-sm lg:text-base">Contact Alan Merwin: 7904264568</p>
                </div>
              </div>
              
              {/* Event Brochure Section */}
              {eventDeets.brochureLink && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Event Brochure</h3>
                  <div className="w-full border border-red-500/30 rounded-lg overflow-hidden">
                    <iframe
                      src={eventDeets.brochureLink}
                      className="w-full h-[60vh]"
                      title={`Brochure for ${eventDeets.title}`}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <a
                      href={eventDeets.brochureLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-2 px-4 md:px-6 bg-gradient-to-r from-red-800 to-red-950 text-red-200 rounded-md hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-md font-medium border border-red-600/30 hover:shadow-red-500/40 active:shadow-[0_0_20px_rgba(220,38,38,0.8)] active:scale-95 text-sm md:text-base"
                    >
                      Open Brochure in New Tab
                    </a>
                  </div>
                </div>
              )}
            </div>
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

export default EventDetailPage;