import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Home from "../pages/Home";

const IntroSequence = () => {
  const [currentStage, setCurrentStage] = useState("countdown"); // countdown, video, home
  const [count, setCount] = useState(0);
  const [videoPlayFailed, setVideoPlayFailed] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [netflixAudioPlaying, setNetflixAudioPlaying] = useState(false);
  const videoRef = useRef(null);
  const netflixAudioRef = useRef(null);
  const bgAudioRef = useRef(null);

  // Countdown effect
  useEffect(() => {
    if (currentStage === "countdown") {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCurrentStage("video");
            return 100;
          }
          return prev + 1;
        });
      }, 30); // 20ms for smooth animation

      return () => clearInterval(interval);
    }
  }, [currentStage]);

  // Video and Netflix audio autoplay effect (both simultaneously)
  useEffect(() => {
    if (currentStage === "video" && videoRef.current && netflixAudioRef.current) {
      const playVideoAndAudio = async () => {
        try {
          console.log("Attempting to play video and Netflix audio simultaneously...");
          
          // Set audio volume
          netflixAudioRef.current.volume = 0.5;
          
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
            document.removeEventListener('mouseenter', handleUserInteraction);
          };
          
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('keydown', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
          document.addEventListener('mouseenter', handleUserInteraction);
        }
      };
      
      playVideoAndAudio();
    }
  }, [currentStage, userInteracted]);

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

  // Video stage - Video + Netflix audio automatically
  if (currentStage === "video") {
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
          className="w-full h-full object-cover"
        >
          <source src="/videos/netflix.mp4" type="video/mp4" />
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
