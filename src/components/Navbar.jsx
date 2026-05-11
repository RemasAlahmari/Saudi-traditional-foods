import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} role="banner">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu} aria-label="Saudi Traditional Foods — Home">
          <span className="logo-icon">✦</span>
          <span className="logo-text">
            <span className="logo-en">Saudi Foods</span>
            <span className="logo-ar">مأكولات سعودية</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Favorites
          </NavLink>
        </nav>

        {/* Auth actions */}
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <span className="user-avatar" aria-hidden="true">
                  {user.username?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="user-name">{user.username}</span>
                <span className="chevron" aria-hidden="true">▾</span>
              </button>
              {dropdownOpen && (
                <div className="user-dropdown" role="menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)} role="menuitem">
                    <span>👤</span> Profile
                  </Link>
                  <Link to="/favorites" className="dropdown-item" onClick={() => setDropdownOpen(false)} role="menuitem">
                    <span>❤️</span> Favorites
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout} role="menuitem">
                    <span>↗</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <NavLink to="/" end className="mobile-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/favorites" className="mobile-link" onClick={closeMenu}>Favorites</NavLink>
          {user && <NavLink to="/profile" className="mobile-link" onClick={closeMenu}>Profile</NavLink>}
        </nav>
        <div className="mobile-auth">
          {user ? (
            <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" onClick={closeMenu}>Sign In</Link>
              <Link to="/register" className="btn btn-primary" onClick={closeMenu}>Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={closeMenu} aria-hidden="true"></div>}
    </header>
  );
}
