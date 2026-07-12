import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__mark">RB</span>
        The Recipe Box
      </Link>
      <nav className="navbar__links">
        {user ? (
          <>
            <Link to="/new" className="btn btn--accent">+ Add recipe</Link>
            <span className="navbar__user">Hi, {user.name.split(' ')[0]}</span>
            <button className="btn btn--ghost" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn--ghost">Log in</Link>
            <Link to="/register" className="btn btn--accent">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}