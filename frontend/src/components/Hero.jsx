import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ language }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-golden rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-graphite rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white border border-golden/20 rounded-full px-4 py-2 mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-golden" />
            <span className="text-sm text-graphite font-light tracking-wide">
              {language === 'es' ? '15+ Años de Excelencia' : '15+ Years of Excellence'}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-light text-graphite mb-6 leading-tight"
          >
            {language === 'es' ? (
              <>
                Creamos la <span className="text-golden font-normal">Arquitectura</span>
                <br />de tu Marca
              </>
            ) : (
              <>
                We Create the <span className="text-golden font-normal">Architecture</span>
                <br />of Your Brand
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            {language === 'es'
              ? 'Agencia internacional de marketing digital, estrategia de marca y consultoría de negocios. El síntesis de tecnología, análisis y estética.'
              : 'International digital marketing, brand strategy and business consulting agency. The synthesis of technology, analytics and aesthetics.'}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-graphite hover:bg-golden text-white px-8 py-6 text-base transition-all duration-300 group"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              {language === 'es' ? 'Ver Proyectos' : 'View Projects'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-graphite text-graphite hover:bg-graphite hover:text-white px-8 py-6 text-base transition-all duration-300"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              {language === 'es' ? 'Contactar' : 'Get in Touch'}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-200"
          >
            {[
              { value: '15+', label: language === 'es' ? 'Años' : 'Years' },
              { value: '200+', label: language === 'es' ? 'Proyectos' : 'Projects' },
              { value: '50+', label: language === 'es' ? 'Clientes' : 'Clients' },
              { value: '98%', label: language === 'es' ? 'Satisfacción' : 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-golden mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Location Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-sm text-gray-500 font-light tracking-wide">
          {language === 'es' ? 'San Sebastián, España • Global' : 'San Sebastián, Spain • Global'}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;