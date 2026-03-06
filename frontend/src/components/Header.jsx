import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { trackEvent } from '../lib/analytics';

const NAV_ITEMS = [
  { label: 'Services', labelEs: 'Servicios', to: '/services' },
  { label: 'Work', labelEs: 'Proyectos', to: '/work' },
  { label: 'Process', labelEs: 'Proceso', to: '/process' },
  { label: 'Insights', labelEs: 'Insights', to: '/insights' },
  { label: 'About', labelEs: 'Nosotros', to: '/about' },
  { label: 'Contact', labelEs: 'Contacto', to: '/contact' }
];

const Header = ({ language, setLanguage }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onEsc = (event) => event.key === 'Escape' && setMobileOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('keydown', onEsc);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', onEsc);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(`${to}/`);

  const onLanguageSwitch = () => {
    const nextLanguage = language === 'en' ? 'es' : 'en';
    trackEvent('language_switch', { from: language, to: nextLanguage, source: 'header' });
    setLanguage(nextLanguage);
  };

  const onNavClick = (target, source = 'header') => {
    trackEvent('nav_click', {
      target,
      source,
      language,
      device: mobileOpen ? 'mobile' : 'desktop'
    });
    setMobileOpen(false);
  };

  return (
    <header className={`hdr ${scrolled ? 'is-scrolled' : ''}`} role="banner">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.36 }}
        className="hdr-shell"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="hdr-row">
            <Link to="/" className="hdr-brand" onClick={() => onNavClick('/', 'logo')} aria-label="VIDRAI home">
              <span className="hdr-brand-mark">VIDRAI</span>
              <span className="hdr-brand-sub">STRATEGY SYSTEMS</span>
            </Link>

            <nav className="hdr-nav" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => onNavClick(item.to, 'desktop_nav')}
                  className={`hdr-link ${isActive(item.to) ? 'is-active' : ''}`}
                >
                  {language === 'es' ? item.labelEs : item.label}
                </Link>
              ))}
            </nav>

            <div className="hdr-tools">
              <button
                type="button"
                onClick={onLanguageSwitch}
                className="hdr-lang"
                aria-label={language === 'en' ? 'Cambiar a espanol' : 'Switch to English'}
              >
                <Globe size={15} />
                {language === 'en' ? 'ES' : 'EN'}
              </button>
              <button
                type="button"
                className="hdr-menu-btn"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="hdr-mobile-panel"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="hdr-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="hdr-mobile-panel"
              className="hdr-mobile"
              role="dialog"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 22 }}
              transition={{ duration: 0.24 }}
            >
              <nav className="hdr-mobile-nav" aria-label="Mobile navigation links">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => onNavClick(item.to, 'mobile_nav')}
                    className={`hdr-mobile-link ${isActive(item.to) ? 'is-active' : ''}`}
                  >
                    {language === 'es' ? item.labelEs : item.label}
                  </Link>
                ))}
              </nav>
              <div className="hdr-mobile-footer">
                <button type="button" onClick={onLanguageSwitch} className="hdr-lang">
                  <Globe size={15} />
                  {language === 'en' ? 'ES' : 'EN'}
                </button>
                <Link to="/contact" onClick={() => onNavClick('/contact', 'mobile_cta')} className="hdr-mobile-cta">
                  {language === 'es' ? 'Iniciar proyecto' : 'Start Project'}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
