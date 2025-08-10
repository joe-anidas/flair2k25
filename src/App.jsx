import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroSequence from "./pages/Intro";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroSequence />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;