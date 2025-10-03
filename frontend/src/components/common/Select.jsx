import React from 'react';

const Select = ({ name, value, onChange, options, className = '', ...props }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;