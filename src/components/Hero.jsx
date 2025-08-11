import React, { useEffect, useRef, useState } from 'react';
import hero from '/videos/hero.mov';
import logo from '/assets/flair.png';

const Hero = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.4;
          await audioRef.current.play();
          setAudioPlaying(true);
        }
      } catch (error) {
        // Audio autoplay failed, wait for user interaction
        const handleFirstInteraction = async () => {
          try {
            if (audioRef.current && !userInteracted) {
              setUserInteracted(true);
              audioRef.current.volume = 0.4;
              await audioRef.current.play();
              setAudioPlaying(true);
            }
          } catch (err) {
            console.log('Audio play failed:', err);
          }
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [userInteracted]);

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative min-h-screen overflow-hidden pt-16">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/audios/bg.mp3"
        preload="auto"
        loop
        style={{ display: 'none' }}
      />
      
      {/* Video Background */}
      <div className="absolute inset-0 top-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[calc(100%+60px)] object-cover -mt-[10px]"
        >
          <source src={hero} type="video/mp4" />
          <source src={hero} type="video/mov" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
<div className="relative z-10 h-screen flex flex-col">
  {/* Top Left - FLAIR-IT */}
    <div className="px-4 sm:px-6 md:px-8 lg:px-33 pt-8 sm:pt-12 md:pt-16" style={{ marginLeft: '-80px', marginTop: '-110px' }}>
   <img 
                     alt="Flair 2K25 logo with hexagonal shape and orange glowing effect" 
                     className="w-100 h-100 object-contain drop-shadow-lg" 
                     src={logo}
                   />

  </div>

  {/* Bottom Right - 2K25 */}
  <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 right-4 sm:right-6 md:right-8 lg:right-34 z-20">
  <div className="mt-4 sm:mt-6 md:mt-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
        Join us on
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-400 to-red-300 to-red-200">
          23rd August
        </span>
      </h2>
    </div>
  </div>
</div>


      {/* Animated background elements */}
      <div className="absolute inset-0 top-16 z-5 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-40 sm:w-56 md:w-64 lg:w-80 h-40 sm:h-56 md:h-64 lg:h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-36 sm:w-48 md:w-56 lg:w-72 h-36 sm:h-48 md:h-56 lg:h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default Hero;