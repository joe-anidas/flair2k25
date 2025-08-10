
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroSequence from "./pages/Intro";
import Events from "./components/Events";
import EventDetailPage from "./pages/EventDetailPage";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroSequence />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventSlug" element={<EventDetailPage />} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;