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

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 grid grid-cols-2 md:grid-cols-5 gap-3">
      <input placeholder="Make" value={filters.make} onChange={(e) => update('make', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <input placeholder="Model" value={filters.model} onChange={(e) => update('model', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <input placeholder="Category" value={filters.category} onChange={(e) => update('category', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <input placeholder="Min price" type="number" value={filters.minPrice} onChange={(e) => update('minPrice', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <input placeholder="Max price" type="number" value={filters.maxPrice} onChange={(e) => update('maxPrice', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <button onClick={handleClear} type="button"
        className="col-span-2 md:col-span-5 border border-gray-300 text-sm rounded-md px-4 py-2 hover:bg-gray-100 w-fit">
        Clear filters
      </button>
    </div>
  );
}