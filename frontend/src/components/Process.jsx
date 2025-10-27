import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Zap, TrendingUp } from 'lucide-react';
import { process } from '../mockData';

const iconMap = {
  Search: Search,
  Target: Target,
  Zap: Zap,
  TrendingUp: TrendingUp
};

const Process = ({ language }) => {
  return (
    <section id="process" className="section-padding bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-golden uppercase tracking-widest mb-4 block">
            {language === 'es' ? 'Proceso' : 'Process'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-graphite mb-6">
            {language === 'es' ? 'Cómo Trabajamos' : 'How We Work'}
          </h2>
          <div className="golden-divider"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6 font-light">
            {language === 'es'
              ? 'Metodología probada que transforma estrategia en resultados'
              : 'Proven methodology that transforms strategy into results'}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {process.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Number and Icon */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-golden/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-light text-golden">{step.step}</span>
                    </div>
                    <div className="w-14 h-14 bg-white border-2 border-golden/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-graphite" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 premium-card p-8">
                    <h3 className="text-2xl font-light text-graphite mb-3">
                      {language === 'es' ? step.titleEs : step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {language === 'es' ? step.descriptionEs : step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-golden/50 to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;