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

    if (location.pathname.startsWith('/blog/')) {
      navigate('/' + href);
    } else {
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
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-between sm:h-20 lg:justify-center">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex min-w-0 items-center gap-1 sm:gap-2 cursor-pointer lg:absolute lg:left-0"
          >
            <span className="header-letter-glow truncate text-[1.45rem] font-light tracking-[0.08em] text-golden sm:text-2xl sm:tracking-wider">AI</span>
            <span className="header-letter-glow truncate text-[1.45rem] font-light tracking-[0.08em] text-golden sm:text-2xl sm:tracking-wider">STRATEGY</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="header-letter-glow text-[1rem] font-normal uppercase tracking-[0.14em] text-golden cursor-pointer transition-colors duration-200"
              >
                {language === 'es' ? item.labelEs : item.label}
              </a>
            ))}
          </nav>

          <div className="absolute right-0 hidden lg:flex items-center">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="header-letter-glow inline-flex items-center gap-2 rounded-md border border-[#d4af37]/45 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-golden transition-all duration-300 hover:border-[#f0cf74] hover:text-[#f0cf74]"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          <button
            aria-label="Open menu"
            className="rounded-md p-2.5 text-golden transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white lg:hidden"
          >
            <nav className="container mx-auto flex flex-col space-y-4 px-4 py-6">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="header-letter-glow py-2 text-sm uppercase tracking-wide text-golden cursor-pointer"
                >
                  {language === 'es' ? item.labelEs : item.label}
                </a>
              ))}
              <div className="flex items-center border-t border-gray-200 pt-4">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="header-letter-glow inline-flex items-center gap-2 rounded-md border border-[#d4af37]/45 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-golden"
                >
                  <Globe className="h-4 w-4" />
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
