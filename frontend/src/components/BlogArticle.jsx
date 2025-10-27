import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../mockData';
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
  const content = language === 'es' ? article.contentEs : article.content;
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
    
    return text
      .split('\n')
      .map((line, index) => {
        // H2 headers
        if (line.startsWith('## ')) {
          return `<h2 key="${index}" class="article-h2">${line.substring(3)}</h2>`;
        }
        // H3 headers
        if (line.startsWith('### ')) {
          return `<h3 key="${index}" class="article-h3">${line.substring(4)}</h3>`;
        }
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Lists
        if (line.startsWith('- ')) {
          return `<li key="${index}" class="article-li">${line.substring(2)}</li>`;
        }
        // Empty lines
        if (line.trim() === '') {
          return '<br key="${index}" />';
        }
        // Code blocks
        if (line.startsWith('```')) {
          return '';
        }
        // Regular paragraphs
        if (!line.startsWith('<') && line.trim() !== '') {
          return `<p key="${index}" class="article-p">${line}</p>`;
        }
        return line;
      })
      .join('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-graphite pt-24 pb-20">
      {/* Back Button */}
      <div className="container mx-auto px-6 mb-8">
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

          {/* Article Content */}
          <div 
            className="article-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: parseContent(content) }}
          />
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 pt-12 border-t border-graphite/10 dark:border-white/10"
          >
            <h2 className="text-3xl font-bold text-graphite dark:text-white mb-8">
              {language === 'es' ? 'Artículos Relacionados' : 'Related Articles'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden mb-4 shadow-lg">
                    <img 
                      src={post.image} 
                      alt={language === 'es' ? post.titleEs : post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs text-gold uppercase tracking-wider font-medium">
                    {language === 'es' ? post.categoryEs : post.category}
                  </span>
                  <h3 className="text-lg font-bold text-graphite dark:text-white mt-2 group-hover:text-gold transition-colors">
                    {language === 'es' ? post.titleEs : post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </div>
  );
};

export default BlogArticle;
