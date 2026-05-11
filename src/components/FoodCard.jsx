import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/FoodCard.css';

export default function FoodCard({ meal, onFavoriteToggle, isFavorited = false }) {
  const { user } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [favorited, setFavorited] = useState(isFavorited);
  const [favAnimating, setFavAnimating] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;

    setFavAnimating(true);
    setFavorited(!favorited);
    setTimeout(() => setFavAnimating(false), 400);

    if (onFavoriteToggle) {
      onFavoriteToggle(meal.id, !favorited);
    }
  };

  const difficultyColor = {
    'Easy': 'var(--success)',
    'Medium': 'var(--gold)',
    'Hard': 'var(--burgundy)',
  }[meal.difficulty] || 'var(--text-muted)';

  return (
    <article className="food-card">
      <Link to={`/meal/${meal.id}`} className="food-card-link" aria-label={`View ${meal.name} details`}>
        {/* Image */}
        <div className="food-card-image-wrap">
          {!imgError ? (
            <img
              src={meal.image}
              alt={`${meal.name} — ${meal.nameAr}`}
              className="food-card-image"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="food-card-image-fallback" aria-label={meal.name}>
              <span>🍽️</span>
            </div>
          )}

          {/* Badges */}
          <div className="food-card-badges">
            <span className="badge badge-category">{meal.category}</span>
            {meal.isFeatured && <span className="badge badge-featured">✦ Featured</span>}
          </div>

          {/* Favorite button */}
          {user && (
            <button
              className={`fav-btn ${favorited ? 'favorited' : ''} ${favAnimating ? 'animate' : ''}`}
              onClick={handleFavorite}
              aria-label={favorited ? `Remove ${meal.name} from favorites` : `Add ${meal.name} to favorites`}
              aria-pressed={favorited}
            >
              {favorited ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        {/* Body */}
        <div className="food-card-body">
          <div className="food-card-header">
            <h3 className="food-card-name">{meal.name}</h3>
            <span className="food-card-name-ar">{meal.nameAr}</span>
          </div>

          <p className="food-card-origin">
            <span aria-hidden="true">📍</span> {meal.origin}
          </p>

          <p className="food-card-desc">{meal.description}</p>

          {/* Meta */}
          <div className="food-card-meta">
            <span className="meta-item" aria-label={`Rating: ${meal.rating} out of 5`}>
              <span aria-hidden="true">★</span> {meal.rating}
            </span>
            <span className="meta-item" aria-label={`Cook time: ${meal.cookTime}`}>
              <span aria-hidden="true">⏱</span> {meal.cookTime}
            </span>
            <span
              className="meta-item meta-difficulty"
              style={{ color: difficultyColor }}
              aria-label={`Difficulty: ${meal.difficulty}`}
            >
              {meal.difficulty}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
