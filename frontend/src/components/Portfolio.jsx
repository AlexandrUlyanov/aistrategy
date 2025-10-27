import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolio } from '../mockData';
import { ExternalLink, X, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Portfolio = ({ language }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-golden uppercase tracking-widest mb-4 block">
            {language === 'es' ? 'Proyectos' : 'Projects'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-graphite mb-6">
            {language === 'es' ? 'Casos de Éxito' : 'Success Stories'}
          </h2>
          <div className="golden-divider"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6 font-light">
            {language === 'es'
              ? 'Más de 15 años creando marcas que trascienden'
              : 'Over 15 years creating brands that transcend'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="premium-card overflow-hidden hover-lift">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/20 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-white/95 text-graphite border-0 shadow-sm">
                    {language === 'es' ? project.categoryEs : project.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-light text-graphite mb-2 group-hover:text-golden transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-light">
                    {language === 'es' ? project.descriptionEs : project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 text-sm pt-4 border-t border-gray-200">
                    {Object.entries(project.metrics).slice(0, 3).map(([key, value], i) => (
                      <div key={i} className="text-center">
                        <div className="font-light text-golden">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* View Case Study */}
                  <div className="mt-4 text-sm text-graphite font-light flex items-center justify-between">
                    <span>{language === 'es' ? 'Ver caso completo' : 'View full case'}</span>
                    <ExternalLink className="w-4 h-4 text-golden" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-white rounded-lg shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Header Image */}
              <div className="relative h-80">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white hover:bg-white/90"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-8 lg:p-12">
                {/* Title and Category */}
                <Badge className="bg-golden/10 text-golden border-0 mb-4">
                  {language === 'es' ? selectedProject.categoryEs : selectedProject.category}
                </Badge>
                <h2 className="text-4xl font-light text-graphite mb-2">{selectedProject.title}</h2>
                <p className="text-gray-600 mb-6 font-light">
                  {selectedProject.client} • {selectedProject.location} • {selectedProject.year}
                </p>

                {/* Challenge */}
                <div className="mb-8">
                  <h3 className="text-xl font-light text-graphite mb-3 flex items-center">
                    <span className="w-1.5 h-1.5 bg-golden rounded-full mr-3"></span>
                    {language === 'es' ? 'Desafío' : 'Challenge'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light pl-6">
                    {language === 'es' ? selectedProject.challengeEs : selectedProject.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-8">
                  <h3 className="text-xl font-light text-graphite mb-3 flex items-center">
                    <span className="w-1.5 h-1.5 bg-golden rounded-full mr-3"></span>
                    {language === 'es' ? 'Solución' : 'Solution'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light pl-6">
                    {language === 'es' ? selectedProject.solutionEs : selectedProject.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h3 className="text-xl font-light text-graphite mb-4 flex items-center">
                    <span className="w-1.5 h-1.5 bg-golden rounded-full mr-3"></span>
                    {language === 'es' ? 'Resultados' : 'Results'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 pl-6">
                    {(language === 'es' ? selectedProject.resultsEs : selectedProject.results).map((result, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-golden flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 font-light">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                  {Object.entries(selectedProject.metrics).map(([key, value], i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-light text-golden mb-1">{value}</div>
                      <div className="text-sm text-gray-600 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Services & Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Website Link */}
                {selectedProject.website && (
                  <a
                    href={`https://${selectedProject.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-golden hover:text-graphite transition-colors"
                  >
                    {language === 'es' ? 'Visitar sitio web' : 'Visit website'}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;