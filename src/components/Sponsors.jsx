import React, { useState } from 'react';
import Smoke from '../ui/Snow';
import Card from '../ui/Card';
import sp1 from '/sponsors/blushlogo.jpg';
import spb1 from '/sponsors/blush.png';


const Sponsors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const sponsorImages = [sp1];
  const sponsorBanners = [spb1];

  const handleOpenBanner = (index) => {
    setSelectedBanner(sponsorBanners[index] || null);
    setIsModalOpen(true);
  };

  const handleCloseBanner = () => {
    setIsModalOpen(false);
    setSelectedBanner(null);
  };

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
          <div className="flex flex-row items-center justify-center gap-8 flex-wrap">
            {sponsorImages.map((image, index) => (
              <Card key={index} className="h-full p-4 bg-black/50 rounded-xl">
                <div
                  className="relative h-48 w-48 overflow-hidden rounded-xl group flex items-center justify-center cursor-pointer"
                  onClick={() => handleOpenBanner(index)}
                >
                  <img
                    src={image}
                    alt={`Sponsor ${index + 1}`}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105 brightness-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500 rounded-xl"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedBanner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={handleCloseBanner}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedBanner} alt="Sponsor banner" className="w-full h-auto rounded-lg shadow-2xl" />
            <button
              type="button"
              aria-label="Close"
              onClick={handleCloseBanner}
              className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsors;
