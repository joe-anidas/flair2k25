import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import eventsData from '../data/events';

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventSlug } = useParams();
  const [eventDeets, setEventDeets] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Find event by slug
      const event = eventsData.find(e => e.slug === eventSlug);
      setEventDeets(event || null);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [eventSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventDeets) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Event Not Found</h2>
          <p className="mb-6 text-gray-300">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/events')}
            className="py-2 px-6 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-md hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-red-500/30 font-medium"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Background Video */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/space-theme.webm" type="video/webm" />
        </video>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
        <div className="backdrop-blur-md bg-black/30 border border-red-500/30 rounded-xl p-6 mb-8 shadow-xl shadow-red-900/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {eventDeets.title}
              </h1>
              <p className="text-red-300 font-medium">{eventDeets.description}</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`py-2 px-6 rounded-md font-medium transition-all duration-300 shadow-md ${
                showForm 
                  ? "bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 hover:from-gray-600 hover:to-gray-800"
                  : "bg-gradient-to-r from-red-700 to-red-900 text-white hover:from-red-600 hover:to-red-800 hover:shadow-red-500/30"
              }`}
            >
              {showForm ? "Close Registration" : "Register Now"}
            </button>
          </div>
          
          {/* Event Details */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-black/20 p-4 rounded-lg mb-6">
              <pre className="whitespace-pre-wrap text-sm md:text-base overflow-x-auto">
                {eventDeets.rules}
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-red-400 font-bold mb-2">When</h3>
                <p className="text-white">
                  {eventDeets.time} {eventDeets.date}
                </p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-red-400 font-bold mb-2">Where</h3>
                <p className="text-white">{eventDeets.location}</p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg md:col-span-2">
                <h3 className="text-red-400 font-bold mb-2">Organizers</h3>
                <p className="text-white">{eventDeets.organizers}</p>
              </div>
            </div>
          </div>
          
          {/* Registration Form */}
          {showForm && (
            <div className="mt-8 animate-fadeIn">
              <div className="w-full border border-red-500/30 rounded-lg overflow-hidden">
                <iframe
                  src={eventDeets.registerationlink}
                  className="w-full h-[70vh]"
                  title={`Registration Form for ${eventDeets.title}`}
                />
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowForm(false)}
                  className="py-2 px-6 bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 rounded-md hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-md font-medium"
                >
                  Close Form
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="py-2 px-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-md hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-gray-500/20 font-medium"
          >
            &larr; Back to All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;