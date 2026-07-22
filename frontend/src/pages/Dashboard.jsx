import { useState } from 'react';
import { dummyVehicles } from '../data/dummyVehicles';
import { useAuth } from '../context/AuthContext.jsx';
import SearchBar from '../components/SearchBar.jsx';
import VehicleForm from '../components/VehicleForm.jsx';
import VehicleCard from '../components/VehicleCard.jsx';

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [vehicles, setVehicles] = useState(dummyVehicles);
  const [filters, setFilters] = useState({ make: '', model: '', category: '', minPrice: '', maxPrice: '' });
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = vehicles.filter((v) => {
    if (filters.make && !v.make.toLowerCase().includes(filters.make.toLowerCase())) return false;
    if (filters.model && !v.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
    if (filters.category && !v.category.toLowerCase().includes(filters.category.toLowerCase())) return false;
    if (filters.minPrice && v.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && v.price > Number(filters.maxPrice)) return false;
    return true;
  });

  function handlePurchase(id) {
    setVehicles((prev) => prev.map((v) => (v._id === id && v.quantity > 0 ? { ...v, quantity: v.quantity - 1 } : v)));
  }

  function handleRestock(id) {
    setVehicles((prev) => prev.map((v) => (v._id === id ? { ...v, quantity: v.quantity + 1 } : v)));
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this vehicle?')) return;
    setVehicles((prev) => prev.filter((v) => v._id !== id));
  }

  function handleFormSubmit(payload) {
    if (editingVehicle) {
      setVehicles((prev) => prev.map((v) => (v._id === editingVehicle._id ? { ...v, ...payload } : v)));
    } else {
      setVehicles((prev) => [{ _id: crypto.randomUUID(), ...payload }, ...prev]);
    }
    setEditingVehicle(null);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        {isAdmin && (
          <button
            onClick={() => { setEditingVehicle(null); setShowForm((v) => !v); }}
            className="bg-blue-600 text-white text-sm rounded-md px-4 py-2 hover:bg-blue-700"
          >
            {showForm ? 'Close form' : 'Add vehicle'}
          </button>
        )}
      </div>

      <SearchBar onFilterChange={setFilters} />

      {isAdmin && (showForm || editingVehicle) && (
        <VehicleForm
          editingVehicle={editingVehicle}
          onSubmit={handleFormSubmit}
          onCancel={() => { setEditingVehicle(null); setShowForm(false); }}
        />
      )}

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No vehicles match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              isAdmin={isAdmin}
              onPurchase={handlePurchase}
              onRestock={handleRestock}
              onDelete={handleDelete}
              onEdit={(v) => { setEditingVehicle(v); setShowForm(true); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}