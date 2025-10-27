import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogArticle from './components/BlogArticle';

function HomePage({ language }) {
  return (
    <>
      <Hero language={language} />
      <Services language={language} />
      <Portfolio language={language} />
      <Process language={language} />
      <Testimonials language={language} />
      <Blog language={language} />
      <Contact language={language} />
    </>
  );
}

function AppContent() {
  const [language, setLanguage] = useState('es');
  const location = useLocation();
  const isBlogArticle = location.pathname.startsWith('/blog/');

  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage language={language} />} />
          <Route path="/blog/:slug" element={<BlogArticle language={language} />} />
        </Routes>
      </main>
      {!isBlogArticle && <Footer language={language} />}
      {isBlogArticle && <Footer language={language} />}
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
