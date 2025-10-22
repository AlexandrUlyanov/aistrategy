import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../mockData';
import { Calendar, Clock, ArrowRight, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Blog = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Digital Strategy', 'SEO', 'International Marketing'];
  const categoriesEs = ['Todos', 'Estrategia Digital', 'SEO', 'Marketing Internacional'];

  const filteredPosts =
    selectedCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-teal-950/10 to-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-300 text-sm font-medium mb-4">
            {language === 'es' ? 'Blog' : 'Blog'}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-teal">
              {language === 'es' ? 'Insights' : 'Insights'}
            </span>
            <br />
            <span className="text-white">
              {language === 'es' ? 'Y Estrategias' : 'And Strategies'}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Las últimas tendencias y estrategias para hacer crecer tu negocio.'
              : 'The latest trends and strategies to grow your business.'}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          <Filter className="w-5 h-5 text-teal-400" />
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-teal-600 to-purple-600 text-white border-0'
                  : 'border-white/20 text-gray-400 hover:text-white hover:border-teal-500/50'
              }`}
            >
              {language === 'es' ? categoriesEs[index] : category}
            </Button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-teal-500/90 text-white border-0">
                    {language === 'es' ? post.categoryEs : post.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
                  {language === 'es' ? post.titleEs : post.title}
                </h3>

                <p className="text-gray-400 mb-4 line-clamp-3">
                  {language === 'es' ? post.excerptEs : post.excerpt}
                </p>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-gray-500">{post.author}</span>
                  <Button variant="ghost" className="text-teal-400 hover:text-teal-300 p-0 h-auto group/btn">
                    {language === 'es' ? 'Leer Más' : 'Read More'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-teal-500/50 text-white hover:bg-teal-500/10 px-8 py-6 text-lg font-semibold group"
          >
            {language === 'es' ? 'Ver Todos los Artículos' : 'View All Articles'}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;