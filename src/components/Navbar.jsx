import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import licetLogo from '/assets/licet.png';
import NavButton from '../ui/NavButton';
import BlurText from '../ui/BlurText';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/' || location.pathname === '/home') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const goToHome = () => {
    if (location.pathname === '/' || location.pathname === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/home');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/20 shadow-lg transition-all duration-300 hover:bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo with responsive margin */}
          <div className="flex-shrink-0 ml-0">
            <img
              src={licetLogo}
              alt="LICET Logo"
              className="h-10 w-auto hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              onClick={goToHome}
            />
          </div>

          {/* Navigation Links (Desktop Only) */}
          <div className="hidden md:block">
            <div className="ml-0 flex items-baseline space-x-12">
              <NavButton onClick={goToHome}>
                <BlurText text="Home" animateBy="letters" style={{ fontFamily: 'STBold, serif' }} />
              </NavButton>
              <NavButton onClick={() => scrollToSection('events')}>
                <BlurText text="Events" animateBy="letters" style={{ fontFamily: 'STBold, serif' }} />
              </NavButton>
              <NavButton onClick={() => scrollToSection('contact')}>
                <BlurText text="Contact" animateBy="letters" style={{ fontFamily: 'STBold, serif' }} />
              </NavButton>
            </div>
          </div>

          {/* Mobile Menu Button (Mobile Only) */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-red-400 transition-colors duration-200 p-2 rounded-md hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
        <div className="md:hidden bg-black/30 backdrop-blur-lg border-t border-white/20 shadow-lg transition-all duration-300 hover:bg-black/40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={goToHome}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-STBold hover:bg-white/10 transition-colors"
            >
              <BlurText
                text="Home"
                animateBy="letters"
                style={{ fontFamily: 'STBold, serif', color: '#FF0000' }}  // Red color
              />
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-STBold hover:bg-white/10 transition-colors"
            >
              <BlurText
                text="Events"
                animateBy="letters"
                style={{ fontFamily: 'STBold, serif', color: '#FF0000' }}
              />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-STBold hover:bg-white/10 transition-colors"
            >
              <BlurText
                text="Contact"
                animateBy="letters"
                style={{ fontFamily: 'STBold, serif', color: '#FF0000' }}
              />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
