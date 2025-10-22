import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolio } from '../mockData';
import { ExternalLink, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';

const Portfolio = ({ language }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getMetricIcon = (key) => {
    if (key.includes('lead') || key.includes('traffic') || key.includes('conversion')) return TrendingUp;
    if (key.includes('customer') || key.includes('user') || key.includes('partner')) return Users;
    return DollarSign;
  };

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-teal-950/10 to-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-300 text-sm font-medium mb-4">
            {language === 'es' ? 'Nuestro Trabajo' : 'Our Work'}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-teal">
              {language === 'es' ? 'Casos de Éxito' : 'Success Stories'}
            </span>
            <br />
            <span className="text-white">
              {language === 'es' ? 'Que Inspiran' : 'That Inspire'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Resultados reales de clientes que confiaron en nosotros para transformar sus negocios.'
              : 'Real results from clients who trusted us to transform their businesses.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-teal-500/50 transition-all duration-500 cursor-pointer bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-teal-500/90 text-white border-0">
                    {language === 'es' ? project.categoryEs : project.category}
                  </Badge>
                </div>

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-teal-600/90 via-purple-600/80 to-transparent flex items-center justify-center"
                >
                  <ExternalLink className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {language === 'es' ? project.descriptionEs : project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(project.metrics).map(([key, value], i) => {
                    const Icon = getMetricIcon(key);
                    return (
                      <div key={i} className="text-center">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 mb-1">
                          <Icon className="w-4 h-4 text-teal-400" />
                        </div>
                        <div className="text-lg font-bold text-white">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl overflow-hidden"
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-8">
                <Badge className="bg-teal-500 text-white border-0 mb-4">
                  {language === 'es' ? selectedProject.categoryEs : selectedProject.category}
                </Badge>
                <h3 className="text-4xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  {language === 'es' ? selectedProject.descriptionEs : selectedProject.description}
                </p>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  {Object.entries(selectedProject.metrics).map(([key, value], i) => {
                    const Icon = getMetricIcon(key);
                    return (
                      <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                        <Icon className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-white mb-1">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-300 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;