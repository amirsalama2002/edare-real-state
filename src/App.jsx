import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from "./components/ScrollToTopButton";
import AjmanProperties from "./components/AjmanProperties";
import HeritageAjmanProperties from "./components/HeritageAjmanProperties";
import GlobalDiscoverSection from "./components/GlobalDiscoverSection";
import OurCommunities from "./components/OurCommunities";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties/ajman" element={<AjmanProperties/>} />
        <Route path="/about-edara/" element={<About />} />
        <Route path="/services-edara" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/discover-Luxury-edara" element={<HeritageAjmanProperties/>} />
        <Route path="/discover-Global-edara" element={<GlobalDiscoverSection />} />
          <Route path="/communities" element={<OurCommunities />} />
      </Routes>
      <ScrollToTopButton/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;