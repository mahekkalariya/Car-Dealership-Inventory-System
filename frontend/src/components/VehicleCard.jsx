export default function VehicleCard({ vehicle, isAdmin, onPurchase, onEdit, onDelete, onRestock }) {
  const outOfStock = vehicle.quantity <= 0;
  const lowStock = vehicle.quantity > 0 && vehicle.quantity <= 2;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-500">{vehicle.category}</p>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
            outOfStock
              ? 'bg-red-100 text-red-700'
              : lowStock
              ? 'bg-amber-100 text-amber-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {outOfStock ? 'Out of stock' : `${vehicle.quantity} in stock`}
        </span>
      </div>

      <p className="text-2xl font-extrabold text-gray-900">
        ₹{vehicle.price.toLocaleString('en-IN')}
      </p>

      <button
        onClick={() => onPurchase(vehicle._id)}
        disabled={outOfStock}
        className="mt-1 bg-brand-600 text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-brand-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        Purchase
      </button>

      {isAdmin && (
        <div className="flex gap-2 pt-1 text-sm">
          <button onClick={() => onEdit(vehicle)} className="flex-1 border border-gray-300 rounded-lg py-1.5 hover:bg-gray-50 transition-colors">
            Edit
          </button>
          <button onClick={() => onRestock(vehicle._id)} className="flex-1 border border-gray-300 rounded-lg py-1.5 hover:bg-gray-50 transition-colors">
            Restock
          </button>
          <button onClick={() => onDelete(vehicle._id)} className="flex-1 border border-red-200 text-red-600 rounded-lg py-1.5 hover:bg-red-50 transition-colors">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}