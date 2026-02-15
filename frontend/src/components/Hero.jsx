import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicBackground from './CinematicBackground';

const Hero = ({ language }) => {
  return (
    <section className="hero-cinematic relative min-h-screen flex items-center justify-center overflow-hidden">
      <CinematicBackground />

      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/80 to-transparent z-[1] pointer-events-none" />
      <div className="hero-vignette" />
      <div className="hero-radial-glow" />
      <div className="cinematic-noise" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.07, 0.03],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-96 h-96 bg-golden rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#4a6dc2] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -50, 0],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-golden rounded-full blur-3xl"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            opacity: [0.08, 0.2, 0.08]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px]"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(212, 175, 55, 0.15), transparent 30%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 hero-badge rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-golden" />
            <span className="text-sm text-white/90 font-light tracking-wide">
              {language === 'es' ? '15+ Años de Excelencia' : '15+ Years of Excellence'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-light text-white mb-6 leading-tight"
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            {language === 'es'
              ? 'Agencia internacional de marketing digital, estrategia de marca y consultoría de negocios. El síntesis de tecnología, análisis y estética.'
              : 'International digital marketing, brand strategy and business consulting agency. The synthesis of technology, analytics and aesthetics.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="hero-cta-primary px-8 py-6 text-base transition-all duration-300 group"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              {language === 'es' ? 'Ver Proyectos' : 'View Projects'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hero-cta-secondary px-8 py-6 text-base transition-all duration-300"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              {language === 'es' ? 'Contactar' : 'Get in Touch'}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/20"
          >
            {[
              { value: '15+', label: language === 'es' ? 'Años' : 'Years' },
              { value: '200+', label: language === 'es' ? 'Proyectos' : 'Projects' },
              { value: '50+', label: language === 'es' ? 'Clientes' : 'Clients' },
              { value: '98%', label: language === 'es' ? 'Satisfacción' : 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="hero-stat-card text-center">
                <div className="text-4xl font-light text-golden mb-2">{stat.value}</div>
                <div className="text-sm text-white/70 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-sm text-white/65 font-light tracking-wide">
          {language === 'es' ? 'San Sebastián, España • Global' : 'San Sebastián, Spain • Global'}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

