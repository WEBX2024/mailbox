import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import './Search.css';

const Search = ({ searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
        if (searchQuery) setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, searchQuery, setSearchQuery]);

  return (
    <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
      <FiSearch className="search-bar-icon" size={15} />
      <input
        ref={inputRef}
        type="text"
        className="search-bar-input"
        placeholder="Search mail (Ctrl+E)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search mail"
      />
      {searchQuery && (
        <button
          className="search-bar-clear"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
          tabIndex={-1}
        >
          <FiX size={14} />
        </button>
      )}
    </div>
  );
};

export default Search;
