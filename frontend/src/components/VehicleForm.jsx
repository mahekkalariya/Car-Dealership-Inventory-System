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

  const inputClass = 'border border-line font-mono text-sm px-3 py-2.5 focus:outline-none focus:border-accent transition-colors';

  return (
    <form onSubmit={handleSubmit} className="bg-panel border-2 border-ink p-4 mb-6">
      <p className="font-mono text-[11px] tracking-widest text-gray-500 uppercase mb-3">
        {editingVehicle ? 'Edit vehicle record' : 'New vehicle record'}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <input placeholder="Make" required value={form.make} onChange={(e) => update('make', e.target.value)} className={inputClass} />
        <input placeholder="Model" required value={form.model} onChange={(e) => update('model', e.target.value)} className={inputClass} />
        <input placeholder="Category" required value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass} />
        <input placeholder="Price (₹)" type="number" required min="0" value={form.price} onChange={(e) => update('price', e.target.value)} className={inputClass} />
        <input placeholder="Quantity" type="number" required min="0" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} className={inputClass} />
      </div>
      <div className="flex gap-2 mt-3">
        <button type="submit" className="cut-corner bg-accent text-ink font-display font-semibold uppercase tracking-wide text-sm px-5 py-2 hover:bg-accent-deep hover:text-white transition-colors">
          {editingVehicle ? 'Save changes' : 'Add vehicle'}
        </button>
        {editingVehicle && (
          <button type="button" onClick={onCancel} className="border border-ink font-mono text-xs uppercase tracking-wide px-4 py-2 hover:bg-ink hover:text-white transition-colors">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}