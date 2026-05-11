import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFavorites, deleteFavorite, getMealById } from '../api/index';
import { useAuth } from '../context/AuthContext';
import MealCard from '../components/MealCard';
import './Favorites.css';

export default function Favorites() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [meals,    setMeals]   = useState([]);
  const [loading,  setLoading] = useState(true);
  const [error,    setError]   = useState('');

  useEffect(() => {
    if (!user?.id) { navigate('/login', { state: { from: { pathname: '/favorites' } } }); return; }

    getFavorites(user.id)
      .then(async res => {
        if (!res.success) throw new Error(res.message);
        // Fetch full meal details for each saved meal
        const details = await Promise.allSettled(
          res.data.favorites.map(f => getMealById(f.meal_id))
        );
        const found = details
          .filter(r => r.status === 'fulfilled' && r.value)
          .map(r => r.value);
        setMeals(found);
      })
      .catch(() => setError('Failed to load favorites.'))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleFavChange = (mealId, isFav) => {
    if (!isFav) setMeals(prev => prev.filter(m => m.idMeal !== String(mealId)));
  };

  return (
    <main className="page fav-page">
      <div className="container">
        <div className="fav-header">
          <h1 className="fav-title">My Favorites</h1>
          {!loading && <span className="meals-count">{meals.length} saved</span>}
        </div>

        {loading && <div className="loading-wrap"><div className="spinner" /><span>Loading your saved recipes...</span></div>}

        {error && <div className="err-banner">⚠ {error}</div>}

        {!loading && !error && meals.length === 0 && (
          <div className="empty">
            <div className="empty-icon">🤍</div>
            <h3>No saved recipes yet</h3>
            <p>Explore Saudi dishes and tap the heart to save your favorites here.</p>
            <Link to="/" className="btn btn-primary">Explore dishes</Link>
          </div>
        )}

        {!loading && meals.length > 0 && (
          <div className="grid">
            {meals.map((meal, i) => (
              <div key={meal.idMeal} className="fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <MealCard meal={meal} isFav={true} onFavChange={handleFavChange} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
