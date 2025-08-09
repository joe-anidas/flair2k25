import React, { useEffect, useRef, useState } from 'react';
import Snow from './Snow';

const Events = () => {
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState('lg');

  useEffect(() => {
    // Detect screen size with more granular breakpoints
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      
      if (width <= 480) {
        setScreenSize('xs');
      } else if (width <= 768) {
        setScreenSize('sm');
      } else if (width <= 1024) {
        setScreenSize('md');
      } else if (width <= 1280) {
        setScreenSize('lg');
      } else {
        setScreenSize('xl');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: screenSize === 'xs' ? 0.1 : screenSize === 'sm' ? 0.15 : 0.2,
      rootMargin: screenSize === 'xs' ? '-10% 0px -10% 0px' : '-5% 0px -5% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate in - only once, no reverse animation
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.opacity = '1';
          entry.target.classList.remove('translate-x-[-50%]', 'translate-x-[50%]', 'opacity-0');
          entry.target.classList.add('translate-x-0', 'opacity-100');
          
          // Mark as animated and stop observing this element
          entry.target.setAttribute('data-animated', 'true');
          observer.unobserve(entry.target);
          
          console.log('Card visible:', entry.target.dataset.eventId);
        }
      });
    }, observerOptions);

    // Initialize cards in hidden state (except mobile)
    cardRefs.current.forEach((ref, index) => {
      if (ref && !isMobile && !ref.getAttribute('data-animated')) {
        const isEven = index % 2 === 0;
        const translateValue = isEven ? 'translateX(-30%)' : 'translateX(30%)';
        ref.style.transform = translateValue;
        ref.style.opacity = '0';
        ref.classList.add(
          isEven ? 'translate-x-[-50%]' : 'translate-x-[50%]', 
          'opacity-0'
        );
        ref.classList.remove('translate-x-0', 'opacity-100');
      } else if (ref && isMobile) {
        // Mobile: always visible
        ref.style.transform = 'translateX(0)';
        ref.style.opacity = '1';
        ref.classList.add('translate-x-0', 'opacity-100');
        ref.classList.remove('translate-x-[-50%]', 'translate-x-[50%]', 'opacity-0');
      }
    });

    // Only observe if not mobile and intersection observer is supported
    if (!isMobile && window.IntersectionObserver) {
      cardRefs.current.forEach((ref) => {
        if (ref && !ref.getAttribute('data-animated')) {
          observer.observe(ref);
        }
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile, screenSize]);

  const events = [
    {
      id: 1,
      title: "Upside Down",
      description: "Explore parallel dimensions and supernatural phenomena in this mind-bending workshop.",
      image: "/events/hole.png",
      venue: "Main Auditorium",
      time: "09:00 AM - 11:00 AM",
      date: "Day 1",
      tag: "technical"
    },
    { 
      id: 2,
      title: "Mind Flayer",
      description: "Dive into psychological horror and collective consciousness theories with experts.",
      image: "/events/ray.png",
      venue: "Conference Hall A",
      time: "11:30 AM - 01:30 PM",
      date: "Day 1",
      tag: "non-technical"
    },
    {
      id: 3,
      title: "Demogorgon Hunt",
      description: "Learn survival strategies and monster tracking techniques in simulated environments.",
      image: "/events/copter.png",
      venue: "Outdoor Arena",
      time: "02:00 PM - 04:00 PM",
      date: "Day 1",
      tag: "technical"
    },
    {
      id: 4,
      title: "Eleven Powers",
      description: "Discover telekinetic abilities and psychic phenomena through scientific experiments.",
      image: "/events/experiment.png",
      venue: "Science Lab",
      time: "04:30 PM - 06:30 PM",
      date: "Day 1",
      tag: "technical"
    },
    {
      id: 5,
      title: "Hawkins Lab",
      description: "Investigate government conspiracies and secret experiments in this immersive session.",
      image: "/events/lab.png",
      venue: "Research Center",
      time: "09:00 AM - 11:00 AM",
      date: "Day 2",
      tag: "technical"
    },
    {
      id: 6,
      title: "Vecna Curse",
      description: "Understand psychological trauma and supernatural curses through case studies.",
      image: "/events/red%20house.png",
      venue: "Seminar Room B",
      time: "11:30 AM - 01:30 PM",
      date: "Day 2",
      tag: "non-technical"
    },
    {
      id: 7,
      title: "Starcourt Mall",
      description: "Experience 80s nostalgia and retro technology in this interactive exhibition.",
      image: "/events/mall.png",
      venue: "Exhibition Hall",
      time: "02:00 PM - 04:00 PM",
      date: "Day 2",
      tag: "non-technical"
    },
    {
      id: 8,
      title: "Byers House",
      description: "Explore haunted locations and supernatural investigations with paranormal experts.",
      image: "/events/house.png",
      venue: "Haunted House Setup",
      time: "04:30 PM - 06:30 PM",
      date: "Day 2",
      tag: "non-technical"
    }
  ];

  // Get responsive classes based on screen size
  const getResponsiveClasses = () => {
    switch (screenSize) {
      case 'xs':
        return {
          container: 'px-2 sm:px-4',
          cardWidth: 'w-11/12', // Reduced from w-full to w-11/12 (~91.7%)
          spacing: 'space-y-4',
          padding: 'p-3 sm:p-4',
          headerText: 'text-3xl sm:text-4xl',
          subText: 'text-base sm:text-lg',
          cardHeight: 'h-56 sm:h-64',
          titleSize: 'text-lg sm:text-xl',
          descSize: 'text-xs sm:text-sm'
        };
      case 'sm':
        return {
          container: 'px-3 sm:px-6',
          cardWidth: 'w-5/6 sm:w-4/5', // Reduced from w-11/12 to w-5/6 (~83.3%) and w-4/5 (80%)
          spacing: 'space-y-6',
          padding: 'p-4 sm:p-6',
          headerText: 'text-4xl sm:text-5xl',
          subText: 'text-lg sm:text-xl',
          cardHeight: 'h-64 sm:h-72',
          titleSize: 'text-xl sm:text-2xl',
          descSize: 'text-sm sm:text-base'
        };
      case 'md':
        return {
          container: 'px-4 md:px-8',
          cardWidth: 'w-5/6 md:w-4/5', // Reduced from w-11/12 to w-5/6 and w-4/5
          spacing: 'space-y-8',
          padding: 'p-6 md:p-8',
          headerText: 'text-5xl md:text-6xl',
          subText: 'text-xl md:text-2xl',
          cardHeight: 'h-72 md:h-80',
          titleSize: 'text-2xl md:text-3xl',
          descSize: 'text-base md:text-lg'
        };
      case 'lg':
        return {
          container: 'px-6 lg:px-12',
          cardWidth: 'w-5/6 lg:w-4/5', // Reduced from w-11/12 to w-5/6 and w-4/5
          spacing: 'space-y-10',
          padding: 'p-8 lg:p-10',
          headerText: 'text-6xl lg:text-7xl',
          subText: 'text-xl lg:text-2xl',
          cardHeight: 'h-80 lg:h-96',
          titleSize: 'text-3xl lg:text-4xl',
          descSize: 'text-lg lg:text-xl'
        };
      default: // xl and above
        return {
          container: 'px-8 xl:px-16',
          cardWidth: 'w-5/6 xl:w-4/5', // Reduced from w-11/12 to w-5/6 and w-4/5
          spacing: 'space-y-12',
          padding: 'p-10 xl:p-12',
          headerText: 'text-7xl xl:text-8xl',
          subText: 'text-2xl xl:text-3xl',
          cardHeight: 'h-96 xl:h-[28rem]',
          titleSize: 'text-4xl xl:text-5xl',
          descSize: 'text-xl xl:text-2xl'
        };
    }
  };

  const responsiveClasses = getResponsiveClasses();

  return (
    <div id="events" className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
      {/* Snow Background */}
      <div className="absolute inset-0 z-0">
        <Snow />
      </div>
      
      {/* Funky Red Background Elements - Responsive */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-10 left-5 ${
          screenSize === 'xs' ? 'w-48 h-48' : 
          screenSize === 'sm' ? 'w-64 h-64' : 
          screenSize === 'md' ? 'w-80 h-80' : 
          'w-96 h-96'
        } bg-red-500/10 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-10 right-5 ${
          screenSize === 'xs' ? 'w-40 h-40' : 
          screenSize === 'sm' ? 'w-56 h-56' : 
          screenSize === 'md' ? 'w-72 h-72' : 
          'w-80 h-80'
        } bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          screenSize === 'xs' ? 'w-32 h-32' : 
          screenSize === 'sm' ? 'w-48 h-48' : 
          screenSize === 'md' ? 'w-64 h-64' : 
          'w-72 h-72'
        } bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-500`}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-12 sm:py-16 md:py-20">
        <div className={`max-w-8xl mx-auto ${responsiveClasses.container}`}>
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className={`${responsiveClasses.headerText} font-bold text-white mb-4 sm:mb-6 tracking-tight`}>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-400 to-red-300 to-red-200">
                EVENTS TIMELINE
              </span>
            </h1>
            <p className={`${responsiveClasses.subText} text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4`}>
              Discover a world of supernatural mysteries and cutting-edge technology across two exciting days
            </p>
          </div>

          {/* Timeline Roadmap */}
          <div className="mb-16">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-500 via-red-400 to-red-300 h-full rounded-full"></div>
              
              {/* Timeline Events */}
              <div className="space-y-8">
                {events.map((event, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={event.id}
                      ref={(el) => (cardRefs.current[index] = el)}
                      data-event-id={event.id}
                      className={`relative flex items-center ${
                        isEven ? 'flex-row' : 'flex-row-reverse'
                      } ${responsiveClasses.cardWidth} mx-auto transform transition-all duration-[1800ms] ease-in-out events-card ${
                        isMobile 
                          ? 'translate-x-0 opacity-100'
                          : 'opacity-0' // Start hidden, let intersection observer handle positioning
                      }`}
                      style={{
                        // Initial state - hidden for desktop, visible for mobile
                        transform: isMobile ? 'translateX(0)' : (isEven ? 'translateX(-30%)' : 'translateX(30%)'),
                        opacity: isMobile ? 1 : 0
                      }}
                    >
                      {/* Timeline Node */}
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-black shadow-lg z-10 ${
                        isEven ? 'animate-pulse' : 'animate-pulse delay-300'
                      }`}></div>
                      
                      {/* Event Card */}
                      <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                        <div className={`relative group overflow-hidden ${
                          screenSize === 'xs' ? 'rounded-lg' : 'rounded-xl sm:rounded-2xl'
                        } bg-white/5 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40 transition-all duration-800 ease-in-out hover:shadow-2xl hover:shadow-red-500/20`}>
                          {/* Background Image */}
                          <div 
                            className={`w-full ${responsiveClasses.cardHeight} bg-cover bg-center relative`}
                            style={{ backgroundImage: `url(${event.image})` }}
                          >
                            {/* Direction-aware dark reddish overlay */}
                            <div className={`absolute inset-0 transition-all duration-900 ease-in-out ${
                              isEven
                                ? 'bg-gradient-to-r from-black/80 via-red-950/60 to-black/40 group-hover:from-black/70 group-hover:via-red-900/50 group-hover:to-black/30'
                                : 'bg-gradient-to-l from-black/80 via-red-950/60 to-black/40 group-hover:from-black/70 group-hover:via-red-900/50 group-hover:to-black/30'
                            }`}></div>
                            
                            {/* Content */}
                            <div className={`absolute inset-0 flex flex-col justify-center ${responsiveClasses.padding} ${
                              isEven ? 'items-start text-left' : 'items-end text-right'
                            }`}>
                              <div className={`max-w-full ${
                                isEven ? (screenSize === 'xs' || screenSize === 'sm' ? '' : 'md:pr-4') : 
                                         (screenSize === 'xs' || screenSize === 'sm' ? '' : 'md:pl-4')
                              }`}>
                                {/* Event number and tag */}
                                <div className={`flex items-center justify-between ${
                                  screenSize === 'xs' ? 'gap-1' : 'gap-2 sm:gap-3 md:gap-4'
                                } mb-2 sm:mb-3 md:mb-4 ${
                                  isEven ? '' : 'flex-row-reverse'
                                }`}>
                                  <span className={`text-red-400 font-bold ${
                                    screenSize === 'xs' ? 'text-xs' : 'text-xs sm:text-sm'
                                  } tracking-wider uppercase`}>Event {String(event.id).padStart(2, '0')}</span>
                                  
                                  {/* Tag */}
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    event.tag === 'technical' 
                                      ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' 
                                      : 'bg-green-500/20 text-green-300 border border-green-400/30'
                                  }`}>
                                    {event.tag === 'technical' ? 'Technical' : 'Non-Technical'}
                                  </span>
                                </div>
                                
                                {/* Title */}
                                <h2 className={`font-mono ${responsiveClasses.titleSize} font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight transition-all duration-700 ease-in-out ${
                                  isEven ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'
                                } group-hover:text-red-100`}>
                                  {event.title}
                                </h2>
                                
                                {/* Description */}
                                <p className={`${responsiveClasses.descSize} text-gray-200 leading-relaxed group-hover:text-gray-100 transition-colors duration-600 ease-in-out mb-3`}>
                                  {event.description}
                                </p>
                                
                                {/* Event Details */}
                                <div className={`space-y-1 ${
                                  isEven ? 'text-left' : 'text-right'
                                }`}>
                                  {/* Date */}
                                  <div className={`flex items-center ${isEven ? 'justify-start' : 'justify-end'} gap-2`}>
                                    <span className="text-red-400 text-xs font-semibold">📅</span>
                                    <span className="text-white text-xs font-medium">{event.date}</span>
                                  </div>
                                  
                                  {/* Time */}
                                  <div className={`flex items-center ${isEven ? 'justify-start' : 'justify-end'} gap-2`}>
                                    <span className="text-red-400 text-xs font-semibold">⏰</span>
                                    <span className="text-white text-xs font-medium">{event.time}</span>
                                  </div>
                                  
                                  {/* Venue */}
                                  <div className={`flex items-center ${isEven ? 'justify-start' : 'justify-end'} gap-2`}>
                                    <span className="text-red-400 text-xs font-semibold">📍</span>
                                    <span className="text-white text-xs font-medium">{event.venue}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Funky red glow effect */}
                            <div className={`absolute inset-0 ${
                              screenSize === 'xs' ? 'rounded-lg' : 'rounded-xl sm:rounded-2xl'
                            } bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out`}></div>
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
      </div>
    </div>
  );
};

export default Events;