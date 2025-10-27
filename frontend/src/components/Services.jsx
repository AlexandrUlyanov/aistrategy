import React from 'react';
import { motion } from 'framer-motion';
import { Compass, TrendingUp, Code, Briefcase } from 'lucide-react';
import { services } from '../mockData';

const iconMap = {
  Compass: Compass,
  TrendingUp: TrendingUp,
  Code: Code,
  Briefcase: Briefcase
};

const Services = ({ language }) => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-golden uppercase tracking-widest mb-4 block">
            {language === 'es' ? 'Servicios' : 'Services'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-graphite mb-6">
            {language === 'es' ? 'Soluciones Estratégicas' : 'Strategic Solutions'}
          </h2>
          <div className="golden-divider"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6 font-light">
            {language === 'es'
              ? 'Combinamos pensamiento estratégico con excelencia creativa'
              : 'Combining strategic thinking with creative excellence'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="premium-card p-8 hover-lift"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-golden/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-golden" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-graphite mb-3">
                      {language === 'es' ? service.titleEs : service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed font-light">
                      {language === 'es' ? service.descriptionEs : service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-golden rounded-full mr-3"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;