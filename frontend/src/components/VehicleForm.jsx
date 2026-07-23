import { useEffect, useState } from 'react';

const emptyForm = { make: '', model: '', category: '', price: '', quantity: '' };

export default function VehicleForm({ editingVehicle, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingVehicle) {
      setForm({
        make: editingVehicle.make,
        model: editingVehicle.model,
        category: editingVehicle.category,
        price: editingVehicle.price,
        quantity: editingVehicle.quantity
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingVehicle]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...form, price: Number(form.price), quantity: Number(form.quantity) });
  }

  const inputClass =
    'border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow';

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <input placeholder="Make" required value={form.make} onChange={(e) => update('make', e.target.value)} className={inputClass} />
        <input placeholder="Model" required value={form.model} onChange={(e) => update('model', e.target.value)} className={inputClass} />
        <input placeholder="Category" required value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass} />
        <input placeholder="Price (₹)" type="number" required min="0" value={form.price} onChange={(e) => update('price', e.target.value)} className={inputClass} />
        <input placeholder="Quantity" type="number" required min="0" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} className={inputClass} />
      </div>
      <div className="flex gap-2 mt-3">
        <button type="submit" className="bg-brand-600 text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-brand-700 transition-colors">
          {editingVehicle ? 'Save changes' : 'Add vehicle'}
        </button>
        {editingVehicle && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 text-sm font-medium rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}