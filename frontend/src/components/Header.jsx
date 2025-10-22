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
    { label: 'Portfolio', labelEs: 'Portafolio', href: '#portfolio' },
    { label: 'Process', labelEs: 'Proceso', href: '#process' },
    { label: 'Testimonials', labelEs: 'Testimonios', href: '#testimonials' },
    { label: 'Blog', labelEs: 'Blog', href: '#blog' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-lg flex items-center justify-center font-bold text-lg transform group-hover:scale-110 transition-transform duration-300">
              GS
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">GlobalScale</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                {language === 'es' ? item.labelEs : item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* CTA and Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-gray-300 hover:text-white"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-6"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
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
            className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 py-2"
                >
                  {language === 'es' ? item.labelEs : item.label}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="text-gray-300 hover:text-white"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'ES' : 'EN'}
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white flex-1"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {language === 'es' ? 'Contáctanos' : 'Contact Us'}
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