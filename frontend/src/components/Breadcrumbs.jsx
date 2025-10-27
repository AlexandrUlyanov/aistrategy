import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items, language = 'en' }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-graphite/60 dark:text-white/60">
      <Link 
        to="/"
        className="flex items-center hover:text-gold dark:hover:text-gold transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-gold dark:hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-graphite dark:text-white font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
