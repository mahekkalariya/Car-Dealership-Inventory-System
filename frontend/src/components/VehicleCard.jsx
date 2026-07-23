export default function VehicleCard({ vehicle, isAdmin, onPurchase, onEdit, onDelete, onRestock }) {
  const outOfStock = vehicle.quantity <= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{vehicle.make} {vehicle.model}</h3>
          <p className="text-sm text-gray-500">{vehicle.category}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${outOfStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {outOfStock ? 'out of stock' : `${vehicle.quantity} in stock`}
        </span>
      </div>

      <p className="text-lg font-semibold">
  ₹{vehicle.price.toLocaleString('en-IN')}
</p>

      <button
        onClick={() => onPurchase(vehicle._id)}
        disabled={outOfStock}
        className="mt-2 bg-blue-600 text-white text-sm rounded-md py-2 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Purchase
      </button>

      {isAdmin && (
        <div className="flex gap-2 mt-1 text-sm">
          <button onClick={() => onEdit(vehicle)} className="flex-1 border border-gray-300 rounded-md py-1.5 hover:bg-gray-100">Edit</button>
          <button onClick={() => onRestock(vehicle._id)} className="flex-1 border border-gray-300 rounded-md py-1.5 hover:bg-gray-100">Restock</button>
          <button onClick={() => onDelete(vehicle._id)} className="flex-1 border border-red-200 text-red-600 rounded-md py-1.5 hover:bg-red-50">Delete</button>
        </div>
      )}
    </div>
  );
}