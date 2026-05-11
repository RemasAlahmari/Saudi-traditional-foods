import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import '../styles/Profile.css';

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', bio: '' });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // When backend ready: replace with getUserProfile()
    async function loadProfile() {
      try {
        await new Promise(r => setTimeout(r, 600));
        const data = {
          ...user,
          bio: user.bio || 'Passionate about authentic Saudi cuisine.',
          favoritesCount: user.favoritesCount || 0,
          joinDate: user.joinDate || 'Recently',
        };
        setProfileData(data);
        setEditForm({ username: data.username, bio: data.bio });
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!editForm.username.trim()) return;
    setSaving(true);
    try {
      // When backend ready: await updateUserProfile(editForm)
      await new Promise(r => setTimeout(r, 800));
      updateUser(editForm);
      setProfileData(prev => ({ ...prev, ...editForm }));
      setEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullPage text="Loading profile..." />;

  return (
    <main className="profile-page page-wrapper">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-card">
              {/* Avatar */}
              <div className="profile-avatar-wrap">
                <div className="profile-avatar" aria-label={`${profileData.username}'s avatar`}>
                  <span>{profileData.username?.[0]?.toUpperCase()}</span>
                </div>
                <div className="profile-avatar-ring" aria-hidden="true"></div>
              </div>

              {!editing ? (
                <>
                  <h1 className="profile-username">{profileData.username}</h1>
                  <p className="profile-email">{profileData.email}</p>
                  {profileData.bio && (
                    <p className="profile-bio">{profileData.bio}</p>
                  )}
                  <button
                    className="btn btn-secondary profile-edit-btn"
                    onClick={() => setEditing(true)}
                  >
                    ✏️ Edit Profile
                  </button>
                </>
              ) : (
                <div className="profile-edit-form">
                  <div className="form-group">
                    <label htmlFor="edit-username" className="form-label">Username</label>
                    <input
                      id="edit-username"
                      type="text"
                      className="form-input"
                      value={editForm.username}
                      onChange={e => setEditForm(p => ({ ...p, username: e.target.value }))}
                      disabled={saving}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-bio" className="form-label">Bio</label>
                    <textarea
                      id="edit-bio"
                      className="form-input profile-bio-input"
                      rows={3}
                      value={editForm.bio}
                      onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      disabled={saving}
                    />
                  </div>
                  <div className="profile-edit-actions">
                    <button
                      className="btn btn-primary"
                      onClick={handleSave}
                      disabled={saving || !editForm.username.trim()}
                      aria-busy={saving}
                    >
                      {saving ? <Loader size="sm" /> : null}
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditing(false);
                        setEditForm({ username: profileData.username, bio: profileData.bio });
                      }}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {saveSuccess && (
                <div className="save-success" role="status" aria-live="polite">
                  ✓ Profile updated!
                </div>
              )}

              <div className="profile-meta">
                <div className="profile-meta-item">
                  <span className="meta-label">Member since</span>
                  <span className="meta-val">{profileData.joinDate}</span>
                </div>
              </div>

              <button
                className="btn profile-logout-btn"
                onClick={logout}
                aria-label="Logout"
              >
                ↗ Logout
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="profile-main">
            {/* Stats */}
            <div className="profile-stats">
              <div className="profile-stat-card">
                <span className="stat-icon" aria-hidden="true">❤️</span>
                <div>
                  <span className="profile-stat-num">{profileData.favoritesCount}</span>
                  <span className="profile-stat-label">Saved Recipes</span>
                </div>
              </div>
              <div className="profile-stat-card">
                <span className="stat-icon" aria-hidden="true">🍽️</span>
                <div>
                  <span className="profile-stat-num">0</span>
                  <span className="profile-stat-label">Cooked Dishes</span>
                </div>
              </div>
              <div className="profile-stat-card">
                <span className="stat-icon" aria-hidden="true">⭐</span>
                <div>
                  <span className="profile-stat-num">0</span>
                  <span className="profile-stat-label">Reviews</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="profile-section">
              <h2 className="profile-section-title">Quick Access</h2>
              <div className="quick-links">
                <Link to="/favorites" className="quick-link-card">
                  <span className="quick-link-icon">❤️</span>
                  <div>
                    <span className="quick-link-title">My Favorites</span>
                    <span className="quick-link-sub">View all saved dishes</span>
                  </div>
                  <span className="quick-link-arrow">→</span>
                </Link>
                <Link to="/" className="quick-link-card">
                  <span className="quick-link-icon">🔍</span>
                  <div>
                    <span className="quick-link-title">Explore Dishes</span>
                    <span className="quick-link-sub">Discover new recipes</span>
                  </div>
                  <span className="quick-link-arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Account info */}
            <div className="profile-section">
              <h2 className="profile-section-title">Account Information</h2>
              <div className="account-info-grid">
                <div className="account-info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{profileData.email}</span>
                </div>
                <div className="account-info-item">
                  <span className="info-label">Username</span>
                  <span className="info-value">{profileData.username}</span>
                </div>
                <div className="account-info-item">
                  <span className="info-label">Member Since</span>
                  <span className="info-value">{profileData.joinDate}</span>
                </div>
                <div className="account-info-item">
                  <span className="info-label">Account Status</span>
                  <span className="info-value status-active">✓ Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
