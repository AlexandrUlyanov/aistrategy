import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-golden uppercase tracking-widest mb-4 block">
            {language === 'es' ? 'Contacto' : 'Contact'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-graphite mb-6">
            {language === 'es' ? 'Hablemos' : "Let's Talk"}
          </h2>
          <div className="golden-divider"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6 font-light">
            {language === 'es'
              ? 'Comencemos a construir la arquitectura de su marca'
              : "Let's start building your brand architecture"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="premium-card p-8">
              <h3 className="text-2xl font-light text-graphite mb-6">
                {language === 'es' ? 'Información' : 'Information'}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-golden/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 font-light">
                      {language === 'es' ? 'Ubicación' : 'Location'}
                    </div>
                    <div className="text-graphite font-light">
                      San Sebastián, España
                      <br />
                      {language === 'es' ? 'Presencia Global' : 'Global Presence'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-golden/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 font-light">Email</div>
                    <a href="mailto:contact@donostistrategia.com" className="text-graphite hover:text-golden transition-colors font-light">
                      contact@donostistrategia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-golden/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 font-light">
                      {language === 'es' ? 'Teléfono' : 'Phone'}
                    </div>
                    <div className="text-graphite font-light">+34 XXX XXX XXX</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="premium-card p-8 bg-golden/5">
              <h4 className="text-lg font-light text-graphite mb-4">
                {language === 'es' ? '¿Por qué elegirnos?' : 'Why Choose Us?'}
              </h4>
              <ul className="space-y-3">
                {[
                  language === 'es' ? '15+ años de experiencia' : '15+ years of experience',
                  language === 'es' ? 'Enfoque estratégico' : 'Strategic approach',
                  language === 'es' ? 'Presencia internacional' : 'International presence',
                  language === 'es' ? 'Resultados medibles' : 'Measurable results'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 font-light">
                    <div className="w-1.5 h-1.5 bg-golden rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="premium-card p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-graphite mb-2">
                    {language === 'es' ? 'Nombre' : 'Name'}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-golden"
                    placeholder={language === 'es' ? 'Su nombre' : 'Your name'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-light text-graphite mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-golden"
                    placeholder={language === 'es' ? 'su@email.com' : 'your@email.com'}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-light text-graphite mb-2">
                    {language === 'es' ? 'Empresa (Opcional)' : 'Company (Optional)'}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-golden"
                    placeholder={language === 'es' ? 'Su empresa' : 'Your company'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light text-graphite mb-2">
                    {language === 'es' ? 'Mensaje' : 'Message'}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-golden resize-none"
                    placeholder={
                      language === 'es'
                        ? 'Cuéntenos sobre su proyecto...'
                        : 'Tell us about your project...'
                    }
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-graphite hover:bg-golden text-white py-6 text-base font-light transition-all group"
                >
                  {isSubmitting ? (
                    language === 'es' ? 'Enviando...' : 'Sending...'
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