import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">✦ Saudi Traditional Foods</span>
        <span className="footer__copy">© {new Date().getFullYear()} — Powered by TheMealDB</span>
      </div>
    </footer>
  );
}