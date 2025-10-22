import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, TrendingUp, Zap, Globe, ArrowRight } from 'lucide-react';
import { services } from '../mockData';
import { Button } from './ui/button';

const iconMap = {
  Code: Code,
  TrendingUp: TrendingUp,
  Zap: Zap,
  Globe: Globe
};

const Services = ({ language }) => {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-purple-950/10 to-black">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-4">
            {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">
              {language === 'es' ? 'Soluciones Completas' : 'Complete Solutions'}
            </span>
            <br />
            <span className="text-white">
              {language === 'es' ? 'Para Tu Crecimiento' : 'For Your Growth'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Desde diseño web hasta automatización y expansión internacional, ofrecemos todo lo necesario para escalar tu negocio.'
              : 'From web design to automation and international expansion, we offer everything you need to scale your business.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500"
              >
                {/* Background image with overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                </div>

                <div className="relative p-8 lg:p-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-500 ${
                      hoveredService === service.id
                        ? 'bg-gradient-to-br from-purple-600 to-teal-600 scale-110'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {language === 'es' ? service.titleEs : service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {language === 'es' ? service.descriptionEs : service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="flex items-center space-x-2 text-sm text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300 p-0 h-auto font-semibold group/btn"
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  >
                    {language === 'es' ? 'Saber Más' : 'Learn More'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Hover gradient border effect */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)',
                    filter: 'blur(20px)'
                  }}
                ></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;