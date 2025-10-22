import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { toast } from 'sonner';

const Contact = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success(
        language === 'es'
          ? '¡Mensaje enviado! Nos pondremos en contacto pronto.'
          : 'Message sent! We\'ll get back to you soon.'
      );
      setFormData({ name: '', email: '', company: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-4">
            {language === 'es' ? 'Contacto' : 'Contact'}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-purple">
              {language === 'es' ? 'Empecemos' : "Let's Start"}
            </span>
            <br />
            <span className="text-white">
              {language === 'es' ? 'Tu Proyecto' : 'Your Project'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos de negocio.'
              : 'Contact us today and discover how we can help you achieve your business goals.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === 'es' ? 'Información de Contacto' : 'Contact Information'}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'es' ? 'Email' : 'Email'}
                    </div>
                    <div className="text-white font-medium">contact@globalscale.agency</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'es' ? 'Teléfono' : 'Phone'}
                    </div>
                    <div className="text-white font-medium">+34 900 123 456</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-500/10 border border-pink-500/30 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'es' ? 'Ubicación' : 'Location'}
                    </div>
                    <div className="text-white font-medium">
                      {language === 'es'
                        ? 'Madrid, España & Global'
                        : 'Madrid, Spain & Global'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-purple-600/10 to-teal-600/10 border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'es' ? '¿Por qué elegirnos?' : 'Why Choose Us?'}
              </h3>
              <ul className="space-y-3">
                {[
                  language === 'es' ? 'Respuesta en 24 horas' : '24-hour response',
                  language === 'es' ? 'Consultoría gratuita' : 'Free consultation',
                  language === 'es' ? 'Estrategia personalizada' : 'Custom strategy',
                  language === 'es' ? 'Resultados garantizados' : 'Guaranteed results'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <Check className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'es' ? 'Nombre Completo' : 'Full Name'}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                    placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'es' ? 'Correo Electrónico' : 'Email Address'}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                    placeholder={language === 'es' ? 'tu@email.com' : 'you@email.com'}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'es' ? 'Empresa (Opcional)' : 'Company (Optional)'}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                    placeholder={language === 'es' ? 'Tu empresa' : 'Your company'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'es' ? 'Mensaje' : 'Message'}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 resize-none"
                    placeholder={
                      language === 'es'
                        ? 'Cuéntanos sobre tu proyecto...'
                        : 'Tell us about your project...'
                    }
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white py-6 text-lg font-semibold group"
                >
                  {isSubmitting ? (
                    <>
                      {language === 'es' ? 'Enviando...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;