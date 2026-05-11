import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { MOCK_MEALS, mockDelay } from '../api/mockData';
import { useAuth } from '../context/AuthContext';
import '../styles/FoodDetail.css';

export default function FoodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [favorited, setFavorited] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // When backend ready: replace with getMealById(id)
    async function loadMeal() {
      try {
        await mockDelay(700);
        const found = MOCK_MEALS.find(m => m.id === parseInt(id));
        if (found) {
          setMeal(found);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    loadMeal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <Loader fullPage text="Loading recipe..." />;

  if (notFound) return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="empty-state">
        <div className="empty-state-icon">🍽️</div>
        <h3>Recipe not found</h3>
        <p>The dish you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <main className="food-detail-page page-wrapper">
      {/* Back button */}
      <div className="detail-back container">
        <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">
          <span aria-hidden="true">←</span> Back
        </button>
      </div>

      {/* Hero */}
      <section className="detail-hero" aria-label={`${meal.name} hero image`}>
        <div className="detail-hero-image-wrap">
          {!imgError ? (
            <img
              src={meal.image}
              alt={`${meal.name} — ${meal.nameAr}`}
              className="detail-hero-image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="detail-hero-fallback"><span>🍽️</span></div>
          )}
          <div className="detail-hero-overlay" aria-hidden="true"></div>
        </div>

        <div className="container detail-hero-content">
          <div className="detail-badges">
            <span className="tag tag-gold">{meal.category}</span>
            {meal.isFeatured && <span className="tag tag-burgundy">✦ Featured</span>}
          </div>

          <h1 className="detail-title">{meal.name}</h1>
          <p className="detail-title-ar" lang="ar">{meal.nameAr}</p>

          <div className="detail-meta-row">
            <span className="detail-meta-item" aria-label={`Rating: ${meal.rating}`}>
              <span aria-hidden="true">★</span> {meal.rating}
              <span className="meta-sub">({meal.reviewCount} reviews)</span>
            </span>
            <span className="detail-meta-item" aria-label={`Origin: ${meal.origin}`}>
              <span aria-hidden="true">📍</span> {meal.origin}
            </span>
            <span className="detail-meta-item" aria-label={`Difficulty: ${meal.difficulty}`}>
              <span aria-hidden="true">📊</span> {meal.difficulty}
            </span>
            <span className="detail-meta-item" aria-label={`Calories: ${meal.calories}`}>
              <span aria-hidden="true">🔥</span> {meal.calories} kcal
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="detail-content section">
        <div className="container">
          <div className="detail-layout">
            {/* Left: description + steps */}
            <div className="detail-main">
              <p className="detail-description">{meal.description}</p>

              {/* Tabs */}
              <div className="detail-tabs" role="tablist">
                <button
                  className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ingredients')}
                  role="tab"
                  aria-selected={activeTab === 'ingredients'}
                  aria-controls="ingredients-panel"
                >
                  Ingredients ({meal.ingredients.length})
                </button>
                <button
                  className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('instructions')}
                  role="tab"
                  aria-selected={activeTab === 'instructions'}
                  aria-controls="instructions-panel"
                >
                  Instructions ({meal.instructions.length} steps)
                </button>
              </div>

              {/* Ingredients panel */}
              {activeTab === 'ingredients' && (
                <div id="ingredients-panel" role="tabpanel" className="ingredients-panel">
                  <ul className="ingredients-list">
                    {meal.ingredients.map((ing, i) => (
                      <li key={i} className="ingredient-item">
                        <span className="ingredient-dot" aria-hidden="true">✦</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions panel */}
              {activeTab === 'instructions' && (
                <div id="instructions-panel" role="tabpanel" className="instructions-panel">
                  <ol className="steps-list">
                    {meal.instructions.map((step) => (
                      <li key={step.step} className="step-item">
                        <div className="step-number" aria-hidden="true">{step.step}</div>
                        <div className="step-body">
                          <h3 className="step-title">{step.title}</h3>
                          <p className="step-text">{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Right: quick info */}
            <aside className="detail-sidebar" aria-label="Recipe quick info">
              <div className="sidebar-card">
                <h2 className="sidebar-title">Quick Info</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Prep Time</span>
                    <span className="info-value">{meal.prepTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Cook Time</span>
                    <span className="info-value">{meal.cookTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Servings</span>
                    <span className="info-value">{meal.servings} people</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Calories</span>
                    <span className="info-value">{meal.calories} kcal</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Difficulty</span>
                    <span className="info-value">{meal.difficulty}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Origin</span>
                    <span className="info-value">{meal.origin}</span>
                  </div>
                </div>

                {user ? (
                  <button
                    className={`sidebar-fav-btn ${favorited ? 'active' : ''}`}
                    onClick={() => setFavorited(!favorited)}
                    aria-pressed={favorited}
                  >
                    {favorited ? '❤️ Saved to Favorites' : '🤍 Save to Favorites'}
                  </button>
                ) : (
                  <Link to="/login" className="sidebar-login-cta">
                    <span>Sign in to save recipes</span>
                    <span>→</span>
                  </Link>
                )}
              </div>

              {/* Origin card */}
              <div className="sidebar-card origin-card">
                <div className="origin-flag">🇸🇦</div>
                <h3 className="origin-title">{meal.origin}</h3>
                <p className="origin-text">
                  This dish originates from the {meal.origin} of Saudi Arabia, carrying centuries of culinary tradition.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
