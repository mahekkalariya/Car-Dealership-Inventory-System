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

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 mb-6 grid grid-cols-2 md:grid-cols-5 gap-3">
      <input placeholder="Make" required value={form.make} onChange={(e) => update('make', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <input placeholder="Model" required value={form.model} onChange={(e) => update('model', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <input placeholder="Category" required value={form.category} onChange={(e) => update('category', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <input placeholder="Price (₹)" type="number" required min="0" value={form.price} onChange={(e) => update('price', e.target.value)}
  className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <input placeholder="Quantity" type="number" required min="0" value={form.quantity} onChange={(e) => update('quantity', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
      <div className="col-span-2 md:col-span-5 flex gap-2">
        <button type="submit" className="bg-blue-600 text-white text-sm rounded-md px-4 py-2 hover:bg-blue-700">
          {editingVehicle ? 'Save changes' : 'Add vehicle'}
        </button>
        {editingVehicle && (
          <button type="button" onClick={onCancel} className="border border-gray-300 text-sm rounded-md px-4 py-2 hover:bg-gray-100">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}