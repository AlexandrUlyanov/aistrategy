import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ language }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(168, 85, 247, 0.5)' : 'rgba(6, 182, 212, 0.5)';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-950/20 to-black">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left">

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">

              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">
                {language === 'es' ? 'Marketing de Clase Mundial' : 'World-Class Marketing'}
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="gradient-text">
                {language === 'es' ? 'Escalamos' : 'We Scale'}
              </span>
              <br />
              <span className="text-white">
                {language === 'es' ? 'Tu Negocio' : 'Your Business'}
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              {language === 'es' ?
              'Impulsamos tu negocio con estrategia, tecnología y marketing inteligente. Resultados medibles, crecimiento sostenible.' :
              'We scale businesses through smart marketing, automation, and strategy. Measurable results, sustainable growth.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-8 py-6 text-lg font-semibold group"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>

                {language === 'es' ? 'Empezar Ahora' : 'Get Started'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-500/50 text-white hover:bg-purple-500 hover:text-white hover:border-purple-500 px-8 py-6 text-lg font-semibold group"
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}>

                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {language === 'es' ? 'Ver Casos' : 'View Cases'}
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10">

              <div>
                <div className="text-3xl font-bold gradient-purple">250+</div>
                <div className="text-sm text-gray-400 mt-1">
                  {language === 'es' ? 'Clientes' : 'Clients'}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-teal">420%</div>
                <div className="text-sm text-gray-400 mt-1">
                  {language === 'es' ? 'ROI Promedio' : 'Avg ROI'}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-gray-400 mt-1">
                  {language === 'es' ? 'Países' : 'Countries'}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block">

            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-2xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxidXNpbmVzcyUyMGdyb3d0aHxlbnwwfHx8fDE3NjExMTE1MzN8MA&ixlib=rb-4.1.0&q=85"
                alt="Marketing Dashboard"
                className="relative rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500" />

            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-xl shadow-2xl border border-purple-400/30">

              <div className="text-2xl font-bold text-white">+180%</div>
              <div className="text-xs text-purple-200">Lead Growth</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-gradient-to-br from-teal-600 to-teal-800 p-4 rounded-xl shadow-2xl border border-teal-400/30">

              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-xs text-teal-200">Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2">

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex items-start justify-center p-2">

          <div className="w-1 h-2 bg-purple-500 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>);

};

export default Hero;