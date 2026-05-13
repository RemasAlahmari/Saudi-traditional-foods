import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import { logoutUser } from '../Services/index';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLogout = async () => {
    try { await logoutUser(); } catch {}
    logout();
    navigate('/login');
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-star">✦</span>
          <span>Saudi Foods</span>
        </Link>

        <nav className="nav__links" aria-label="Main">
          <NavLink to="/"          end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/favorites"     className={({isActive}) => isActive ? 'active' : ''}>Favorites</NavLink>
        </nav>

        <div className="nav__auth">
          {user ? (
            <>
              <Link to="/profile" className="nav__user">
                <span className="nav__avatar">{user.username?.[0]?.toUpperCase()}</span>
                <span className="nav__username">{user.username}</span>
              </Link>
              <button className="btn btn-ghost nav__logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn btn-ghost">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
          <button className={`nav__burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile */}
      {open && (
        <div className="nav__mobile">
          <NavLink to="/"          end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/favorites"     onClick={() => setOpen(false)}>Favorites</NavLink>
          {user
            ? <><NavLink to="/profile" onClick={() => setOpen(false)}>Profile</NavLink>
                <button onClick={() => { handleLogout(); setOpen(false); }}>Logout</button></>
            : <><Link to="/login"    onClick={() => setOpen(false)}>Sign In</Link>
                <Link to="/register" onClick={() => setOpen(false)}>Register</Link></>
          }
        </div>
      )}
    </header>
  );
}
