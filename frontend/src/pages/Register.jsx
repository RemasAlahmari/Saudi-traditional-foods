import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/index';
import { useAuth } from '../state/AuthContext';
import './Auth.css';

export default function Register() {
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const [form,    setForm]    = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors,  setErrors]  = useState({});
  const [apiErr,  setApiErr]  = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim())            e.username = 'Username is required.';
    else if (form.username.length < 3)    e.username = 'Min. 3 characters.';
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) e.username = 'Letters, numbers, underscores only.';

    if (!form.email.trim())               e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';

    if (!form.password)                   e.password = 'Password is required.';
    else if (form.password.length < 8)    e.password = 'Min. 8 characters.';
    else if (!/(?=.*[A-Z])(?=.*\d)/.test(form.password)) e.password = 'Include 1 uppercase letter and 1 number.';

    if (!form.confirm)                    e.confirm = 'Please confirm your password.';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match.';

    return e;
  };

  const onChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
    setApiErr('');
  };

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8)         s++;
    if (/[A-Z]/.test(p))       s++;
    if (/[0-9]/.test(p))       s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#DC2626', '#D97706', '#16A34A', '#16A34A'][strength];

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await registerUser({ username: form.username, email: form.email, password: form.password });
      login(res.data.user);
      navigate('/');
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setApiErr(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page auth-page">
      <div className="auth-box fade-up">
        <div className="auth-logo">✦</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">Join the Saudi food community</p>

        {apiErr && <div className="err-banner">⚠ {apiErr}</div>}

        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input id="username" name="username" type="text" className={`form-input ${errors.username ? 'err' : ''}`}
              placeholder="your_username" value={form.username} onChange={onChange} disabled={loading} autoComplete="username" />
            {errors.username && <p className="form-error">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email</label>
            <input id="reg-email" name="email" type="email" className={`form-input ${errors.email ? 'err' : ''}`}
              placeholder="you@example.com" value={form.email} onChange={onChange} disabled={loading} autoComplete="email" />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input id="reg-password" name="password" type="password" className={`form-input ${errors.password ? 'err' : ''}`}
              placeholder="Min. 8 characters" value={form.password} onChange={onChange} disabled={loading} autoComplete="new-password" />
            {form.password && !errors.password && (
              <div className="strength-bar-wrap">
                {[1,2,3,4].map(i => (
                  <div key={i} className="strength-bar" style={{ background: strength >= i ? strengthColor : undefined }} />
                ))}
                <span style={{ color: strengthColor, fontSize: '.75rem', fontWeight: 600 }}>{strengthLabel}</span>
              </div>
            )}
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm">Confirm Password</label>
            <input id="confirm" name="confirm" type="password" className={`form-input ${errors.confirm ? 'err' : ''}`}
              placeholder="Repeat password" value={form.confirm} onChange={onChange} disabled={loading} autoComplete="new-password" />
            {errors.confirm && <p className="form-error">{errors.confirm}</p>}
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? <><span className="spinner-sm" /> Creating account...</> : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
