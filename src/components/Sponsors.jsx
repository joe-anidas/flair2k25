import React from 'react';
import Smoke from '../ui/Snow';
import Card from '../ui/Card';
import sp1 from '/sponsors/sp_1.png'; // add more images later here

const Sponsors = () => {
  const sponsorImages = [sp1]; // array for future images

  return (
    <div id="sponsors" className="bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
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
      <div className="relative z-10 py-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Sponsors Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span
                style={{ fontFamily: 'STOutlined, serif' }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#d50b0c] via-[#dc2a2c] via-[#ab0606] to-[#8f0505] [background-position:45%]"
              >
                OUR SPONSORS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Proudly supported by leading institutions and organizations
            </p>
          </div>

          {/* Sponsor Cards */}
          <div className="max-w-4xl mx-auto">
            <Card className="h-full">
              <div className="flex flex-row items-center justify-center gap-8 flex-wrap">
                {sponsorImages.map((image, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="relative h-48 w-48 overflow-hidden rounded-xl group flex items-center justify-center bg-black">
                      <img
                        src={image}
                        alt={`Sponsor ${index + 1}`}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500 rounded-xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
