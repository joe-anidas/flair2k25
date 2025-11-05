import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IntroSequence = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState("countdown");
  const [count, setCount] = useState(1);
  const bgAudioRef = useRef(null);

  // simple loading countdown — when complete, go to home
  useEffect(() => {
    if (currentStage === "countdown") {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCurrentStage("home");
            return 100;
          }
          return prev + 1;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [currentStage]);

  // when loading done, navigate to home and attempt to play bg audio (if used elsewhere)
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

  return null;
};

export default IntroSequence;