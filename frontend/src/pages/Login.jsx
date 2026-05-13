import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../Services/index';
import { useAuth } from '../state/AuthContext';
import './Auth.css';

export default function Login() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const from       = location.state?.from?.pathname || '/';

  const [form,    setForm]    = useState({ email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [apiErr,  setApiErr]  = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim())                                      e.email    = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))   e.email    = 'Enter a valid email.';
    if (!form.password)                                          e.password = 'Password is required.';
    else if (form.password.length < 6)                          e.password = 'Min. 6 characters.';
    return e;
  };

  const onChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
    setApiErr('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      login(res.data.user);
      navigate(from, { replace: true });
    } catch (err) {
      setApiErr(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page auth-page">
      <div className="auth-box fade-up">
        <div className="auth-logo">✦</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to access your saved recipes</p>

        {apiErr && <div className="err-banner">⚠ {apiErr}</div>}

        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className={`form-input ${errors.email ? 'err' : ''}`}
              placeholder="you@example.com" value={form.email} onChange={onChange} disabled={loading} autoComplete="email" />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className={`form-input ${errors.password ? 'err' : ''}`}
              placeholder="••••••••" value={form.password} onChange={onChange} disabled={loading} autoComplete="current-password" />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? <><span className="spinner-sm" /> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          No account? <Link to="/register">Create one free</Link>
        </p>
      </div>
    </main>
  );
}
