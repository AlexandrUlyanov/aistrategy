import React, { useState } from "react";
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

function App() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <Services language={language} />
        <Portfolio language={language} />
        <Process language={language} />
        <Testimonials language={language} />
        <Blog language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
