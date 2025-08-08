import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import Snow from "./components/Snow";

const App = () => {
  return (
    <BrowserRouter>
        {/* <Snow /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
