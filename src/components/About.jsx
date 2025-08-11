import React from 'react';
import Smoke from '../ui/Snow';

const About = () => {
  const sponsorImages = [
    "/sponsors/sponsor/1.webp",
    "/sponsors/sponsor/2.webp",
    "/sponsors/sponsor/3.webp"
  ];

  return (
    <div id="about" className="min-h-[80vh] bg-gradient-to-tr from-black via-red-950 to-black relative overflow-hidden">
      {/* Smoke Background */}
      <div className="absolute inset-0 z-0">
        <Smoke />
      </div>
      
      {/* Funky Red Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-300 to-red-200">
                OUR SPONSORS
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Proudly supported by leading institutions and organizations
            </p>
          </div>

          {/* Single Sponsor Card with 3 Images */}
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:scale-105">
              {/* Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {sponsorImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-48 overflow-hidden rounded-xl group"
                  >
                    <img
                      src={image}
                      alt={`Sponsor ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark reddish overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-950/60 to-black/40 group-hover:from-black/70 group-hover:via-red-900/50 group-hover:to-black/30 transition-all duration-500"></div>
                  </div>
                ))}
              </div>
              
              {/* Funky red glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;