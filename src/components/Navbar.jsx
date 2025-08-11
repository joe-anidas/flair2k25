import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import licetLogo from '/assets/licet.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after click
  };

  const goToFaq = () => {
    navigate('/faq'); // Navigate to FAQ route
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/20 shadow-lg transition-all duration-300 hover:bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={licetLogo} 
              alt="LICET Logo" 
              className="h-10 w-auto hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              onClick={() => scrollToSection('home')}
            />
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white font-semibold text-lg tracking-wide hover:text-red-400 transition-colors duration-200 px-3 py-2 rounded-md relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="text-white font-semibold text-lg tracking-wide hover:text-red-400 transition-colors duration-200 px-3 py-2 rounded-md relative group"
              >
                Events
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white font-semibold text-lg tracking-wide hover:text-red-400 transition-colors duration-200 px-3 py-2 rounded-md relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={goToFaq}
                className="text-white font-semibold text-lg tracking-wide hover:text-red-400 transition-colors duration-200 px-3 py-2 rounded-md relative group"
              >
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-white hover:text-red-400 transition-colors duration-200 p-2 rounded-md hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={goToFaq}
              className="text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
            >
              FAQ
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}