import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ConsentModal from "./components/ConsentModal";
import Home from "./pages/Home";
import DowryAwareness from "./pages/DowryAwareness";
import AlimonyEstimator from "./pages/AlimonyEstimator";
import LegalAwareness from "./pages/LegalAwareness";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-warm-white">
        <ConsentModal />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dowry-awareness" element={<DowryAwareness />} />
            <Route path="/alimony-estimator" element={<AlimonyEstimator />} />
            <Route path="/legal-awareness" element={<LegalAwareness />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
