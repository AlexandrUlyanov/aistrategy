import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials, stats } from '../mockData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const Testimonials = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated counters
  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const intervals = stats.map((stat, index) => {
      const increment = stat.value / (duration / 50);
      return setInterval(() => {
        setCounters(prev => {
          const newCounters = [...prev];
          if (newCounters[index] < stat.value) {
            newCounters[index] = Math.min(newCounters[index] + increment, stat.value);
          }
          return newCounters;
        });
      }, 50);
    });

    return () => intervals.forEach(clearInterval);
  }, [hasAnimated]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setHasAnimated(true)}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all duration-500"
              >
                <div className="text-5xl lg:text-6xl font-black mb-3">
                  <span className="gradient-text">
                    {Math.floor(counters[index])}{stat.suffix}
                  </span>
                </div>
                <div className="text-gray-400 font-medium">
                  {language === 'es' ? stat.labelEs : stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-4">
            {language === 'es' ? 'Testimonios' : 'Testimonials'}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-purple">
              {language === 'es' ? 'Lo Que Dicen' : 'What They Say'}
            </span>
            <br />
            <span className="text-white">
              {language === 'es' ? 'Nuestros Clientes' : 'Our Clients'}
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-50"></div>
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-purple-500/30"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <Quote className="w-12 h-12 text-purple-500/30 mb-4 mx-auto lg:mx-0" />
                  <p className="text-xl lg:text-2xl text-gray-300 mb-6 leading-relaxed italic">
                    "{language === 'es' ? testimonials[currentIndex].quoteEs : testimonials[currentIndex].quote}"
                  </p>

                  <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>

                  <div>
                    <div className="text-xl font-bold text-white">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-purple-400">
                      {testimonials[currentIndex].position}
                    </div>
                    <div className="text-gray-500">
                      {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-purple-500/50 hover:bg-purple-500/10 text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-purple-500 w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-purple-500/50 hover:bg-purple-500/10 text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* All testimonials grid - Mobile */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3">
                "{language === 'es' ? testimonial.quoteEs : testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;