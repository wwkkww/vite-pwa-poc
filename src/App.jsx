import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Scanner from "./pages/Scanner";
import Welcome from "./pages/Welcome";

function App() {
  return <BrowserRouter>
  <Content />
  </BrowserRouter>;
}

const Content = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div
      className={transitionStage}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setDisplayLocation(location);
          setTransistionStage("fadeIn");
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Welcome />} />
        <Route path="/Scanner" element={<Scanner />} />
      </Routes>
    </div>
  );
};


export default App;
