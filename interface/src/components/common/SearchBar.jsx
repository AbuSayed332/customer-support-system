// import React, { useState, useEffect } from 'react';
// import { Search, X } from 'lucide-react';
// import { debounce } from '../../utils/helpers';

// const SearchBar = ({ onSearch, placeholder = 'Search...', delay = 500 }) => {
//   const [value, setValue] = useState('');

//   useEffect(() => {
//     const debouncedSearch = debounce(() => {
//       onSearch(value);
//     }, delay);

//     debouncedSearch();
//   }, [value, onSearch, delay]);

//   const handleClear = () => {
//     setValue('');
//     onSearch('');
//   };

//   return (
//     <div className="relative">
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <Search className="w-5 h-5 text-gray-400" />
//       </div>
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder={placeholder}
//         className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//       />
//       {value && (
//         <button
//           onClick={handleClear}
//           className="absolute inset-y-0 right-0 pr-3 flex items-center"
//         >
//           <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

// ============================================================================
// FILE: src/components/common/SearchBar.jsx
// SearchBar Component with Debounce
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search...', 
  debounceMs = 500,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, debounceMs, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;