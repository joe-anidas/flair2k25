import React from 'react';
import logo from '../assets/logo.webp';
import graitLogo from '../assets/grait-logo.webp';
import Snow from './Snow';

const Contact = () => {
  return (
    <div id="contact" className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
      {/* Snow Background */}
      <div className="absolute inset-0 z-0">
        <Snow />
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-400 to-red-300 to-red-200">
                CONTACT US
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get in touch with us for any questions about Flair 2K25. We're here to help!
            </p>
          </div>

          {/* Main Contact Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Logo and Description */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <img 
                      alt="Flair 2K25 logo with hexagonal shape and orange glowing effect" 
                      className="w-20 h-20 object-contain drop-shadow-lg" 
                      src={logo}
                    />
                    <img 
                      alt="Flair 2K25 logo with hexagonal shape and orange glowing effect" 
                      className="w-20 h-20 object-contain drop-shadow-lg" 
                      src={graitLogo}
                    />
                    <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl"></div>
                  </div>
                  <p className="text-sm leading-relaxed font-normal text-gray-300">
                    Join us for a unique journey, where the future meets the present in extraordinary ways.
                  </p>
                  <div className="flex gap-4 text-white text-xl">
                    <a href="#" className="hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                      <i className="fas fa-map-marker-alt"></i>
                    </a>
                    <a href="#" className="hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Section - Quick Links */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 h-full">
                <h3 className="font-bold text-lg mb-4 text-red-400">
                  Quick Links
                </h3>
                <nav className="flex flex-col gap-3">
                  <a href="#home" className="text-sm font-normal hover:text-red-300 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                    <i className="fas fa-home text-red-400 group-hover:text-red-300 transition-colors duration-300"></i>
                    <span className='text-white'>Home</span>
                  </a>
                  <a href="#events" className="text-sm font-normal hover:text-red-300 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                    <i className="fas fa-calendar-alt text-red-400 group-hover:text-red-300 transition-colors duration-300"></i>
                    <span className='text-white'>Events</span>
                  </a>
                  <a href="#about" className="text-sm font-normal hover:text-red-300 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                    <i className="fas fa-info-circle text-red-400 group-hover:text-red-300 transition-colors duration-300"></i>
                    <span className='text-white'>About</span>
                  </a>
                  <a href="#contact" className="text-sm font-normal hover:text-red-300 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                    <i className="fas fa-envelope text-red-400 group-hover:text-red-300 transition-colors duration-300"></i>
                    <span className='text-white'>Contact</span>
                  </a>
                </nav>
              </div>
            </div>

            {/* Right Section - Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 h-full">
                <h3 className="font-bold text-lg mb-4 text-red-400">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="uppercase tracking-widest mb-2 text-red-300 text-xs">
                      Coordinators
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm">
                        <i className="fas fa-user text-red-400 w-4"></i>
                        <span className='text-white'>XXXX: +91 99999 99999</span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <i className="fas fa-user text-red-400 w-4"></i>
                        <span className='text-white'>XXXX: +91 99999 99999</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="uppercase tracking-widest mb-2 text-red-300 text-xs">
                      Mail Us
                    </p>
                    <a 
                      className="underline hover:text-red-300 transition-colors duration-300 flex items-center gap-2 text-sm" 
                      href="mailto:flairit@licet.ac.in"
                    >
                      <i className="fas fa-envelope text-red-400 w-4"></i>
                      <span className='text-white'>flairit@licet.ac.in</span>
                    </a>
                  </div>
                  <div>
                    <p className="uppercase tracking-widest mb-2 text-red-300 text-xs">
                      Location
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <i className="fas fa-map-marker-alt text-red-400 w-4"></i>
                      <span className='text-white'>LICET Campus, Chennai</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-red-500/20">
            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
                <p className="text-base font-normal flex justify-center items-center gap-3">
                  <span className='text-white'>See y'all on 23th August</span>
                  <span className="text-2xl">🎉</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Don't miss out on the most exciting tech event of the year!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
