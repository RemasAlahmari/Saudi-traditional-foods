import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import '../styles/Auth.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!form.password) {
      errs.password = 'Password is required';
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      // When backend is ready: replace with loginUser({ email, password })
      // const data = await loginUser(form);
      // login(data.user, data.token);

      // Mock login for now
      await new Promise(r => setTimeout(r, 1000));
      const mockUser = {
        id: 1,
        username: form.email.split('@')[0],
        email: form.email,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      };
      login(mockUser, 'mock_jwt_token_placeholder');
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page page-wrapper">
      <div className="auth-layout">
        {/* Decorative side */}
        <div className="auth-side" aria-hidden="true">
          <div className="auth-side-content">
            <div className="auth-side-ornament">✦</div>
            <h2 className="auth-side-title">Welcome back to the Kingdom's Kitchen</h2>
            <p className="auth-side-sub">مرحباً بعودتك إلى مطبخ المملكة</p>
            <div className="auth-side-dishes">
              {['كبسة', 'مندي', 'جريش', 'مطبق'].map(d => (
                <span key={d} className="dish-tag">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="auth-form-side">
          <div className="auth-form-wrap">
            <div className="auth-form-header">
              <Link to="/" className="auth-back-home" aria-label="Back to home">
                <span>←</span> Home
              </Link>
              <div className="auth-logo">✦</div>
              <h1 className="auth-title">Sign In</h1>
              <p className="auth-subtitle">Enter your credentials to access your account</p>
            </div>

            {apiError && (
              <div className="api-error-banner" role="alert">
                <span>⚠</span> {apiError}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                  disabled={loading}
                />
                {errors.email && (
                  <p id="email-error" className="form-error" role="alert">
                    <span aria-hidden="true">⚠</span> {errors.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={!!errors.password}
                  disabled={loading}
                />
                {errors.password && (
                  <p id="password-error" className="form-error" role="alert">
                    <span aria-hidden="true">⚠</span> {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? <Loader size="sm" /> : null}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
