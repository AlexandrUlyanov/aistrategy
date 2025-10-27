import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonials, stats } from '../mockData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from './ui/button';

const Testimonials = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  // Анимированные счетчики
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
    <section id="about" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setHasAnimated(true)}
          className="mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center premium-card p-8"
              >
                <div className="text-5xl font-light text-golden mb-2">
                  {Math.floor(counters[index])}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-light">
                  {language === 'es' ? stat.labelEs : stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm text-golden uppercase tracking-widest mb-4 block">
            {language === 'es' ? 'Testimonios' : 'Testimonials'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-graphite mb-6">
            {language === 'es' ? 'Lo Que Dicen' : 'What They Say'}
          </h2>
          <div className="golden-divider"></div>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="premium-card p-8 lg:p-12">
            <Quote className="w-12 h-12 text-golden/30 mb-6" />
            <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed font-light italic">
              "{language === 'es' ? testimonials[currentIndex].quoteEs : testimonials[currentIndex].quote}"
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-light text-graphite text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-gray-600 font-light">
                    {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="border-golden/30 hover:bg-golden hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="border-golden/30 hover:bg-golden hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-golden w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;