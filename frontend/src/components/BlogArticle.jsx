import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../mockData';
import { blogInsights } from '../blogInsights';
import Breadcrumbs from './Breadcrumbs';

const BlogArticle = ({ language = 'en' }) => {
  const { slug } = useParams();
  const article = blogPosts.find(post => post.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return <Navigate to="/#blog" replace />;
  }

  // Get other articles for navigation (excluding current)
  const otherArticles = blogPosts.filter(post => post.slug !== slug);
  
  // Get related articles (same category)
  const relatedArticles = otherArticles
    .filter(post => post.category === article.category || post.categoryEs === article.categoryEs)
    .slice(0, 2);
  
  // Get more articles to fill up to 6 total
  const moreArticles = otherArticles
    .filter(post => !relatedArticles.includes(post))
    .slice(0, 6 - relatedArticles.length);
  
  const allDisplayArticles = [...relatedArticles, ...moreArticles].slice(0, 6);

  const title = language === 'es' ? article.titleEs : article.title;
  const insights = blogInsights[article.slug];
  const content = insights
    ? (language === 'es' ? insights.content.es : insights.content.en)
    : (language === 'es' ? article.contentEs : article.content);
  const category = language === 'es' ? article.categoryEs : article.category;
  const readTime = language === 'es' ? article.readTimeEs : article.readTime;
  const excerpt = language === 'es' ? article.excerptEs : article.excerpt;

  // Breadcrumbs items
  const breadcrumbItems = [
    { 
      label: language === 'es' ? 'Blog' : 'Blog', 
      href: '/#blog' 
    },
    { 
      label: title.length > 50 ? title.substring(0, 50) + '...' : title
    }
  ];

  // Parse markdown-like content to HTML
  const parseContent = (text) => {
    if (!text) return '';

    const lines = text.split('\n');
    const html = [];
    let inList = false;

    lines.forEach((rawLine, index) => {
      let line = rawLine;

      line = line.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      if (line.startsWith('## ')) {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        html.push(`<h2 key="${index}" class="article-h2">${line.substring(3)}</h2>`);
        return;
      }

      if (line.startsWith('### ')) {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        html.push(`<h3 key="${index}" class="article-h3">${line.substring(4)}</h3>`);
        return;
      }

      if (line.startsWith('- ')) {
        if (!inList) {
          html.push('<ul class="article-ul">');
          inList = true;
        }
        html.push(`<li key="${index}" class="article-li">${line.substring(2)}</li>`);
        return;
      }

      if (line.trim() === '') {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        html.push('<br key="${index}" />');
        return;
      }

      if (line.startsWith('```')) {
        return;
      }

      if (!line.startsWith('<') && line.trim() !== '') {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        html.push(`<p key="${index}" class="article-p">${line}</p>`);
      } else {
        html.push(line);
      }
    });

    if (inList) {
      html.push('</ul>');
    }

    return html.join('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-graphite pt-24 pb-20">
      {/* Breadcrumbs and Back Button */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <Breadcrumbs items={breadcrumbItems} language={language} />
        </div>
        
        <Link 
          to="/#blog"
          className="inline-flex items-center gap-2 text-graphite/60 dark:text-white/60 hover:text-gold dark:hover:text-gold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{language === 'es' ? 'Volver al Blog' : 'Back to Blog'}</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 dark:bg-gold/20 text-gold rounded-full text-sm font-medium">
              <Tag className="w-4 h-4" />
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-graphite dark:text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-graphite/60 dark:text-white/60 mb-8 pb-8 border-b border-graphite/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{language === 'es' ? 'Por' : 'By'} <strong className="text-graphite dark:text-white">{article.author}</strong></span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={article.image} 
              alt={title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>

          {insights && (
            <div className="mb-12 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="blog-lead-block"
              >
                <p className="text-lg md:text-xl font-light leading-relaxed">
                  {language === 'es' ? insights.lead.es : insights.lead.en}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="blog-insights-title">{language === 'es' ? 'Estadísticas Clave' : 'Key Stats'}</h3>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {insights.keyStats.map((stat, i) => (
                    <div key={i} className="blog-stat-card">
                      <div className="blog-stat-value">{stat.value}</div>
                      <p className="blog-stat-label">{language === 'es' ? stat.labelEs : stat.labelEn}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="blog-insights-title">{language === 'es' ? 'Flujo Estratégico' : 'Strategic Flow'}</h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {insights.infographic.map((item, i) => (
                    <div key={i} className="blog-flow-card">
                      <span className="blog-flow-step">{`0${i + 1}`}</span>
                      <div>
                        <p className="blog-flow-title">{language === 'es' ? item.stepEs : item.stepEn}</p>
                        <p className="blog-flow-detail">{language === 'es' ? item.detailEs : item.detailEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Article Content */}
          <div 
            className="article-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: parseContent(content) }}
          />

          {insights && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <h3 className="blog-insights-title">{language === 'es' ? 'Fuentes' : 'Sources'}</h3>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                {insights.keyStats.map((stat, i) => (
                  <a
                    key={i}
                    href={stat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-source-card"
                  >
                    <p className="blog-source-name">{stat.source}</p>
                    <p className="blog-source-meta">
                      {language === 'es' ? stat.labelEs : stat.labelEn}
                    </p>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* More Articles Navigation */}
        {allDisplayArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 pt-12 border-t-2 border-gold/20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-graphite dark:text-white mb-4">
                {language === 'es' ? 'Más Artículos' : 'More Articles'}
              </h2>
              <p className="text-graphite/60 dark:text-white/60 max-w-2xl mx-auto">
                {language === 'es' 
                  ? 'Continúa explorando nuestro conocimiento y perspectivas sobre marketing digital y estrategia de marca'
                  : 'Continue exploring our insights on digital marketing and brand strategy'
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allDisplayArticles.map((post) => {
                const isRelated = relatedArticles.includes(post);
                return (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group relative bg-white dark:bg-graphite/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    {isRelated && (
                      <div className="absolute top-4 right-4 z-10 bg-gold text-white text-xs px-3 py-1 rounded-full font-medium">
                        {language === 'es' ? 'Relacionado' : 'Related'}
                      </div>
                    )}
                    
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={language === 'es' ? post.titleEs : post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/40 to-transparent"></div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block text-xs text-gold bg-gold/10 backdrop-blur-sm px-3 py-1 rounded-full font-medium uppercase tracking-wider">
                          {language === 'es' ? post.categoryEs : post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-graphite dark:text-white mb-3 group-hover:text-gold transition-colors line-clamp-2 min-h-[3.5rem]">
                        {language === 'es' ? post.titleEs : post.title}
                      </h3>

                      <p className="text-graphite/70 dark:text-white/70 mb-4 line-clamp-2 text-sm leading-relaxed">
                        {language === 'es' ? post.excerptEs : post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-graphite/10 dark:border-white/10">
                        <div className="flex items-center gap-4 text-xs text-graphite/60 dark:text-white/60">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{language === 'es' ? post.readTimeEs : post.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* View All Articles Button */}
            <div className="text-center mt-12">
              <Link 
                to="/#blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-graphite dark:bg-gold text-white rounded-full hover:bg-gold dark:hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 font-medium"
              >
                {language === 'es' ? 'Ver Todos los Artículos' : 'View All Articles'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </article>
    </div>
  );
};

export default BlogArticle;
