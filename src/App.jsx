import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import Snow from "./components/Snow";

const App = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.3; // Set volume to 30% (adjust as needed)
          await audioRef.current.play();
        }
      } catch (error) {
        console.log("Autoplay prevented by browser:", error);
        // Fallback: play on first user interaction
        const handleFirstInteraction = async () => {
          try {
            if (audioRef.current) {
              await audioRef.current.play();
            }
          } catch (err) {
            console.log("Failed to play audio:", err);
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

    playAudio();
  }, []);

  return (
    <BrowserRouter>
      {/* Background music audio element */}
      <audio
        ref={audioRef}
        src="/bg.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
      
      {/* <Snow /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;