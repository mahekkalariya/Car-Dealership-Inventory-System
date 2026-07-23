
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="bg-ink border-b-4 border-accent sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link to="/" className="font-display font-semibold text-xl tracking-wide text-white uppercase">
          Auto<span className="text-accent">Stock</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="font-mono text-xs text-gray-300 uppercase tracking-wide">
              {user.name}
              {user.role === 'admin' && (
                <span className="ml-2 text-ink bg-accent px-2 py-0.5 rounded-sm font-semibold">ADMIN</span>
              )}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-mono uppercase tracking-wide px-3 py-1.5 border border-gray-600 text-gray-200 hover:border-accent hover:text-accent transition-colors"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex gap-2 text-sm font-mono uppercase tracking-wide">
            <Link to="/login" className="px-3 py-1.5 text-gray-200 hover:text-accent transition-colors">
              Log in
            </Link>
            <Link to="/register" className="px-3 py-1.5 bg-accent text-ink font-semibold hover:bg-accent-deep transition-colors">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
