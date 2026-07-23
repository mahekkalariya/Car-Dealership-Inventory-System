import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not log in. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = 'w-full border border-line font-mono text-sm px-3 py-2.5 focus:outline-none focus:border-accent transition-colors';

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-sm w-full bg-panel border-2 border-ink">
        <div className="bg-ink px-6 py-5 text-center">
          <p className="font-display text-white uppercase tracking-wide text-lg">Access Pass</p>
          <p className="font-mono text-[11px] text-gray-400 tracking-widest uppercase mt-1">AutoStock Inventory</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-gray-500 mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-gray-500 mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </div>
          {error && <p className="text-sm text-stock-out font-mono">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="cut-corner w-full bg-accent text-ink font-display font-semibold uppercase tracking-wide py-2.5 hover:bg-accent-deep hover:text-white transition-colors disabled:opacity-50"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p className="text-sm font-mono text-gray-500 pb-6 text-center">
          No account?{' '}
          <Link to="/register" className="text-accent hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}