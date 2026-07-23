import { useState } from 'react';

export default function SearchBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

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
    'border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <input placeholder="Make" value={filters.make} onChange={(e) => update('make', e.target.value)} className={inputClass} />
        <input placeholder="Model" value={filters.model} onChange={(e) => update('model', e.target.value)} className={inputClass} />
        <input placeholder="Category" value={filters.category} onChange={(e) => update('category', e.target.value)} className={inputClass} />
        <input placeholder="Min price (₹)" type="number" value={filters.minPrice} onChange={(e) => update('minPrice', e.target.value)} className={inputClass} />
        <input placeholder="Max price (₹)" type="number" value={filters.maxPrice} onChange={(e) => update('maxPrice', e.target.value)} className={inputClass} />
      </div>
      <button
        onClick={handleClear}
        type="button"
        className="mt-3 border border-gray-300 text-sm font-medium rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}
