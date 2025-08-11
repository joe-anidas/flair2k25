import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IntroSequence from "./pages/Intro";
import Home from "./pages/Home";
import EventDetailPage from "./pages/EventDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroSequence />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events/:eventSlug" element={<EventDetailPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;