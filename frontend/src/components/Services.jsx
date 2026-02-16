import React from 'react';
import { motion } from 'framer-motion';
import { Compass, TrendingUp, Code, Briefcase, Sparkles } from 'lucide-react';
import { services } from '../mockData';

const iconMap = {
  Compass: Compass,
  TrendingUp: TrendingUp,
  Code: Code,
  Briefcase: Briefcase
};

const pillarCopy = {
  en: [
    'Position your brand where attention becomes demand',
    'Reduce decision friction with clear service pathways',
    'Convert interest into measurable growth momentum'
  ],
  es: [
    'Posiciona tu marca donde la atencion se convierte en demanda',
    'Reduce friccion de decision con rutas de servicio claras',
    'Convierte interes en impulso de crecimiento medible'
  ]
};

const outcomes = {
  1: {
    en: 'Own a distinctive market position',
    es: 'Logra una posicion distintiva en tu mercado'
  },
  2: {
    en: 'Turn visibility into qualified demand',
    es: 'Convierte visibilidad en demanda calificada'
  },
  3: {
    en: 'Launch premium digital experiences',
    es: 'Lanza experiencias digitales premium'
  },
  4: {
    en: 'Scale with a clear expansion roadmap',
    es: 'Escala con una hoja de ruta clara de expansion'
  }
};

const Services = ({ language }) => {
  const isEs = language === 'es';

  return (
    <section id="services" className="services-cinematic-section section-padding relative overflow-hidden">
      <div className="services-cinematic-vignette" />
      <div className="services-cinematic-topglow" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="services-eyebrow mb-4 block">
            {isEs ? 'Servicios' : 'Services'}
          </span>

          <h2 className="services-cinematic-title mb-5">
            {isEs ? 'Disenamos la ruta para dominar tu categoria' : 'We design the route to dominate your category'}
          </h2>

          <p className="services-intro max-w-3xl mx-auto">
            {isEs
              ? 'Cada servicio esta presentado para mantener foco, crear claridad de decision y mover al cliente desde interes hasta accion.'
              : 'Each service is presented to hold focus, create decision clarity, and move clients from interest to action.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-12"
        >
          {pillarCopy[isEs ? 'es' : 'en'].map((pill, index) => (
            <div key={index} className="services-attention-pill">
              <Sparkles className="w-4 h-4 text-golden shrink-0" />
              <p className="services-pill-text">{pill}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const outcome = outcomes[service.id] || outcomes[1];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="services-cinematic-card"
              >
                <div className="services-card-header">
                  <div className="services-icon-wrap">
                    <Icon className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <h3 className="services-card-title">
                      {isEs ? service.titleEs : service.title}
                    </h3>
                    <p className="services-card-kicker">
                      {isEs ? 'Resultado principal' : 'Primary Outcome'}
                    </p>
                    <p className="services-card-outcome">
                      {isEs ? outcome.es : outcome.en}
                    </p>
                  </div>
                </div>

                <p className="services-card-description">
                  {isEs ? service.descriptionEs : service.description}
                </p>

                <div className="space-y-2.5">
                  {(isEs && service.featuresEs ? service.featuresEs : service.features).map((feature, i) => (
                    <div key={i} className="services-feature-row">
                      <span className="services-feature-index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="services-feature-text">{feature}</span>
                    </div>
                  ))}
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


