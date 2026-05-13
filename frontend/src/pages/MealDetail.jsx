import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealById, saveFavorite, deleteFavorite } from '../Services/index';
import { useAuth } from '../state/AuthContext';
import './MealDetail.css';

export default function MealDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { user }   = useAuth();

  const [meal,    setMeal]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [fav,     setFav]     = useState(false);
  const [favBusy, setFavBusy] = useState(false);

  useEffect(() => {
    getMealById(id)
      .then(data => {
        if (!data) { setError('Meal not found.'); return; }
        setMeal(data);
      })
      .catch(() => setError('Failed to load meal.'))
      .finally(() => setLoading(false));
  }, [id]);

  // Build ingredients list from TheMealDB structure
  const ingredients = meal
    ? Array.from({ length: 20 }, (_, i) => {
        const ing  = meal[`strIngredient${i + 1}`];
        const meas = meal[`strMeasure${i + 1}`];
        return ing?.trim() ? `${meas?.trim() || ''} ${ing}`.trim() : null;
      }).filter(Boolean)
    : [];

  const toggleFav = async () => {
    if (!user) return navigate('/login');
    const next = !fav;
    setFav(next);
    setFavBusy(true);
    try {
      if (next) {
        await saveFavorite({ user_id: user.id, meal_id: meal.idMeal, meal_name: meal.strMeal, meal_image: meal.strMealThumb });
      } else {
        await deleteFavorite(meal.idMeal);
      }
    } catch { setFav(!next); }
    finally  { setFavBusy(false); }
  };

  if (loading) return <div className="page"><div className="loading-wrap"><div className="spinner" /><span>Loading recipe...</span></div></div>;
  if (error)   return <div className="page"><div className="empty"><div className="empty-icon">🍽️</div><h3>{error}</h3><button className="btn btn-primary" onClick={() => navigate('/')}>Go back</button></div></div>;

  return (
    <main className="page detail">
      <div className="container">
        <button className="detail__back btn btn-ghost" onClick={() => navigate(-1)}>← Back</button>

        <div className="detail__hero">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="detail__img" />
          <div className="detail__info">
            <span className="detail__area">🇸🇦 {meal.strArea}</span>
            <h1 className="detail__name">{meal.strMeal}</h1>
            <div className="detail__tags">
              {meal.strCategory && <span className="tag">{meal.strCategory}</span>}
              {meal.strTags && meal.strTags.split(',').map(t => t.trim()).filter(Boolean).map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <button
              className={`btn detail__fav-btn ${fav ? 'active' : ''}`}
              onClick={toggleFav} disabled={favBusy}
            >
              {fav ? '❤️ Saved' : '🤍 Save to Favorites'}
            </button>
            {!user && <p className="detail__login-hint"><a href="/login">Sign in</a> to save this recipe.</p>}
          </div>
        </div>

        <div className="detail__body">
          {/* Ingredients */}
          <section className="detail__section">
            <h2>Ingredients</h2>
            <ul className="ingredients">
              {ingredients.map((ing, i) => (
                <li key={i} className="ingredients__item">
                  <span className="ingredients__dot">✦</span> {ing}
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions */}
          <section className="detail__section">
            <h2>Instructions</h2>
            <div className="instructions">
              {meal.strInstructions
                ? meal.strInstructions.split(/\r?\n/).filter(p => p.trim()).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                : <p>No instructions available.</p>
              }
            </div>
          </section>

          {/* YouTube */}
          {meal.strYoutube && (
            <section className="detail__section">
              <h2>Video</h2>
              <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="btn btn-outline">
                ▶ Watch on YouTube
              </a>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
