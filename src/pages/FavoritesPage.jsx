import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import Loader from '../components/Loader';
import { MOCK_MEALS, mockDelay } from '../api/mockData';
import '../styles/Favorites.css';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When backend ready: replace with getFavorites()
    async function loadFavorites() {
      try {
        await mockDelay(800);
        // Mock: return first 2 featured meals as favorites
        const mockFavs = MOCK_MEALS.filter(m => m.isFeatured).slice(0, 2);
        setFavorites(mockFavs);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, []);

  const handleRemoveFavorite = (mealId) => {
    setFavorites(prev => prev.filter(m => m.id !== mealId));
    // When backend ready: removeFavorite(mealId)
  };

  return (
    <main className="favorites-page page-wrapper">
      {/* Header */}
      <section className="favorites-header">
        <div className="container">
          <div className="favorites-header-inner">
            <div>
              <p className="section-subtitle">Your collection</p>
              <h1 className="favorites-title">My Favourites</h1>
              <p className="favorites-title-ar" lang="ar">المفضلة</p>
            </div>
            {!loading && favorites.length > 0 && (
              <span className="favorites-count" aria-label={`${favorites.length} saved dishes`}>
                {favorites.length} dish{favorites.length !== 1 ? 'es' : ''} saved
              </span>
            )}
          </div>
          <div className="gold-divider"></div>
        </div>
      </section>

      <section className="favorites-content section">
        <div className="container">
          {loading ? (
            <div className="fav-loading" aria-live="polite">
              <Loader size="lg" text="Loading your favourites..." />
            </div>
          ) : favorites.length > 0 ? (
            <>
              <div className="foods-grid">
                {favorites.map((meal, i) => (
                  <div
                    key={meal.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <FoodCard
                      meal={meal}
                      isFavorited={true}
                      onFavoriteToggle={(id, isFav) => {
                        if (!isFav) handleRemoveFavorite(id);
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="fav-empty empty-state">
              <div className="empty-state-icon">🤍</div>
              <h3>No saved dishes yet</h3>
              <p>
                Explore our collection and tap the heart icon on any dish to save it here.
              </p>
              <Link to="/" className="btn btn-primary">
                Explore Dishes
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Discover more */}
      {!loading && favorites.length > 0 && (
        <section className="fav-discover section">
          <div className="container">
            <div className="fav-discover-inner">
              <div>
                <h2 className="fav-discover-title">Discover More</h2>
                <p className="fav-discover-sub">Continue exploring Saudi culinary heritage</p>
              </div>
              <Link to="/" className="btn btn-primary">Browse All Dishes</Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
