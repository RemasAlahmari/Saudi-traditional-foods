import { useState } from 'react';
import '../styles/SearchBar.css';

export default function SearchBar({ onSearch, placeholder = 'Search Saudi dishes...', value = '', large = false }) {
  const [query, setQuery] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form
      className={`search-bar ${large ? 'search-bar-large' : ''}`}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search Saudi foods"
    >
      <span className="search-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </span>

      <input
        type="search"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search"
        autoComplete="off"
      />

      {query && (
        <button
          type="button"
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}

      <button type="submit" className="search-submit" aria-label="Search">
        <span>Search</span>
      </button>
    </form>
  );
}
