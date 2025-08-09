import React from 'react';
import logo from '../assets/logo.webp';
import graitLogo from '../assets/grait-logo.webp';
import Snow from './Snow';

const Contact = () => {
  return (
    <div id="contact" className="bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans py-12 relative overflow-hidden">
      {/* Snow Background */}
      <div className="absolute inset-0 z-0">
        <Snow />
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 z-1" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Contact Header */}
        <div className="text-center mb-8">
          <h2 className="font-orbitron font-bold text-3xl mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-base text-gray-300 max-w-xl mx-auto">
            Get in touch with us for any questions about Flair 2K25. We're here to help!
          </p>
        </div>

        {/* Main Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Logo and Description */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
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
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"></div>
                </div>
                <p className="text-sm leading-relaxed font-normal text-gray-300">
                  Join us for a unique journey, where the future meets the present in extraordinary ways.
                </p>
                <div className="flex gap-4 text-white text-xl">
                  <a href="#" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                    <i className="fas fa-map-marker-alt"></i>
                  </a>
                  <a href="#" className="hover:text-pink-400 transition-all duration-300 transform hover:scale-110">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="hover:text-blue-500 transition-all duration-300 transform hover:scale-110">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section - Quick Links */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 h-full">
              <h3 className="font-orbitron font-bold text-lg mb-4 text-blue-400">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-3">
                <a href="#home" className="text-sm font-normal hover:text-blue-300 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                  <i className="fas fa-home text-blue-400 group-hover:text-blue-300 transition-colors duration-300"></i>
                  <span>Home</span>
                </a>
                <a href="#events" className="text-sm font-normal hover:text-blue-300 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                  <i className="fas fa-calendar-alt text-blue-400 group-hover:text-blue-300 transition-colors duration-300"></i>
                  <span>Events</span>
                </a>
                <a href="#about" className="text-sm font-normal hover:text-blue-300 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                  <i className="fas fa-info-circle text-blue-400 group-hover:text-blue-300 transition-colors duration-300"></i>
                  <span>About</span>
                </a>
                <a href="#contact" className="text-sm font-normal hover:text-blue-300 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                  <i className="fas fa-envelope text-blue-400 group-hover:text-blue-300 transition-colors duration-300"></i>
                  <span>Contact</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Right Section - Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 h-full">
              <h3 className="font-orbitron font-bold text-lg mb-4 text-blue-400">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-orbitron uppercase tracking-widest mb-2 text-blue-300 text-xs">
                    Coordinators
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-sm">
                      <i className="fas fa-user text-blue-400 w-4"></i>
                      <span>Faiza: +91 99999 99999</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <i className="fas fa-user text-blue-400 w-4"></i>
                      <span>Irwin: +91 99999 99999</span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-orbitron uppercase tracking-widest mb-2 text-blue-300 text-xs">
                    Mail Us
                  </p>
                  <a 
                    className="underline hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 text-sm" 
                    href="mailto:flairit@licet.ac.in"
                  >
                    <i className="fas fa-envelope text-blue-400 w-4"></i>
                    flairit@licet.ac.in
                  </a>
                </div>
                <div>
                  <p className="font-orbitron uppercase tracking-widest mb-2 text-blue-300 text-xs">
                    Location
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <i className="fas fa-map-marker-alt text-blue-400 w-4"></i>
                    <span>LICET Campus, Chennai</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <p className="text-base font-normal flex justify-center items-center gap-3">
                <span className="font-orbitron">See y'all on 23th August</span>
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
  );
};

export default Contact;
