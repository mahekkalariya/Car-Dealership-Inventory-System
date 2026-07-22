import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
// ...keep existing imports

export default function Login() {
  const { mockLogin } = useAuth();
  const navigate = useNavigate();

  function handleMockLogin(email) {
    mockLogin(email);
    navigate('/');
  }

  return (
    <div className="max-w-sm mx-auto mt-12 bg-white p-6 rounded-lg border border-gray-200">
      <h1 className="text-xl font-semibold mb-4">Log in (temporary mock)</h1>
      <div className="space-y-2">
        <button onClick={() => handleMockLogin('user@example.com')} className="w-full bg-gray-100 rounded-md py-2 hover:bg-gray-200">
          Log in as regular user
        </button>
        <button onClick={() => handleMockLogin('admin@example.com')} className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700">
          Log in as admin
        </button>
      </div>
    </div>
  );
}