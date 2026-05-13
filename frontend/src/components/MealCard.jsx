import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import { saveFavorite, deleteFavorite } from '../Services/index';
import './MealCard.css';

export default function MealCard({ meal, isFav = false, onFavChange }) {
  const { user } = useAuth();
  const [fav,     setFav]     = useState(isFav);
  const [loading, setLoading] = useState(false);

  const toggle = async (e) => {
    e.preventDefault();
    if (!user) return;
    const next = !fav;
    setFav(next);           // Optimistic UI
    setLoading(true);
    try {
      if (next) {
        await saveFavorite({
          user_id:    user.id,
          meal_id:    meal.idMeal,
          meal_name:  meal.strMeal,
          meal_image: meal.strMealThumb,
        });
      } else {
        await deleteFavorite(meal.idMeal);
      }
      onFavChange?.(meal.idMeal, next);
    } catch {
      setFav(!next); // Rollback on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="card">
      <Link to={`/meal/${meal.idMeal}`} className="card__link">
        <div className="card__img-wrap">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="card__img"
            loading="lazy"
          />
          <div className="card__overlay" />
          {user && (
            <button
              className={`card__fav ${fav ? 'active' : ''} ${loading ? 'busy' : ''}`}
              onClick={toggle}
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={fav}
              disabled={loading}
            >
              {loading ? '·' : fav ? '❤️' : '🤍'}
            </button>
          )}
        </div>
        <div className="card__body">
          <h3 className="card__name">{meal.strMeal}</h3>
          <div className="card__meta">
            <span>🇸🇦 Saudi Arabia</span>
            {meal.strCategory && <span>· {meal.strCategory}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
