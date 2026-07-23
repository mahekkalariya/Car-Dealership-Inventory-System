import { useState } from 'react';

export default function SearchBar({ onFilterChange }) {
  const [filters, setFilters] = useState({ make: '', model: '', category: '', minPrice: '', maxPrice: '' });

  function update(field, value) {
    const next = { ...filters, [field]: value };
    setFilters(next);
    onFilterChange(next);
  }

  function handleClear() {
    const cleared = { make: '', model: '', category: '', minPrice: '', maxPrice: '' };
    setFilters(cleared);
    onFilterChange(cleared);
  }

  const inputClass =
    'bg-ink border border-gray-600 text-white placeholder-gray-500 font-mono text-sm px-3 py-2.5 focus:outline-none focus:border-accent transition-colors';

  return (
    <div className="bg-ink p-4 mb-6">
      <p className="font-mono text-[11px] tracking-widest text-gray-400 uppercase mb-3">Filter inventory</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <input placeholder="Make" value={filters.make} onChange={(e) => update('make', e.target.value)} className={inputClass} />
        <input placeholder="Model" value={filters.model} onChange={(e) => update('model', e.target.value)} className={inputClass} />
        <input placeholder="Category" value={filters.category} onChange={(e) => update('category', e.target.value)} className={inputClass} />
        <input placeholder="Min ₹" type="number" value={filters.minPrice} onChange={(e) => update('minPrice', e.target.value)} className={inputClass} />
        <input placeholder="Max ₹" type="number" value={filters.maxPrice} onChange={(e) => update('maxPrice', e.target.value)} className={inputClass} />
      </div>
      <button
        onClick={handleClear}
        type="button"
        className="mt-3 text-xs font-mono uppercase tracking-wide text-gray-400 hover:text-accent transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}
