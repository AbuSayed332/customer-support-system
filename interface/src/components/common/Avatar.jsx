import React from 'react';
import { User } from 'lucide-react';
import { getInitials } from '../../utils/formatters';

const Avatar = ({ src, name, size = 'medium', className = '' }) => {
  const sizes = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base',
    xlarge: 'w-16 h-16 text-lg',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  if (name) {
    return (
      <div
        className={`${sizes[size]} rounded-full bg-primary-600 text-white flex items-center justify-center font-medium ${className}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gray-300 flex items-center justify-center ${className}`}
    >
      <User className="w-1/2 h-1/2 text-gray-600" />
    </div>
  );
};

export default Avatar;