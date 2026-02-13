import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../mockData';
import { blogInsights } from '../blogInsights';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';

const Blog = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Brand Strategy', 'Digital Strategy', 'International Business', 'Digital Marketing', 'Web Design'];
  const categoriesEs = ['Todos', 'Estrategia de Marca', 'Estrategia Digital', 'Negocios Internacionales', 'Marketing Digital', 'Diseño Web'];

  const filteredPosts =
    selectedCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm text-golden uppercase tracking-widest mb-4 block">
            {language === 'es' ? 'Conocimiento' : 'Insights'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-graphite mb-6">
            {language === 'es' ? 'Blog' : 'Blog'}
          </h2>
          <div className="golden-divider"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-light transition-all ${
                selectedCategory === category
                  ? 'bg-graphite text-white'
                  : 'bg-white text-graphite border border-gray-300 hover:border-golden'
              }`}
            >
              {language === 'es' ? categoriesEs[index] : category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link 
                to={`/blog/${post.slug}`}
                className="block premium-card overflow-hidden hover-lift cursor-pointer group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-white/95 text-graphite border-0">
                    {language === 'es' ? post.categoryEs : post.category}
                  </Badge>
                  {blogInsights[post.slug] && (
                    <Badge className="absolute top-4 right-4 bg-golden text-white border-0">
                      {language === 'es' ? 'Con Datos' : 'Data-backed'}
                    </Badge>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 font-light">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{language === 'es' ? post.readTimeEs : post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-light text-graphite mb-3 group-hover:text-golden transition-colors line-clamp-2">
                    {language === 'es' ? post.titleEs : post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 font-light text-sm">
                    {language === 'es' ? post.excerptEs : post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500 font-light">{post.author}</span>
                    <ArrowRight className="w-4 h-4 text-golden group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
