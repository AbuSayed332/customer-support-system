import React from 'react';

const Card = ({ children, className = '', hover = false, onClick }) => {
  const baseClasses = 'bg-white rounded-lg shadow-card p-6';
  const hoverClasses = hover ? 'hover:shadow-card-hover transition-shadow cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;