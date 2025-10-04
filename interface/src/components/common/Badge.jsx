import React from 'react';

const colorClasses = {
  blue: 'bg-blue-100 text-blue-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-800',
  gray: 'bg-gray-100 text-gray-800',
  red: 'bg-red-100 text-red-800',
  orange: 'bg-orange-100 text-orange-800',
  purple: 'bg-purple-100 text-purple-800',
};

const Badge = ({ children, color = 'gray', className = '' }) => {
  const badgeColor = colorClasses[color] || colorClasses.gray;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeColor} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;