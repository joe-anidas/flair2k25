import React, { useEffect, useRef } from 'react';
import Snow from './Snow';

const Events = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0, // fire as soon as it appears
      rootMargin: '0px 0px -50px 0px' // trigger earlier
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('-translate-x-full', 'translate-x-full', 'opacity-0');
          entry.target.classList.add('translate-x-0', 'opacity-100');
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const events = [
    {
      id: 1,
      title: "Upside Down",
      description: "Explore parallel dimensions and supernatural phenomena in this mind-bending workshop.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Mind Flayer",
      description: "Dive into psychological horror and collective consciousness theories with experts.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Demogorgon Hunt",
      description: "Learn survival strategies and monster tracking techniques in simulated environments.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Eleven Powers",
      description: "Discover telekinetic abilities and psychic phenomena through scientific experiments.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Hawkins Lab",
      description: "Investigate government conspiracies and secret experiments in this immersive session.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Vecna Curse",
      description: "Understand psychological trauma and supernatural curses through case studies.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop"
    },
    {
      id: 7,
      title: "Starcourt Mall",
      description: "Experience 80s nostalgia and retro technology in this interactive exhibition.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    },
    {
      id: 8,
      title: "Byers House",
      description: "Explore haunted locations and supernatural investigations with paranormal experts.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop"
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
        <div className="absolute top-20 left-10 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 sm:w-56 md:w-64 lg:w-80 h-40 sm:h-56 md:h-64 lg:h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 sm:w-48 md:w-56 lg:w-72 h-36 sm:h-48 md:h-56 lg:h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 sm:mb-20">
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
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {events.map((event, index) => (
              <div
                key={event.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`w-full sm:w-4/5 mx-auto transform transition-all duration-1000 ease-out ${
                  index % 2 === 0 
                    ? 'sm:-translate-x-full sm:opacity-0' 
                    : 'sm:translate-x-full sm:opacity-0'
                }`}
              >
                <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
                  {/* Background Image */}
                  <div 
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${event.image})` }}
                  >
                    {/* Dark reddish overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-950/60 to-black/40 group-hover:from-black/70 group-hover:via-red-900/50 group-hover:to-black/30 transition-all duration-500"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                      <div className="max-w-2xl">
                        {/* Event number */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <span className="text-red-400 font-bold text-xs sm:text-sm tracking-wider uppercase">Event {String(event.id).padStart(2, '0')}</span>
                          <div className="w-6 sm:w-8 h-px bg-red-400/50"></div>
                        </div>
                        
                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight group-hover:text-red-100 transition-colors duration-300">
                          {event.title}
                        </h2>
                        
                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Funky red glow effect */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Events;
