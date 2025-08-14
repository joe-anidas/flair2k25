import React, { useEffect, useRef, useState } from 'react';
import hero from '/videos/hero1.webm';
import logo from '/assets/flair.png';
import { motion } from "framer-motion";
import FuzzyText from '../ui/FuzzyText';

// Framer Motion variants adapted from 2K24 page.js
const herotextAnimation = {
  hidden: { opacity: 0, rotate: 0 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.2,
      duration: 1,
    },
  },
};

const Hero = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const dateWords = "23rd August".split(" ");

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

  // Play the hero video only after it's ready, show wallpaper until then
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlayThrough = async () => {
      setIsVideoReady(true);
      try {
        await videoElement.play();
      } catch (_) {
        // If autoplay is blocked, keep wallpaper until user interacts
      }
    };

    const handleLoadedData = async () => {
      if (!isVideoReady) {
        setIsVideoReady(true);
        try {
          await videoElement.play();
        } catch (_) {}
      }
    };

    videoElement.addEventListener('canplaythrough', handleCanPlayThrough);
    videoElement.addEventListener('loadeddata', handleLoadedData);

    return () => {
      videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isVideoReady]);

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
      
      {/* Video Background with wallpaper fallback */}
      <div className="absolute inset-0 top-0 z-0 overflow-hidden">
        {/* Wallpaper while video loads */}
        <div
          aria-hidden
          className="w-full h-[calc(100%+60px)] -mt-[10px]"
          style={{
            backgroundImage: 'url(/assets/wall.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Video fades in when ready */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-[calc(100%+60px)] object-cover -mt-[10px] transition-opacity duration-500"
          style={{ opacity: isVideoReady ? 1 : 0 }}
        >
          <source src={hero} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content - Mobile First Layout */}
      <div className="relative z-10 h-screen flex flex-col">
        
        {/* Mobile Layout - Centered Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:hidden">
          {/* Logo - Centered and Bigger on Mobile */}
          <div className="mb-8">
            <img 
              alt="Flair 2K25 logo with hexagonal shape and orange glowing effect" 
              className="w-80 h-80 object-contain drop-shadow-lg" 
              src={logo}
            />
          </div>

          {/* Join Us Text - Below Image and Smaller on Mobile */}
          <div className="text-center">
            <h2 
              className="text-lg font-bold text-white mb-2 leading-tight"
              style={{ fontFamily: 'STBold, sans-serif' }}
            >
              Join us on
            </h2>
            <motion.div initial="hidden" animate="visible" variants={herotextAnimation}>
              {dateWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75, delay: i / 10 }}
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-400 to-red-300 to-red-200"
                  style={{ fontFamily: 'STOutlined, serif' }}
                >
                  {word}
                  {" "}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Desktop/Tablet Layout - Original Design */}
        <div className="hidden sm:block">
          {/* Top Left - FLAIR-IT */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-33 pt-8 sm:pt-12 md:pt-16" style={{ marginLeft: '-80px', marginTop: '-110px' }}>
            <img 
              alt="Flair 2K25 logo with hexagonal shape and orange glowing effect" 
              className="w-100 h-100 object-contain drop-shadow-lg" 
              src={logo}
            />
          </div>

          {/* Bottom Right - 2K25 */}
          <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 right-8 sm:right-12 md:right-16 lg:right-20 z-20">
            <div className="mt-4 sm:mt-6 md:mt-8">
              <h2
                style={{ fontFamily: 'STBold, sans-serif' }} 
                className="text-1xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight flex flex-col items-center text-center"
              >
                <span>Join us on</span>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={herotextAnimation}
                  className="text-[3rem] sm:text-[3rem] mb-5 font-bold tracking-wide mix-blend-exclusion w-full text-center"
                >
                  <FuzzyText
                    fontSize="3rem"
                    fontWeight={900}
                    fontFamily="STOutlined, serif"
                    color="#d50b0c"
                    baseIntensity={0.08}
                    hoverIntensity={0.3}
                  >
                    23rd August
                  </FuzzyText>
                </motion.div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
