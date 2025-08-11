import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Home from "./Home";

const IntroSequence = () => {
  const [currentStage, setCurrentStage] = useState("countdown"); // countdown, video, home
  const [count, setCount] = useState(1); // Start from 1 instead of 0
  const [videoPlayFailed, setVideoPlayFailed] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [netflixAudioPlaying, setNetflixAudioPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const netflixAudioRef = useRef(null);
  const bgAudioRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      console.log("Mobile device detected:", isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Countdown effect
  useEffect(() => {
    if (currentStage === "countdown") {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Skip video stage on mobile, go directly to home
            if (isMobile) {
              setCurrentStage("home");
            } else {
              setCurrentStage("video");
            }
            return 100;
          }
          return prev + 1;
        });
      }, 30); // 30ms for smooth animation

      return () => clearInterval(interval);
    }
  }, [currentStage, isMobile]);

  // Video and Netflix audio autoplay effect (both simultaneously) - Desktop only
  useEffect(() => {
    if (currentStage === "video" && !isMobile && videoRef.current && netflixAudioRef.current) {
      const playVideoAndAudio = async () => {
        try {
          console.log("Attempting to play video and Netflix audio simultaneously...");
          
          // Set audio volume
          netflixAudioRef.current.volume = 0.5;
          
          // For mobile, ensure video is properly configured
          if (videoRef.current) {
            videoRef.current.muted = true; // Must be muted for autoplay on mobile
            videoRef.current.playsInline = true;
            videoRef.current.webkitPlaysinline = true; // iOS Safari support
            videoRef.current.setAttribute('playsinline', 'true');
            videoRef.current.setAttribute('webkit-playsinline', 'true');
          }
          
          // Play both video and Netflix audio simultaneously
          await Promise.all([
            videoRef.current.play(),
            netflixAudioRef.current.play()
          ]);
          
          setNetflixAudioPlaying(true);
          console.log("Video and Netflix audio play successful");
        } catch (error) {
          console.log("Autoplay failed:", error);
          // If autoplay fails, wait for user interaction
          const handleUserInteraction = async () => {
            try {
              if (!userInteracted) {
                setUserInteracted(true);
                netflixAudioRef.current.volume = 0.5;
                
                // Ensure video is properly configured for mobile
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  videoRef.current.playsInline = true;
                  videoRef.current.webkitPlaysinline = true;
                }
                
                await Promise.all([
                  videoRef.current.play(),
                  netflixAudioRef.current.play()
                ]);
                setNetflixAudioPlaying(true);
                console.log("Video and Netflix audio started on user interaction");
              }
            } catch (err) {
              console.log("Video/audio play failed even with user interaction:", err);
              setVideoPlayFailed(true);
            }
            // Remove listeners after first interaction
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('mouseenter', handleUserInteraction); // Remove mouseenter for mobile
          };
          
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('keydown', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
          document.removeEventListener('mouseenter', handleUserInteraction); // Remove mouseenter for mobile
        }
      };
      
      playVideoAndAudio();
    }
  }, [currentStage, userInteracted, isMobile]);

  // Video ended handler
  const handleVideoEnd = () => {
    // Stop Netflix audio if it's playing
    if (netflixAudioRef.current && netflixAudioPlaying) {
      netflixAudioRef.current.pause();
      netflixAudioRef.current.currentTime = 0;
      setNetflixAudioPlaying(false);
    }
    setCurrentStage("home");
  };

  // Video play handler
  const handleVideoPlay = () => {
    console.log("Video started playing");
  };

  // Video error handler
  const handleVideoError = (error) => {
    console.log("Video failed to load:", error);
    console.log("Video element:", videoRef.current);
    setCurrentStage("home");
  };

  // Background music setup effect - only start after hero page is shown
  useEffect(() => {
    const playBgAudio = async () => {
      try {
        if (bgAudioRef.current) {
          bgAudioRef.current.volume = 0.3;
          await bgAudioRef.current.play();
          console.log("Background music started");
        }
      } catch (error) {
        console.log("Background music autoplay prevented by browser:", error);
        // Fallback: play on first user interaction after hero page is shown
        const handleFirstInteraction = async () => {
          try {
            if (bgAudioRef.current) {
              await bgAudioRef.current.play();
              console.log("Background music started on user interaction");
            }
          } catch (err) {
            console.log("Failed to play background music:", err);
          }
          // Remove listeners after first interaction
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
      }
    };

    // Start background music only when we reach the home stage (hero page)
    if (currentStage === "home") {
      playBgAudio();
    }
  }, [currentStage]);

  // Countdown stage
  if (currentStage === "countdown") {
    return (
      <div className="h-screen flex justify-center items-center bg-black text-white relative overflow-hidden">
        {/* Stranger Things-style background elements */}
        <div className="absolute inset-0 opacity-30">
          {/* Enhanced grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
          
          {/* Enhanced eerie corner glows */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-red-600/30 via-red-800/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-600/30 via-blue-800/20 to-transparent rounded-full blur-3xl" />
          
          {/* Additional atmospheric glows */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-l from-cyan-600/20 to-transparent rounded-full blur-2xl" />
        </div>

        {/* Main countdown number with enhanced Stranger Things styling */}
        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 0.3, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          className="relative z-10"
        >
          <motion.span
            className="text-[12rem] font-black text-white tracking-[0.2em] leading-none"
            style={{
              textShadow: `
                0 0 20px rgba(255, 255, 255, 0.8),
                0 0 40px rgba(255, 255, 255, 0.6),
                0 0 60px rgba(255, 255, 255, 0.4),
                0 0 80px rgba(255, 255, 255, 0.2),
                0 0 100px rgba(255, 255, 255, 0.1),
                0 0 120px rgba(255, 255, 255, 0.05)
              `,
              fontFamily: '"Courier New", "Monaco", "Menlo", monospace',
              WebkitTextStroke: '3px rgba(255, 255, 255, 0.2)',
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))'
            }}
          >
            {count}
          </motion.span>
          
          {/* Enhanced percentage symbol */}
          <motion.span
            key={`percent-${count}`}
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="text-8xl font-bold text-white/90 ml-6 inline-block"
            style={{
              textShadow: `
                0 0 20px rgba(255, 255, 255, 0.7),
                0 0 40px rgba(255, 255, 255, 0.4),
                0 0 60px rgba(255, 255, 255, 0.2)
              `,
              fontFamily: '"Courier New", "Monaco", "Menlo", monospace',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.15)'
            }}
          >
            %
          </motion.span>
        </motion.div>

        {/* Enhanced floating particles for Stranger Things atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 0.9, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 6,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                backgroundColor: `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`,
                filter: 'blur(0.5px)',
                boxShadow: `0 0 ${3 + Math.random() * 5}px rgba(255, 255, 255, 0.6)`
              }}
            />
          ))}
        </div>

        {/* Enhanced progress bar with Stranger Things styling */}
        <motion.div
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-white/10 rounded-full overflow-hidden border border-white/20"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-white via-white/90 to-white/70 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              boxShadow: `
                0 0 20px rgba(255, 255, 255, 0.6),
                0 0 40px rgba(255, 255, 255, 0.3)
              `
            }}
          />
        </motion.div>

        {/* Loading text with Stranger Things typography */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span 
            className="text-lg text-white/70 tracking-wider uppercase"
            style={{
              fontFamily: '"Courier New", "Monaco", "Menlo", monospace',
              letterSpacing: '0.3em'
            }}
          >
            Loading...
          </span>
        </motion.div>
      </div>
    );
  }

  // Video stage - Video + Netflix audio automatically (Desktop only)
  if (currentStage === "video" && !isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <video
          ref={videoRef}
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          onPlay={handleVideoPlay}
          autoPlay
          playsInline
          muted={true} // Keep video muted - audio handled separately
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        >

          <source src="/videos/netflix.webm" type="video/webm" />
       
          Your browser does not support the video tag.
        </video>
        
        {/* Netflix audio element - plays automatically with video */}
        <audio
          ref={netflixAudioRef}
          src="/audios/netflix.mpeg" // Using bg.mp3 as Netflix audio for now
          preload="auto"
          style={{ display: 'none' }}
        />
        
        {videoPlayFailed && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
            </div>
          </div>
        )}
      </div>
    );
  }

  // Home stage
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background music audio element - only plays after hero page is shown */}
      <audio
        ref={bgAudioRef}
        src="/audios/bg.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
      <Home />
    </motion.div>
  );
};

export default IntroSequence;
