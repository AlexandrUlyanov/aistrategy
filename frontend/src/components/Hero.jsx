import React from 'react';
import { Link } from 'react-router-dom';
import HeroImmersive3D from './HeroImmersive3D';

const Hero = ({ language }) => {
  const copy = language === 'es'
    ? {
        title: 'Creamos la arquitectura de tu marca',
        description:
          'Agencia internacional de estrategia de marca, desarrollo web, marketing digital y consultoria de negocio. La sintesis de tecnologia, analisis y estetica.',
        primaryCta: 'Ver Proyectos',
        secondaryCta: 'Contactar',
        location: 'San Sebastian, Espana | Global'
      }
    : {
        title: 'We design the architecture of your brand',
        description:
          'International agency for brand strategy, web development, digital marketing, and business consulting. The synthesis of technology, analysis, and aesthetics.',
        primaryCta: 'View Work',
        secondaryCta: 'Contact',
        location: 'San Sebastian, Spain | Global'
      };

  const stats = language === 'es'
    ? [
        { value: '15+', label: 'Anos' },
        { value: '200+', label: 'Proyectos' },
        { value: '50+', label: 'Clientes' },
        { value: '98%', label: 'Satisfaccion' }
      ]
    : [
        { value: '15+', label: 'Years' },
        { value: '200+', label: 'Projects' },
        { value: '50+', label: 'Clients' },
        { value: '98%', label: 'Satisfaction' }
      ];

  return (
    <section className="hero-wave" aria-labelledby="hero-heading">
      <HeroImmersive3D />

      <div className="hero-wave-overlay" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 hero-wave-shell">
        <div className="hero-wave-content">
          <h1 id="hero-heading" className="hero-wave-title">{copy.title}</h1>
          <p className="hero-wave-description">{copy.description}</p>

          <div className="hero-wave-actions">
            <Link to="/work" className="hero-wave-btn hero-wave-btn-primary">{copy.primaryCta}</Link>
            <Link to="/contact" className="hero-wave-btn hero-wave-btn-secondary">{copy.secondaryCta}</Link>
          </div>

          <div className="hero-wave-stats" role="list" aria-label="Agency highlights">
            {stats.map((item) => (
              <div key={item.label} className="hero-wave-stat" role="listitem">
                <span className="hero-wave-stat-value">{item.value}</span>
                <span className="hero-wave-stat-label">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="hero-wave-location">{copy.location}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
