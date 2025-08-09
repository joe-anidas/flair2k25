import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Home from "../pages/Home";

const IntroSequence = () => {
  const [currentStage, setCurrentStage] = useState("countdown"); // countdown, video, home
  const [count, setCount] = useState(0);
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
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <motion.span
          key={count}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-8xl font-bold text-white drop-shadow-2xl"
          style={{
            textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)'
          }}
        >
          {count}%
        </motion.span>
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
          <source src="/videos/netflix.mp4" type="video/mp4" />
          <source src="/videos/netflix.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
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
