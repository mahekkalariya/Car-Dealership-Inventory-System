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

  const inputClass = 'w-full border border-line font-mono text-sm px-3 py-2.5 focus:outline-none focus:border-accent transition-colors';

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-sm w-full bg-panel border-2 border-ink">
        <div className="bg-ink px-6 py-5 text-center">
          <p className="font-display text-white uppercase tracking-wide text-lg">New Registration</p>
          <p className="font-mono text-[11px] text-gray-400 tracking-widest uppercase mt-1">AutoStock Inventory</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-gray-500 mb-1">Name</label>
            <input required value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-gray-500 mb-1">Email</label>
            <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-gray-500 mb-1">Password</label>
            <input type="password" required minLength={6} value={form.password} onChange={(e) => update('password', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-gray-500 mb-2">Account type</label>
            <div className="flex gap-4 text-sm font-mono">
              <label className="flex items-center gap-2">
                <input type="radio" name="role" checked={form.role === 'user'} onChange={() => update('role', 'user')} />
                User
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="role" checked={form.role === 'admin'} onChange={() => update('role', 'admin')} />
                Admin
              </label>
            </div>
          </div>
          {error && <p className="text-sm text-stock-out font-mono">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="cut-corner w-full bg-accent text-ink font-display font-semibold uppercase tracking-wide py-2.5 hover:bg-accent-deep hover:text-white transition-colors disabled:opacity-50"
          >
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="text-sm font-mono text-gray-500 pb-6 text-center">
          Already registered?{' '}
          <Link to="/login" className="text-accent hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}