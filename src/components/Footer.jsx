import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon-sm">✦</span>
                <span>Saudi Traditional Foods</span>
              </div>
              <p className="footer-tagline">
                Preserving the rich culinary heritage of the Arabian Peninsula — one recipe at a time.
              </p>
              <p className="footer-tagline-ar">حفظ التراث الغذائي للجزيرة العربية</p>
            </div>

            {/* Navigation */}
            <nav className="footer-nav" aria-label="Footer navigation">
              <h3 className="footer-heading">Explore</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </nav>

            {/* Categories */}
            <div className="footer-categories">
              <h3 className="footer-heading">Categories</h3>
              <ul>
                <li><Link to="/?category=Main Course">Main Course</Link></li>
                <li><Link to="/?category=Traditional">Traditional</Link></li>
                <li><Link to="/?category=Street Food">Street Food</Link></li>
                <li><Link to="/?category=Dessert">Desserts</Link></li>
              </ul>
            </div>

            {/* Info */}
            <div className="footer-info">
              <h3 className="footer-heading">About</h3>
              <p className="footer-about">
                Saudi Traditional Foods celebrates the culinary traditions of the Kingdom — from the spiced rice dishes of Najd to the coastal flavors of Hejaz.
              </p>
              <div className="footer-badge">
                <span>🇸🇦</span>
                <span>Made with pride in Saudi Arabia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              &copy; {year} Saudi Traditional Foods. All rights reserved.
            </p>
            <div className="footer-ornament">
              ✦ &nbsp; مأكولات سعودية &nbsp; ✦
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
