import React from 'react';
import hero from '/videos/hero.mp4';

const Hero = () => {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative min-h-screen overflow-hidden pt-16">
      {/* Video Background */}
      <div className="absolute inset-0 top-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[calc(100%+60px)] object-cover -mt-[10px]"
        >
          <source src={hero} type="video/mp4" />
          <source src={hero} type="video/mov" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
        {/* Primary Content */}
        <div className="px-4 w-full max-w-lg md:max-w-none md:px-8 md:pt-16">
          <h1 className="text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-400 to-red-300 to-red-200">
              FLAIR-IT
            </span>
          </h1>

          <div className="mt-6 md:mt-8">
            <h2 className="text-4xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Join us on
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-400 to-red-300 to-red-200">
                23th August
              </span>
            </h2>
            <p className="text-xl md:text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
              Experience the future of technology 
              and innovation
            </p>
            <button
              onClick={scrollToEvents}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 text-lg md:text-base"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* 2K25 - Centered on mobile, bottom right on desktop */}
        <div className="mt-16 md:mt-0 md:absolute md:bottom-8 md:right-8 lg:bottom-16 lg:right-16">
          <div className="text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-400 to-red-300 to-red-200">
              2K25
            </span>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 top-16 z-5 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-40 sm:w-56 md:w-64 lg:w-80 h-40 sm:h-56 md:h-64 lg:h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-36 sm:w-48 md:w-56 lg:w-72 h-36 sm:h-48 md:h-56 lg:h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default Hero;