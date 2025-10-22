import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: {
      title: language === 'es' ? 'Servicios' : 'Services',
      links: [
        { label: language === 'es' ? 'Desarrollo Web' : 'Web Development', href: '#services' },
        { label: language === 'es' ? 'Campañas Marketing' : 'Marketing Campaigns', href: '#services' },
        { label: language === 'es' ? 'Automatización' : 'Automation', href: '#services' },
        { label: language === 'es' ? 'Expansión Internacional' : 'International Expansion', href: '#services' }
      ]
    },
    company: {
      title: language === 'es' ? 'Empresa' : 'Company',
      links: [
        { label: language === 'es' ? 'Portafolio' : 'Portfolio', href: '#portfolio' },
        { label: language === 'es' ? 'Proceso' : 'Process', href: '#process' },
        { label: language === 'es' ? 'Testimonios' : 'Testimonials', href: '#testimonials' },
        { label: language === 'es' ? 'Blog' : 'Blog', href: '#blog' }
      ]
    },
    contact: {
      title: language === 'es' ? 'Contacto' : 'Contact',
      info: [
        { icon: Mail, text: 'contact@globalscale.agency' },
        { icon: Phone, text: '+34 900 123 456' },
        { icon: MapPin, text: language === 'es' ? 'Madrid, España' : 'Madrid, Spain' }
      ]
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-900 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-lg flex items-center justify-center font-bold text-lg">
                GS
              </div>
              <span className="text-xl font-bold gradient-text">GlobalScale</span>
            </div>
            <p className="text-gray-400 mb-6">
              {language === 'es'
                ? 'Impulsamos tu negocio con estrategia, tecnología y marketing inteligente.'
                : 'We scale businesses through smart marketing, automation, and strategy.'}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">{footerLinks.services.title}</h3>
            <ul className="space-y-3">
              {footerLinks.services.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">{footerLinks.company.title}</h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">{footerLinks.contact.title}</h3>
            <ul className="space-y-4">
              {footerLinks.contact.info.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 text-sm">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} GlobalScale Agency.{' '}
            {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {language === 'es' ? 'Privacidad' : 'Privacy Policy'}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {language === 'es' ? 'Términos' : 'Terms of Service'}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {language === 'es' ? 'Cookies' : 'Cookies'}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-teal-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;