import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
import SearchBar from '../components/SearchBar.jsx';
import VehicleForm from '../components/VehicleForm.jsx';
import VehicleCard from '../components/VehicleCard.jsx';

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchVehicles(filters) {
    setLoading(true);
    setError('');
    try {
      const hasFilters = filters && Object.values(filters).some((v) => v !== '');
      const endpoint = hasFilters ? '/vehicles/search' : '/vehicles';
      const params = hasFilters
        ? Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''))
        : undefined;
      const { data } = await api.get(endpoint, { params });
      setVehicles(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load vehicles');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function handlePurchase(id) {
    try {
      const { data } = await api.post(`/vehicles/${id}/purchase`);
      setVehicles((prev) => prev.map((v) => (v._id === id ? data : v)));
    } catch (err) {
      setError(err.response?.data?.message || 'Purchase failed');
    }
  }

  async function handleRestock(id) {
    try {
      const { data } = await api.post(`/vehicles/${id}/restock`, { amount: 1 });
      setVehicles((prev) => prev.map((v) => (v._id === id ? data : v)));
    } catch (err) {
      setError(err.response?.data?.message || 'Restock failed');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  }

  async function handleFormSubmit(payload) {
    try {
      if (editingVehicle) {
        const { data } = await api.put(`/vehicles/${editingVehicle._id}`, payload);
        setVehicles((prev) => prev.map((v) => (v._id === data._id ? data : v)));
      } else {
        const { data } = await api.post('/vehicles', payload);
        setVehicles((prev) => [data, ...prev]);
      }
      setEditingVehicle(null);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  }

  return (
    
    <div>
      <div className="flex items-end justify-between mb-6 pb-4 border-b-2 border-ink">
        <div>
          <p className="font-mono text-[11px] tracking-widest text-gray-500 uppercase">Showroom floor</p>
          <h1 className="font-display font-semibold text-3xl uppercase">Inventory</h1>
        </div>
        {isAdmin && (
          <button
            onClick={() => {
              setEditingVehicle(null);
              setShowForm((v) => !v);
            }}
            className="cut-corner bg-accent text-ink font-display font-semibold uppercase tracking-wide text-sm px-5 py-2.5 hover:bg-accent-deep hover:text-white transition-colors"
          >
            {showForm ? 'Close form' : '+ Add vehicle'}
          </button>
        )}
      </div>


      <SearchBar onFilterChange={fetchVehicles} />

      {isAdmin && (showForm || editingVehicle) && (
        <VehicleForm
          editingVehicle={editingVehicle}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setEditingVehicle(null);
            setShowForm(false);
          }}
        />
      )}

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading vehicles…</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-4xl mb-2">🚗</p>
          <p className="text-gray-500 text-sm">No vehicles yet — add one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              isAdmin={isAdmin}
              onPurchase={handlePurchase}
              onRestock={handleRestock}
              onDelete={handleDelete}
              onEdit={(v) => {
                setEditingVehicle(v);
                setShowForm(true);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}