import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-edara/" element={<About />} />
        <Route path="/services-edara" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollToTopButton/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;