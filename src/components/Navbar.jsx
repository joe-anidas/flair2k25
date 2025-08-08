import React from 'react';
import licetLogo from '../assets/licet.png';

export default function Navbar() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={licetLogo} 
              alt="LICET Logo" 
              className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => scrollToSection('home')}
            />
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white font-semibold text-lg tracking-wide hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="text-white font-semibold text-lg tracking-wide hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Events
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white font-semibold text-lg tracking-wide hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white font-semibold text-lg tracking-wide hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-300 transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}