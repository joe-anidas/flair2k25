import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IntroSequence = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState("countdown");
  const [count, setCount] = useState(1);
  const [videoPlayFailed, setVideoPlayFailed] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [netflixAudioPlaying, setNetflixAudioPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const netflixAudioRef = useRef(null);
  const bgAudioRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (currentStage === "countdown") {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            if (isMobile) {
              setCurrentStage("home");
            } else {
              setCurrentStage("video");
            }
            return 100;
          }
          return prev + 1;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [currentStage, isMobile]);

  useEffect(() => {
    if (currentStage === "video" && !isMobile && videoRef.current && netflixAudioRef.current) {
      const playVideoAndAudio = async () => {
        try {
          netflixAudioRef.current.volume = 0.5;
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.playsInline = true;
            videoRef.current.setAttribute('playsinline', 'true');
          }
          
          await Promise.all([
            videoRef.current.play(),
            netflixAudioRef.current.play()
          ]);
          
          setNetflixAudioPlaying(true);
        } catch (error) {
          const handleUserInteraction = async () => {
            try {
              if (!userInteracted) {
                setUserInteracted(true);
                netflixAudioRef.current.volume = 0.5;
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  videoRef.current.playsInline = true;
                }
                
                await Promise.all([
                  videoRef.current.play(),
                  netflixAudioRef.current.play()
                ]);
                setNetflixAudioPlaying(true);
              }
            } catch (err) {
              setVideoPlayFailed(true);
            }
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
          };
          
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('keydown', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
        }
      };
      
      playVideoAndAudio();
    }
  }, [currentStage, userInteracted, isMobile]);

  const handleVideoEnd = () => {
    if (netflixAudioRef.current && netflixAudioPlaying) {
      netflixAudioRef.current.pause();
      netflixAudioRef.current.currentTime = 0;
      setNetflixAudioPlaying(false);
    }
    setCurrentStage("home");
  };

  const handleVideoError = () => {
    setCurrentStage("home");
  };

  useEffect(() => {
    const playBgAudio = async () => {
      try {
        if (bgAudioRef.current) {
          bgAudioRef.current.volume = 0.3;
          await bgAudioRef.current.play();
        }
      } catch (error) {
        const handleFirstInteraction = async () => {
          try {
            if (bgAudioRef.current) {
              await bgAudioRef.current.play();
            }
          } catch (err) {}
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
      }
    };

    if (currentStage === "home") {
      playBgAudio();
      navigate("/home");
    }
  }, [currentStage, navigate]);

  if (currentStage === "countdown") {
    return (
      <div className="h-screen flex justify-center items-center bg-black text-white relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span 
            className="text-2xl text-white/90 tracking-wider uppercase"
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

  if (currentStage === "video" && !isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <video
          ref={videoRef}
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          autoPlay
          playsInline
          muted={true}
          className="w-full h-full object-cover"
        >
          <source src="/videos/netflix.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        <audio
          ref={netflixAudioRef}
          src="/audios/netflix.mpeg"
          preload="auto"
          style={{ display: 'none' }}
        />
      </div>
    );
  }

  return null;
};

export default IntroSequence;