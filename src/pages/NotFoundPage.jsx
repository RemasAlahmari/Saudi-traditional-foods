import { Link, useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="notfound-page page-wrapper">
      <div className="notfound-container container">
        <div className="notfound-ornament" aria-hidden="true">✦</div>

        <div className="notfound-code" aria-hidden="true">
          <span>4</span>
          <span className="notfound-plate">🍽️</span>
          <span>4</span>
        </div>

        <h1 className="notfound-title">Recipe Not Found</h1>
        <p className="notfound-arabic" lang="ar">الصفحة غير موجودة</p>
        <p className="notfound-text">
          Oops! This page has wandered off into the desert. The dish you're looking for doesn't exist, or the URL may have changed.
        </p>

        <div className="notfound-actions">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>

        <div className="notfound-suggestions">
          <p className="notfound-suggest-label">You might be looking for:</p>
          <div className="notfound-links">
            <Link to="/" className="notfound-link">🏠 Home</Link>
            <Link to="/login" className="notfound-link">👤 Sign In</Link>
            <Link to="/register" className="notfound-link">✨ Register</Link>
            <Link to="/favorites" className="notfound-link">❤️ Favorites</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
