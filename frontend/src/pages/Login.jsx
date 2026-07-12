import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page page--narrow">
      <div className="auth-card">
        <h1 className="auth-card__title">Welcome back</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="form__label">
            Email
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="form__label">
            Password
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <p className="form__error">{error}</p>}
          <button type="submit" className="btn btn--accent btn--block" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p className="auth-card__footer">New here? <Link to="/register">Create an account</Link></p>
      </div>
    </div>
  );
}