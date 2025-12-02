import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    { label: 'Blog', labelEs: 'Blog', href: '#blog' },
    { label: 'Contact', labelEs: 'Contacto', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // If we're on blog article page, navigate to home first
    if (location.pathname.startsWith('/blog/')) {
      navigate('/' + href);
    } else {
      // Smooth scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

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
        <div className="flex items-center justify-center h-20 relative">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute left-0 flex items-center space-x-3 group cursor-pointer"
          >
            <div className="flex items-center">
              <span className="text-2xl font-light tracking-wider text-graphite group-hover:text-golden transition-colors duration-300">
                DONOSTI
              </span>
              <span className="ml-2 text-2xl font-light tracking-wider text-golden group-hover:opacity-80 transition-opacity duration-300">
                STRATEGIA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm tracking-wide text-gray-700 hover:text-golden transition-colors duration-200 font-light uppercase cursor-pointer"
              >
                {language === 'es' ? item.labelEs : item.label}
              </a>
            ))}
          </nav>

          {/* CTA and Language */}
          <div className="hidden lg:flex items-center space-x-4 absolute right-0">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-graphite hover:text-white hover:bg-golden transition-all duration-300 font-medium"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-graphite p-2 absolute right-0"
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
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-graphite hover:text-golden transition-colors py-2 uppercase text-sm tracking-wide cursor-pointer"
                >
                  {language === 'es' ? item.labelEs : item.label}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-graphite hover:text-white hover:bg-golden transition-all duration-300 font-medium"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'en' ? 'ES' : 'EN'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;