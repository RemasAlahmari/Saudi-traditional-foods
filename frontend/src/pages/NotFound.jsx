import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page">
      <div className="empty" style={{ paddingTop: 120 }}>
        <div className="empty-icon">🍽️</div>
        <h3>404 — Page Not Found</h3>
        <p>This page doesn't exist or was moved.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </main>
  );
}
