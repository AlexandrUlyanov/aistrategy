import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../mockData';
import { blogInsights } from '../blogInsights';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';

const Blog = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogCarouselApi, setBlogCarouselApi] = useState(null);
  const [currentBlogSlide, setCurrentBlogSlide] = useState(1);
  const [totalBlogSlides, setTotalBlogSlides] = useState(0);

  const categories = ['all', 'Brand Strategy', 'Digital Strategy', 'International Business', 'Digital Marketing', 'Web Design'];
  const categoriesEs = ['Todos', 'Estrategia de Marca', 'Estrategia Digital', 'Negocios Internacionales', 'Marketing Digital', 'Diseno Web'];

  const filteredPosts =
    selectedCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  useEffect(() => {
    if (!blogCarouselApi) {
      return;
    }

    const updateCarouselState = () => {
      setCurrentBlogSlide(blogCarouselApi.selectedScrollSnap() + 1);
      setTotalBlogSlides(blogCarouselApi.scrollSnapList().length);
    };

    updateCarouselState();
    blogCarouselApi.on('select', updateCarouselState);
    blogCarouselApi.on('reInit', updateCarouselState);

    return () => {
      blogCarouselApi.off('select', updateCarouselState);
      blogCarouselApi.off('reInit', updateCarouselState);
    };
  }, [blogCarouselApi, filteredPosts.length]);

  useEffect(() => {
    if (!blogCarouselApi) {
      return;
    }

    blogCarouselApi.scrollTo(0);
  }, [selectedCategory, blogCarouselApi]);

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
          <h2 className="text-4xl lg:text-5xl font-light text-graphite mb-6">Blog</h2>
          <div className="golden-divider"></div>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Carousel
            setApi={setBlogCarouselApi}
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {filteredPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 xl:basis-1/3">
                  <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block premium-card overflow-hidden hover-lift cursor-pointer group h-full"
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
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 bg-white/95 border-zinc-200 hover:bg-white" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 bg-white/95 border-zinc-200 hover:bg-white" />
          </Carousel>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {currentBlogSlide}/{totalBlogSlides || filteredPosts.length}
            </p>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalBlogSlides || filteredPosts.length }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i + 1 === currentBlogSlide ? 'w-6 bg-golden' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
