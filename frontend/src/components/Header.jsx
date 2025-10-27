import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Services', labelEs: 'Servicios', href: '#services' },
    { label: 'Projects', labelEs: 'Proyectos', href: '#projects' },
    { label: 'Process', labelEs: 'Proceso', href: '#process' },
    { label: 'About', labelEs: 'Nosotros', href: '#about' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="flex items-center">
              <span className="text-2xl font-light tracking-wider text-graphite">
                AUREUM
              </span>
              <span className="ml-2 text-2xl font-light tracking-wider text-golden">
                DIGITAL
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm tracking-wide text-gray-700 hover:text-golden transition-colors duration-200 font-light uppercase"
              >
                {language === 'es' ? item.labelEs : item.label}
              </a>
            ))}
          </nav>

          {/* CTA and Language */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-gray-700 hover:text-golden"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
            <Button
              className="bg-graphite hover:bg-golden text-white px-6 transition-all duration-300"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              {language === 'es' ? 'Contacto' : 'Contact'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-graphite p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-graphite hover:text-golden transition-colors py-2 uppercase text-sm tracking-wide"
                >
                  {language === 'es' ? item.labelEs : item.label}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="text-graphite"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'ES' : 'EN'}
                </Button>
                <Button
                  className="bg-graphite hover:bg-golden text-white flex-1"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {language === 'es' ? 'Contacto' : 'Contact'}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;