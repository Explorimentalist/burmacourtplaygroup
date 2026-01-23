
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app/globals.css'; // Import global styles including custom font
import Home from './pages/Home';
import About from './pages/About';
import ContactPage from './pages/Contact';
import Terms from './pages/Terms';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      {/* ScrollToTop must be inside Router to access useLocation() */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
};

export default App;
