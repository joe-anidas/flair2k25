import React, { useState } from 'react';
import Smoke from '../ui/Snow';
import Card from '../ui/Card';
import sp1 from '/sponsors/blushlogo.jpg';       // Title sponsor logo
import spb1 from '/sponsors/blush.png';          // Title sponsor banner
import sp2 from '/sponsors/grad-square.jpg';     // Other sponsor logo
import spb2 from '/sponsors/grad-square.png';    // Other sponsor banner

const Sponsors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  // Title Sponsors
  const titleSponsors = [sp1];
  const titleSponsorBanners = [spb1];

  // Other Sponsors
  const otherSponsors = [sp2];
  const otherSponsorBanners = [spb2];

  const handleOpenBanner = (index, isTitle = false) => {
    setSelectedBanner(isTitle ? titleSponsorBanners[index] : otherSponsorBanners[index]);
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

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span
                style={{ fontFamily: 'STOutlined, serif' }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#d50b0c] via-[#dc2a2c] via-[#ab0606] to-[#8f0505] [background-position:45%]"
              >
                OUR SPONSORS
              </span>
            </h2>
          </div>

          {/* Title Sponsors */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center text-white mb-8">Title Sponsors</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              {titleSponsors.map((image, index) => (
                <Card key={index} className="p-6 bg-black/50 rounded-xl">
                  <div
                    className="relative h-56 w-56 overflow-hidden rounded-xl group flex items-center justify-center cursor-pointer"
                    onClick={() => handleOpenBanner(index, true)}
                  >
                    <img
                      src={image}
                      alt={`Title Sponsor ${index + 1}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105 brightness-110"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Other Sponsors */}
          <div>
            <h3 className="text-3xl font-bold text-center text-white mb-8">Sponsors</h3>
            <div className="flex flex-row items-center justify-center gap-8 flex-wrap">
              {otherSponsors.map((image, index) => (
                <Card key={index} className="h-full p-4 bg-black/50 rounded-xl">
                  <div
                    className="relative h-40 w-40 overflow-hidden rounded-xl group flex items-center justify-center cursor-pointer"
                    onClick={() => handleOpenBanner(index, false)}
                  >
                    <img
                      src={image}
                      alt={`Sponsor ${index + 1}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105 brightness-110"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Banners */}
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
