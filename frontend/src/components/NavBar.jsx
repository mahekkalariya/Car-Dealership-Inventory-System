import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg text-blue-700">
          Dealership Inventory
        </Link>
        <div className="flex gap-4 text-sm">
          <Link to="/login" className="hover:underline">Log in</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      </div>
    </header>
  );
}