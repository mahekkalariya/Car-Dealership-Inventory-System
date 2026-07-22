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
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg text-blue-700">
          Dealership Inventory
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              {user.name} {user.role === 'admin' && <span className="text-blue-600">(admin)</span>}
            </span>
            <button onClick={handleLogout} className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100">
              Log out
            </button>
          </div>
        ) : (
          <div className="flex gap-4 text-sm">
            <Link to="/login" className="hover:underline">Log in</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}