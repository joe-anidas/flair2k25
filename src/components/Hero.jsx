import React from 'react';
import hero from '../assets/hero.mov';

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

      {/* Content */}
<div className="relative z-10 h-screen flex flex-col">
  {/* Top Left - FLAIR-IT */}
  <div className="px-4 sm:px-6 md:px-8 lg:px-33 pt-8 sm:pt-12 md:pt-16">
    <div className="z-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white tracking-wider">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-400 to-red-300 to-red-200">
          FLAIR-IT
        </span>
      </h1>
    </div>

    {/* Join Us directly below with reduced gap */}
    <div className="mt-4 sm:mt-6 md:mt-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
        Join us on
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-400 to-red-300 to-red-200">
          23th August
        </span>
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
        Experience the future of technology 
        and innovation
      </p>
      <button
        onClick={scrollToEvents}
        className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 text-sm sm:text-base"
      >
        Learn More
      </button>
    </div>
  </div>

  {/* Bottom Right - 2K25 */}
  <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 right-4 sm:right-6 md:right-8 lg:right-34 z-20">
    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white">
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
