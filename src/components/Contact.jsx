import React from 'react';
import logo from '/assets/flair2.png';
import graitLogo from '/assets/grait-logo.webp';
import Smoke from '../ui/Snow';
import Card from '../ui/Card';

const Contact = () => {
  return (
    <div id="contact" className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
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
      <div className="relative z-10 min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Contact Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            <span style={{ fontFamily: 'STOutlined, serif' }} className="text-transparent bg-clip-text bg-gradient-to-r from-[#d50b0c] via-[#dc2a2c] via-[#ab0606] to-[#8f0505] [background-position:45%]">
            CONTACT US
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get in touch with us for any questions about Flair 2K25. We're here to help!
            </p>
          </div>

          {/* Main Contact Content - Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* First Card - Logo and Description */}
            <Card className="h-full">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative flex flex-row">
                  <img 
                    alt="Flair 2K25 logo with hexagonal shape and orange glowing effect" 
                    className="w-30 h-30 object-contain drop-shadow-lg" 
                    src={logo}
                  />
                  <img 
                    alt="Flair 2K25 logo with hexagonal shape and orange glowing effect" 
                    className="w-30 h-30 object-contain drop-shadow-lg" 
                    src={graitLogo}
                  />
                  <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl"></div>
                </div>
                <p className="text-sm leading-relaxed font-normal text-gray-300">
                  Join us for a unique journey, where the future meets the present in extraordinary ways.
                </p>
                <div className="flex gap-4 text-white text-xl">
                  <a href="https://maps.app.goo.gl/8xibRnhvK7wmN9uf8" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                    <i className="fas fa-map-marker-alt"></i>
                  </a>
                  <a href="https://www.instagram.com/flairit_2k25?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                    <i className="fab fa-instagram"></i>
                  </a>
                  
                </div>
              </div>
            </Card>

            {/* Second Card - Contact Information */}
            <Card className="h-full">
              <h3 className="font-bold text-lg mb-4 text-red-400">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-sm">
                      <i className="fas fa-user text-red-400 w-4"></i>
                      <span className='text-white'>FAIZA FATHIMA: <a href="tel:+918637458726" aria-label="Call Tatwin">+91 8637458726</a></span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <i className="fas fa-user text-red-400 w-4"></i>
                      <span className='text-white'>KEVIN ANDREW: <a href="tel:+919043076197" aria-label="Call Kevin">+91 9043076197</a></span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="uppercase tracking-widest mb-2 text-red-300 text-xs">
                    Mail Us
                  </p>
                  <a 
                    className=" hover:text-red-300 transition-colors duration-300 flex items-center gap-2 text-sm" 
                    href="mailto:flairit@licet.ac.in"
                  >
                    <i className="fas fa-envelope text-red-400 w-4"></i>
                    <span className='underline text-white'>flairit@licet.ac.in</span>
                  </a>
                </div>
                <div>
                <a href="https://maps.app.goo.gl/8xibRnhvK7wmN9uf8" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                 
                  <p className="uppercase tracking-widest mb-2 text-red-300 text-xs">
                    Location
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <i className="fas fa-map-marker-alt text-red-400 w-4"></i>
                    <span className='text-white'>LICET, Loyola Campus, Chennai</span>
                  </p>
                </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6">
            <div className="text-center">
              <Card className="max-w-md mx-auto" hoverEffect={false}>
                <p className="text-base font-normal flex justify-center items-center gap-3">
                  <span className='text-white'>See y'all on 23rd August</span>
      
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Don't miss out on the most exciting tech event of the year!
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default Contact;
