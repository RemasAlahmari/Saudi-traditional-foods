import { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import { getSaudiMeals, searchSaudiMeals } from '../api/index';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../api/index';
import './Home.css';

export default function Home() {
  const { user } = useAuth();

  const [meals,      setMeals]      = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [query,      setQuery]      = useState('');
  const [searching,  setSearching]  = useState(false);
  const [favIds,     setFavIds]     = useState([]);

  // Load all Saudi meals on mount
  useEffect(() => {
    getSaudiMeals()
      .then(data => { setMeals(data); setFiltered(data); })
      .catch(() => setError('Failed to load meals. Check your connection.'))
      .finally(() => setLoading(false));
  }, []);

  // Load user favorites
  useEffect(() => {
    if (!user?.id) return;
    getFavorites(user.id)
      .then(res => {
        if (res.success) setFavIds(res.data.favorites.map(f => String(f.meal_id)));
      })
      .catch(() => {});
  }, [user]);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) { setFiltered(meals); return; }

    setSearching(true);
    setError('');
    try {
      const results = await searchSaudiMeals(query.trim());
      setFiltered(results);
      if (results.length === 0) setError(`No Saudi meals found for "${query}".`);
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => { setQuery(''); setFiltered(meals); setError(''); };

  const handleFavChange = (mealId, isFav) => {
    setFavIds(prev => isFav ? [...prev, String(mealId)] : prev.filter(id => id !== String(mealId)));
  };

  return (
    <main className="page home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__content fade-up">
          <p className="hero__label">✦ Traditional Saudi Cuisine</p>
          <h1 className="hero__title">The Flavours of<br /><em>Saudi Arabia</em></h1>
          <p className="hero__sub">Authentic recipes from the heart of the Kingdom</p>

          {/* Search bar */}
          <form className="search-bar" onSubmit={handleSearch} role="search">
            <span className="search-bar__icon">🔍</span>
            <input
              className="search-bar__input"
              type="search"
              placeholder="Search Saudi dishes..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search meals"
            />
            {query && (
              <button type="button" className="search-bar__clear" onClick={clearSearch} aria-label="Clear">✕</button>
            )}
            <button type="submit" className="search-bar__btn" disabled={searching}>
              {searching ? '...' : 'Search'}
            </button>
          </form>
        </div>
      </section>

      {/* Meals grid */}
      <section className="meals-section">
        <div className="container">
          <div className="meals-header">
            <h2 className="meals-title">
              {query ? `Results for "${query}"` : 'All Saudi Dishes'}
            </h2>
            {!loading && !error && (
              <span className="meals-count">{filtered.length} dishes</span>
            )}
          </div>

          {/* Loading */}
          {(loading || searching) && (
            <div className="loading-wrap">
              <div className="spinner" />
              <span>{searching ? 'Searching...' : 'Loading Saudi meals...'}</span>
            </div>
          )}

          {/* Error */}
          {error && !loading && !searching && (
            <div className="empty">
              <div className="empty-icon">🍽️</div>
              <h3>No results found</h3>
              <p>{error}</p>
              {query && <button className="btn btn-outline" onClick={clearSearch}>Show all dishes</button>}
            </div>
          )}

          {/* Grid */}
          {!loading && !searching && !error && filtered.length > 0 && (
            <div className="grid">
              {filtered.map((meal, i) => (
                <div key={meal.idMeal} className="fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <MealCard
                    meal={meal}
                    isFav={favIds.includes(String(meal.idMeal))}
                    onFavChange={handleFavChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
