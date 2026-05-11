import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import '../styles/Auth.css';
import '../styles/Register.css';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) {
      errs.username = 'Username is required';
    } else if (form.username.trim().length < 3) {
      errs.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      errs.username = 'Only letters, numbers, and underscores allowed';
    }

    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email';
    }

    if (!form.password) {
      errs.password = 'Password is required';
    } else if (form.password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      errs.password = 'Password must include at least one uppercase letter and one number';
    }

    if (!form.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { level: 'weak', label: 'Weak', color: 'var(--error)' };
    if (score === 2) return { level: 'fair', label: 'Fair', color: 'var(--gold)' };
    if (score === 3) return { level: 'good', label: 'Good', color: 'var(--success)' };
    return { level: 'strong', label: 'Strong', color: 'var(--success)' };
  };

  const passwordStrength = getPasswordStrength(form.password);

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
      // When backend ready: replace with registerUser({ username, email, password })
      // const data = await registerUser({ username: form.username, email: form.email, password: form.password });
      // login(data.user, data.token);

      await new Promise(r => setTimeout(r, 1200));
      const mockUser = {
        id: Date.now(),
        username: form.username,
        email: form.email,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      };
      login(mockUser, 'mock_jwt_token_placeholder');
      navigate('/', { replace: true });
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page page-wrapper">
      <div className="auth-layout">
        {/* Decorative side */}
        <div className="auth-side register-side" aria-hidden="true">
          <div className="auth-side-content">
            <div className="auth-side-ornament">✦</div>
            <h2 className="auth-side-title">Join the Saudi Culinary Heritage Community</h2>
            <p className="auth-side-sub">انضم إلى مجتمع التراث الطهوي السعودي</p>
            <div className="register-perks">
              {[
                { icon: '❤️', text: 'Save your favourite recipes' },
                { icon: '🔔', text: 'Get notified of new dishes' },
                { icon: '🌿', text: 'Discover regional cuisines' },
              ].map(p => (
                <div key={p.text} className="perk-item">
                  <span className="perk-icon">{p.icon}</span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="auth-form-side">
          <div className="auth-form-wrap">
            <div className="auth-form-header">
              <Link to="/" className="auth-back-home">
                <span>←</span> Home
              </Link>
              <div className="auth-logo">✦</div>
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join thousands of Saudi food enthusiasts</p>
            </div>

            {apiError && (
              <div className="api-error-banner" role="alert">
                <span>⚠</span> {apiError}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Username */}
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className={`form-input ${errors.username ? 'error' : ''}`}
                  placeholder="your_username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  aria-invalid={!!errors.username}
                  disabled={loading}
                />
                {errors.username && (
                  <p id="username-error" className="form-error" role="alert">
                    <span aria-hidden="true">⚠</span> {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="reg-email" className="form-label">Email Address</label>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-describedby={errors.email ? 'reg-email-error' : undefined}
                  aria-invalid={!!errors.email}
                  disabled={loading}
                />
                {errors.email && (
                  <p id="reg-email-error" className="form-error" role="alert">
                    <span aria-hidden="true">⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="reg-password" className="form-label">Password</label>
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  aria-describedby={errors.password ? 'reg-password-error' : 'password-strength'}
                  aria-invalid={!!errors.password}
                  disabled={loading}
                />
                {/* Strength indicator */}
                {form.password && !errors.password && (
                  <div id="password-strength" className="password-strength" aria-live="polite">
                    <div className="strength-bars">
                      {[1, 2, 3, 4].map(i => {
                        const levels = { weak: 1, fair: 2, good: 3, strong: 4 };
                        const filled = levels[passwordStrength?.level] >= i;
                        return (
                          <div
                            key={i}
                            className="strength-bar"
                            style={{ background: filled ? passwordStrength.color : undefined }}
                          ></div>
                        );
                      })}
                    </div>
                    <span style={{ color: passwordStrength?.color }}>
                      {passwordStrength?.label}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <p id="reg-password-error" className="form-error" role="alert">
                    <span aria-hidden="true">⚠</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                  aria-invalid={!!errors.confirmPassword}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p id="confirm-error" className="form-error" role="alert">
                    <span aria-hidden="true">⚠</span> {errors.confirmPassword}
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
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
