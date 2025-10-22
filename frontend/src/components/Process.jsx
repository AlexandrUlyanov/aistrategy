import React from 'react';
import { motion } from 'framer-motion';
import { Search, Palette, Rocket, TrendingUp, ArrowRight } from 'lucide-react';
import { process } from '../mockData';

const iconMap = {
  Search: Search,
  Palette: Palette,
  Rocket: Rocket,
  TrendingUp: TrendingUp
};

const Process = ({ language }) => {
  return (
    <section id="process" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-pink-950/10 to-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium mb-4">
            {language === 'es' ? 'Nuestro Proceso' : 'Our Process'}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">
              {language === 'es' ? 'Cómo' : 'How We'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {language === 'es' ? 'Trabajamos Juntos' : 'Work Together'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Un proceso probado que transforma ideas en resultados medibles.'
              : 'A proven process that transforms ideas into measurable results.'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-teal-500 transform -translate-x-1/2"></div>

          {process.map((step, index) => {
            const Icon = iconMap[step.icon];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative mb-16 lg:mb-24 ${
                  isEven ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'
                }`}
              >
                <div className={`lg:w-1/2 ${
                  isEven ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'
                }`}>
                  {/* Step number badge */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-lg mb-4 ${
                    !isEven && 'lg:float-right'
                  }`}>
                    {step.step}
                  </div>

                  {/* Content card */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-500 group">
                    <div className={`flex items-start gap-4 ${
                      !isEven && 'lg:flex-row-reverse'
                    }`}>
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-pink-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {language === 'es' ? step.titleEs : step.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {language === 'es' ? step.descriptionEs : step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Central icon for timeline */}
                <div className="hidden lg:block absolute left-1/2 top-0 transform -translate-x-1/2">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center border-4 border-black shadow-xl">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Arrow for flow */}
                {index < process.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
                    className="hidden lg:block absolute left-1/2 -bottom-8 transform -translate-x-1/2"
                  >
                    <ArrowRight className="w-6 h-6 text-pink-500 rotate-90" />
                  </motion.div>
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