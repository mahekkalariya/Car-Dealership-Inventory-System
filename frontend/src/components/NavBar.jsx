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
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white text-sm">
            🚗
          </span>
          Dealership Inventory
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              {user.name}{' '}
              {user.role === 'admin' && (
                <span className="ml-1 text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                  ADMIN
                </span>
              )}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex gap-3 text-sm font-medium">
            <Link to="/login" className="px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Log in</Link>
            <Link to="/register" className="px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
