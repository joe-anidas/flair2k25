import React, { useEffect, useRef, useState } from 'react';
import Snow from './Snow';

const Events = () => {
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Reduced margin for better mobile detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use more reliable classes for mobile
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.opacity = '1';
          entry.target.classList.remove('translate-x-[-50%]', 'translate-x-[50%]', 'opacity-0');
          entry.target.classList.add('translate-x-0', 'opacity-100');
          console.log('Card visible:', entry.target.dataset.eventId); // Debug log
        }
      });
    }, observerOptions);

    // Fallback: Show cards after a delay if intersection observer fails
    const fallbackTimer = setTimeout(() => {
      cardRefs.current.forEach((ref) => {
        if (ref && ref.style.opacity === '0') {
          ref.style.transform = 'translateX(0)';
          ref.style.opacity = '1';
          ref.classList.remove('translate-x-[-50%]', 'translate-x-[50%]', 'opacity-0');
          ref.classList.add('translate-x-0', 'opacity-100');
          console.log('Fallback: Card shown:', ref.dataset.eventId); // Debug log
        }
      });
    }, 2000);

    // For mobile, show cards immediately if intersection observer is not supported
    if (isMobile && !window.IntersectionObserver) {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.transform = 'translateX(0)';
          ref.style.opacity = '1';
          ref.classList.remove('translate-x-[-50%]', 'translate-x-[50%]', 'opacity-0');
          ref.classList.add('translate-x-0', 'opacity-100');
        }
      });
    } else {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [isMobile]);

  const events = [
    {
      id: 1,
      title: "Upside Down",
      description: "Explore parallel dimensions and supernatural phenomena in this mind-bending workshop.",
      image: "/hole.png"
    },
    {
      id: 2,
      title: "Mind Flayer",
      description: "Dive into psychological horror and collective consciousness theories with experts.",
      image: "/ray.png"
    },
    {
      id: 3,
      title: "Demogorgon Hunt",
      description: "Learn survival strategies and monster tracking techniques in simulated environments.",
      image: "/copter.png"
    },
    {
      id: 4,
      title: "Eleven Powers",
      description: "Discover telekinetic abilities and psychic phenomena through scientific experiments.",
      image: "/experiment.png"
    },
    {
      id: 5,
      title: "Hawkins Lab",
      description: "Investigate government conspiracies and secret experiments in this immersive session.",
      image: "/lab.png"
    },
    {
      id: 6,
      title: "Vecna Curse",
      description: "Understand psychological trauma and supernatural curses through case studies.",
      image: "/red%20house.png"
    },
    {
      id: 7,
      title: "Starcourt Mall",
      description: "Experience 80s nostalgia and retro technology in this interactive exhibition.",
      image: "/mall.png"
    },
    {
      id: 8,
      title: "Byers House",
      description: "Explore haunted locations and supernatural investigations with paranormal experts.",
      image: "/house.png"
    }
  ];

  return (
    <div id="events" className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
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
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-400 to-red-300 to-red-200">
                EVENTS
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Discover a world of supernatural mysteries and cutting-edge technology
            </p>
          </div>

          {/* Events Grid */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-event-id={event.id}
                  className={`w-full sm:w-4/5 mx-auto transform transition-all duration-1000 ease-out events-card ${
                    isMobile 
                      ? 'translate-x-0 opacity-100' // Always visible on mobile
                      : isEven
                        ? 'translate-x-[-50%] opacity-0' // Reduced translate for mobile
                        : 'translate-x-[50%] opacity-0'   // Reduced translate for mobile
                  }`}
                  style={{
                    transform: isMobile ? 'translateX(0)' : (isEven ? 'translateX(-50%)' : 'translateX(50%)'),
                    opacity: isMobile ? 1 : 0
                  }}
                >
                  <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 sm:backdrop-blur-sm border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
                    {/* Background Image */}
                    <div 
                      className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${event.image})` }}
                    >
                      {/* Direction-aware dark reddish overlay */}
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isEven
                          ? 'bg-gradient-to-r from-black/80 via-red-950/60 to-black/40 group-hover:from-black/70 group-hover:via-red-900/50 group-hover:to-black/30'
                          : 'bg-gradient-to-l from-black/80 via-red-950/60 to-black/40 group-hover:from-black/70 group-hover:via-red-900/50 group-hover:to-black/30'
                      }`}></div>
                      
                      {/* Content (alternating sides) */}
                      <div className={`absolute inset-0 flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 ${
                        isEven ? 'items-start text-left' : 'items-end text-right'
                      }`}>
                        <div className={`max-w-2xl ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                          {/* Event number */}
                          <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 ${
                            isEven ? '' : 'flex-row-reverse'
                          }`}>
                            <span className="text-red-400 font-bold text-xs sm:text-sm tracking-wider uppercase">Event {String(event.id).padStart(2, '0')}</span>
                            <div className="w-4 sm:w-6 md:w-8 h-px bg-red-400/50"></div>
                          </div>
                          
                          {/* Title with code-like transition */}
                          <h2 className={`font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight transition-all duration-500 ${
                            isEven ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'
                          } group-hover:text-red-100`}>
                            {event.title}
                          </h2>
                          
                          {/* Description smaller */}
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                            {event.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Funky red glow effect */}
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
