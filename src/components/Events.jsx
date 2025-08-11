import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snow from '../ui/Snow';
import eventsData from '../data/events';
import '../styles/Events.css'; // Import external CSS file

const Events = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState('lg');

  const handleRegisterClick = (eventSlug) => {
    console.log(eventSlug);
    navigate(`/events/${eventSlug}`);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      
      if (width <= 480) setScreenSize('xs');
      else if (width <= 768) setScreenSize('sm');
      else if (width <= 1024) setScreenSize('md');
      else if (width <= 1280) setScreenSize('lg');
      else setScreenSize('xl');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Disable animations on mobile for better performance
    if (isMobile) {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.transform = 'translateX(0)';
          ref.style.opacity = '1';
          ref.classList.add('animate-none');
        }
      });
      return;
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '-10% 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            entry.target.style.transform = 'translateX(0)';
            entry.target.style.opacity = '1';
            entry.target.setAttribute('data-animated', 'true');
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Initialize cards with CSS transforms instead of inline styles
    cardRefs.current.forEach((ref, index) => {
      if (ref && !ref.getAttribute('data-animated')) {
        const isEven = index % 2 === 0;
        ref.classList.add('event-card-animate');
        ref.classList.add(isEven ? 'slide-in-left' : 'slide-in-right');
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [isMobile, screenSize]);

  const getResponsiveClasses = () => {
    const baseClasses = {
      container: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
      cardWidth: 'w-full max-w-5xl',
      spacing: 'space-y-6 sm:space-y-8 lg:space-y-12',
      padding: 'p-4 sm:p-6 lg:p-8',
      headerText: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
      subText: 'text-lg sm:text-xl lg:text-2xl',
      cardHeight: 'h-64 sm:h-80 lg:h-96',
      titleSize: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
      descSize: 'text-sm sm:text-base lg:text-lg',
      buttonSize: 'text-sm sm:text-base py-2 px-4'
    };

    return baseClasses;
  };

  const responsiveClasses = getResponsiveClasses();

  return (
    <div id="events" className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
      {/* Simplified background effects for mobile */}
      <div className="absolute inset-0 z-0">
        <Snow />
      </div>
      
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-5 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      )}
      
      <div className="relative z-10 min-h-screen py-12 sm:py-16 lg:py-20">
        <div className={`max-w-7xl mx-auto ${responsiveClasses.container}`}>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className={`${responsiveClasses.headerText} font-bold text-white mb-4 sm:mb-6 tracking-tight`}>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-400 to-red-200">
                EVENTS
              </span>
            </h1>
            <p className={`${responsiveClasses.subText} text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4`}>
              Discover a world of technical challenges and innovative competitions
            </p>
          </div>

          <div className={responsiveClasses.spacing}>
            {eventsData.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-event-id={event.id}
                  className={`${responsiveClasses.cardWidth} mx-auto`}
                >
                  <div className={`relative group overflow-hidden rounded-xl lg:rounded-2xl bg-white/5 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40 event-card-hover hover:shadow-2xl hover:shadow-red-500/20`}>
                    <div 
                      className={`w-full ${responsiveClasses.cardHeight} bg-cover bg-center relative`}
                      style={{ backgroundImage: `url(${event.image})` }}
                    >
                      <div className={`absolute inset-0 bg-animate ${
                        isEven
                          ? 'bg-gradient-to-r from-black/80 via-red-950/60 to-black/40 group-hover:from-black/70 group-hover:via-red-900/50 group-hover:to-black/30'
                          : 'bg-gradient-to-l from-black/80 via-red-950/60 to-black/40 group-hover:from-black/70 group-hover:via-red-900/50 group-hover:to-black/30'
                      } pointer-events-none`}></div>
                      
                      <div className={`absolute inset-0 flex flex-col justify-center ${responsiveClasses.padding} ${
                        isMobile ? 'items-start text-left' : isEven ? 'items-start text-left' : 'items-end text-right'
                      }`}>
                        <div className={`max-w-3xl ${!isMobile && !isEven ? 'lg:pl-8' : !isMobile ? 'lg:pr-8' : ''}`}>
                          <div className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 lg:mb-4 ${
                            !isMobile && !isEven ? 'flex-row-reverse' : ''
                          }`}>
                            <span className="text-red-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
                              Event {String(event.id).padStart(2, '0')}
                            </span>
                            <div className="w-4 sm:w-6 lg:w-8 h-px bg-red-400/50"></div>
                          </div>
                          
                          <h2 className={`font-mono ${responsiveClasses.titleSize} font-bold text-white mb-2 sm:mb-3 lg:mb-4 tracking-tight`}>
                            {event.title}
                          </h2>
                          
                          <p className={`${responsiveClasses.descSize} text-gray-200 leading-relaxed mb-4`}>
                            {event.description}
                          </p>
                          
                          <button
                            onClick={() => handleRegisterClick(event.slug)}
                            className={`${responsiveClasses.buttonSize} bg-gradient-to-r from-red-700 to-red-900 text-white rounded-md hover:from-red-600 hover:to-red-800 transition-colors duration-300 shadow-md hover:shadow-red-500/30 font-medium relative z-10 touch-manipulation`}
                          >
                            Register Now
                          </button>
                        </div>
                      </div>
                      
                      {!isMobile && (
                        <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
