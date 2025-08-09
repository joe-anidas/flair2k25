import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroSequence from "./components/IntroSequence";
// import Snow from "./components/Snow";

const App = () => {

  return (
    <BrowserRouter>
      {/* <Snow /> */}
      <Routes>
        <Route path="/" element={<IntroSequence />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;