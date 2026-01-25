import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<About />} />  
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}
