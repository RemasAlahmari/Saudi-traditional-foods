import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/index';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate('/login'); return null; }

  const handleLogout = async () => {
    try { await logoutUser(); } catch {}
    logout();
    navigate('/login');
  };

  return (
    <main className="page profile-page">
      <div className="container">
        <div className="profile-card fade-up">
          <div className="profile-avatar">{user.username?.[0]?.toUpperCase()}</div>
          <h1 className="profile-name">{user.username}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-since">Member since {user.created_at?.split(' ')[0] || 'recently'}</p>
          <div className="profile-actions">
            <Link to="/favorites" className="btn btn-primary">❤️ My Favorites</Link>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </main>
  );
}
