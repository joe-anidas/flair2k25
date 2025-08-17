import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snow from '../ui/Snow';
import eventsData from '../data/events';

const Events = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleRegisterClick = (eventSlug) => {
    navigate(`/events/${eventSlug}`);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    const resizeHandler = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  useEffect(() => {
    // Clean up previous observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.remove('-translate-y-8', 'translate-y-8', '-translate-x-20', 'translate-x-20');
          entry.target.classList.add('opacity-100');
        }
      });
    }, { threshold: 0.1 });

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div id="events" className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
      {/* Optimized background effects */}
      <div className="absolute inset-0 z-0">
        <Snow particleCount={isMobile ? 50 : 100} />
      </div>
      
      {/* Reduced background elements for mobile */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-5 w-32 h-32 sm:w-48 sm:h-48 bg-red-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-5 w-28 h-28 sm:w-40 sm:h-40 bg-pink-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-rose-500/10 rounded-full blur-xl"></div>
        </div>
      )}
      
      <div className="relative z-10 min-h-screen py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            <span
                style={{ fontFamily: 'STOutlined, serif' }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#d50b0c] via-[#dc2a2c] via-[#ab0606] to-[#8f0505] [background-position:45%]"
              >
                EVENTS
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover a world of technical challenges and innovative competitions
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {eventsData.map((event, index) => {
              const isEven = index % 2 !== 0; // 2,4,6... (right aligned)
              return (
                <div
                  key={event.id}
                  ref={el => cardRefs.current[index] = el}
                  className={`
                    w-full max-w-5xl mx-auto transition-all duration-500 ease-out
                    ${isMobile 
                      ? 'opacity-0 translate-y-8' 
                      : isEven 
                        ? 'opacity-0 translate-x-20' 
                        : 'opacity-0 -translate-x-20'
                    }
                  `}
                >
                  <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40 transition-all duration-300">
                    <div 
                      className="w-full h-64 sm:h-80 lg:h-96 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${event.image})` }}
                    >
                      <div className={`absolute inset-0 pointer-events-none ${
                        isMobile 
                          ? 'bg-gradient-to-b from-black/80 to-black/40' 
                          : isEven
                            ? 'bg-gradient-to-l from-black/80 via-red-950/60 to-black/40'
                            : 'bg-gradient-to-r from-black/80 via-red-950/60 to-black/40'
                      }`}></div>
                      
                      <div className={`absolute inset-0 flex flex-col justify-center p-4 sm:p-6 lg:p-8 ${
                        isMobile ? 'items-start' : isEven ? 'items-end' : 'items-start'
                      }`}>
                        <div className={`max-w-3xl ${!isMobile && isEven ? 'lg:pl-8 text-right' : ''}`}>
                          <div className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 ${
                            !isMobile && isEven ? 'flex-row-reverse' : ''
                          }`}>
                            <span className="text-red-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
                              Event {String(event.id).padStart(2, '0')}
                            </span>
                            <div className="w-4 sm:w-6 lg:w-8 h-px bg-red-400/50"></div>
                          </div>
                          
                          <h2 className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                            {event.title}
                          </h2>
                          
                          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed mb-4 group-hover:text-gray-100 transition-colors duration-300">
                            {event.description}
                          </p>
                          
                          <button
                            onClick={() => handleRegisterClick(event.slug)}
                            className={`text-sm sm:text-base py-2 px-4 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-md hover:from-red-600 hover:to-red-800 transition-all duration-300 font-medium ${
                              isEven ? 'self-end' : ''
                            }`}
                          >
                            Register Now
                          </button>
                        </div>
                      </div>
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