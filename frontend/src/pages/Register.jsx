import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page page--narrow">
      <div className="auth-card">
        <h1 className="auth-card__title">Start your box</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="form__label">
            Name
            <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="form__label">
            Email
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="form__label">
            Password
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
          </label>
          {error && <p className="form__error">{error}</p>}
          <button type="submit" className="btn btn--accent btn--block" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
        <p className="auth-card__footer">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}