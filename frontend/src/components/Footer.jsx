import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-graphite text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl font-light tracking-wider text-white">DONOSTI</span>
              <span className="ml-2 text-2xl font-light tracking-wider text-golden">STRATEGIA</span>
            </div>
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              {language === 'es'
                ? 'Agencia internacional de marketing digital y estrategia de marca'
                : 'International digital marketing and brand strategy agency'}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-golden rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-golden rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-light mb-4">{language === 'es' ? 'Servicios' : 'Services'}</h3>
            <ul className="space-y-3 text-gray-400 font-light">
              <li>
                <a href="#services" className="hover:text-golden transition-colors">
                  {language === 'es' ? 'Estrategia de Marca' : 'Brand Strategy'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-golden transition-colors">
                  {language === 'es' ? 'Marketing Digital' : 'Digital Marketing'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-golden transition-colors">
                  {language === 'es' ? 'Desarrollo Web' : 'Web Development'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-golden transition-colors">
                  {language === 'es' ? 'Consultoría' : 'Consulting'}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-light mb-4">{language === 'es' ? 'Empresa' : 'Company'}</h3>
            <ul className="space-y-3 text-gray-400 font-light">
              <li>
                <a href="#projects" className="hover:text-golden transition-colors">
                  {language === 'es' ? 'Proyectos' : 'Projects'}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-golden transition-colors">
                  {language === 'es' ? 'Proceso' : 'Process'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-golden transition-colors">
                  {language === 'es' ? 'Nosotros' : 'About'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-golden transition-colors">
                  {language === 'es' ? 'Contacto' : 'Contact'}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-light mb-4">{language === 'es' ? 'Contacto' : 'Contact'}</h3>
            <ul className="space-y-4 text-gray-400 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-golden flex-shrink-0 mt-0.5" />
                <span>
                  San Sebastián, {language === 'es' ? 'España' : 'Spain'}
                  <br />
                  {language === 'es' ? 'Presencia Global' : 'Global Presence'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-golden flex-shrink-0" />
                <a href="mailto:contact@aureumdigital.com" className="hover:text-golden transition-colors">
                  contact@aureumdigital.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-golden flex-shrink-0" />
                <span>+34 XXX XXX XXX</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-light"
        >
          <p>
            © {currentYear} DONOSTI STRATEGIA.{' '}
            {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-golden transition-colors">
              {language === 'es' ? 'Privacidad' : 'Privacy'}
            </a>
            <a href="#" className="hover:text-golden transition-colors">
              {language === 'es' ? 'Términos' : 'Terms'}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Golden accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-golden to-transparent"></div>
    </footer>
  );
};

export default Footer;