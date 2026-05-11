import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { MOCK_MEALS, MOCK_CATEGORIES, mockDelay } from '../api/mockData';
import '../styles/Home.css';

export default function HomePage() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // When backend is ready, replace with: getMeals()
    async function loadMeals() {
      try {
        await mockDelay(900);
        setMeals(MOCK_MEALS);
        setFilteredMeals(MOCK_MEALS);
      } catch (error) {
        console.error('Failed to load meals:', error);
      } finally {
        setLoading(false);
      }
    }
    loadMeals();
  }, []);

  // Filter meals when search or category changes
  useEffect(() => {
    let results = meals;

    if (activeCategory !== 'All') {
      results = results.filter(m => m.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.nameAr.includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.origin.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }

    setFilteredMeals(results);
  }, [searchQuery, activeCategory, meals]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFavoriteToggle = (mealId, isFav) => {
    setFavorites(prev =>
      isFav ? [...prev, mealId] : prev.filter(id => id !== mealId)
    );
    // When backend ready: isFav ? addFavorite(mealId) : removeFavorite(mealId)
  };

  const featuredMeals = meals.filter(m => m.isFeatured).slice(0, 3);
  const categories = ['All', ...MOCK_CATEGORIES.map(c => c.name)];

  return (
    <main className="home-page page-wrapper">
      {/* ── Hero ── */}
      <section className="hero" aria-label="Welcome banner">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-pattern"></div>
          <div className="hero-gradient"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-badge animate-fade-up">
            <span>✦</span>
            <span>Heritage Kitchen</span>
            <span>✦</span>
          </div>

          <h1 className="hero-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span>The Flavours of</span>
            <em>Saudi Arabia</em>
          </h1>

          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Discover centuries-old recipes, aromatic spices, and the stories behind the Kingdom's most beloved dishes
          </p>

          <div className="hero-search animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search kabsa, mandi, jareesh..."
              large
            />
          </div>

          <div className="hero-stats animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="stat">
              <span className="stat-num">80+</span>
              <span className="stat-label">Recipes</span>
            </div>
            <div className="stat-divider" aria-hidden="true">✦</div>
            <div className="stat">
              <span className="stat-num">13</span>
              <span className="stat-label">Regions</span>
            </div>
            <div className="stat-divider" aria-hidden="true">✦</div>
            <div className="stat">
              <span className="stat-num">500+</span>
              <span className="stat-label">Years of Heritage</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>↓</span>
        </div>
      </section>

      {/* ── Featured ── */}
      {!loading && featuredMeals.length > 0 && (
        <section className="featured-section section" aria-labelledby="featured-heading">
          <div className="container">
            <div className="section-header">
              <p className="section-subtitle">Handpicked for you</p>
              <h2 className="section-title" id="featured-heading">Featured Dishes</h2>
              <div className="gold-divider"></div>
            </div>

            <div className="featured-grid">
              {featuredMeals.map((meal, i) => (
                <div
                  key={meal.id}
                  className={`featured-item ${i === 0 ? 'featured-hero' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <Link to={`/meal/${meal.id}`} className="featured-card" aria-label={`View ${meal.name}`}>
                    <div className="featured-image-wrap">
                      <img
                        src={meal.image}
                        alt={`${meal.name} — ${meal.nameAr}`}
                        className="featured-image"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="featured-overlay"></div>
                    </div>
                    <div className="featured-info">
                      <span className="featured-category">{meal.category}</span>
                      <h3 className="featured-name">{meal.name}</h3>
                      <span className="featured-name-ar">{meal.nameAr}</span>
                      <div className="featured-meta">
                        <span>★ {meal.rating}</span>
                        <span>⏱ {meal.cookTime}</span>
                        <span>📍 {meal.origin}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Meals ── */}
      <section className="meals-section section" aria-labelledby="meals-heading">
        <div className="container">
          <div className="meals-header">
            <div className="section-header">
              <p className="section-subtitle">Our collection</p>
              <h2 className="section-title" id="meals-heading">
                {searchQuery ? `Results for "${searchQuery}"` : 'Traditional Meals'}
              </h2>
              <div className="gold-divider"></div>
            </div>

            {/* Category filters */}
            <div className="category-filters" role="group" aria-label="Filter by category">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="meals-loading" aria-live="polite" aria-label="Loading meals">
              <Loader size="lg" text="Preparing the feast..." />
            </div>
          ) : filteredMeals.length > 0 ? (
            <>
              <p className="results-count" aria-live="polite">
                {filteredMeals.length} {filteredMeals.length === 1 ? 'dish' : 'dishes'} found
              </p>
              <div className="foods-grid">
                {filteredMeals.map((meal, i) => (
                  <div
                    key={meal.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <FoodCard
                      meal={meal}
                      isFavorited={favorites.includes(meal.id)}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state" role="status">
              <div className="empty-state-icon">🍽️</div>
              <h3>No dishes found</h3>
              <p>
                {searchQuery
                  ? `We couldn't find dishes matching "${searchQuery}". Try a different search.`
                  : 'No dishes in this category yet. Check back soon!'}
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <p className="section-subtitle">Join the community</p>
              <h2 className="cta-title">Save Your Favourite Recipes</h2>
              <p className="cta-desc">
                Create a free account to bookmark dishes, track what you've cooked, and access exclusive regional recipes.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary">Create Account</Link>
              <Link to="/login" className="btn btn-secondary">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
