import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not register. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-12 bg-white p-6 rounded-lg border border-gray-200">
      <h1 className="text-xl font-semibold mb-4">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input required value={form.name} onChange={(e) => update('name', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input type="password" required minLength={6} value={form.password} onChange={(e) => update('password', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-2">Account type</label>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                checked={form.role === 'user'}
                onChange={() => update('role', 'user')}
              />
              Regular user
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                checked={form.role === 'admin'}
                onChange={() => update('role', 'admin')}
              />
              Admin
            </label>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={submitting}
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 disabled:opacity-50">
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
}