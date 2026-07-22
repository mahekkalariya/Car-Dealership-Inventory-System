export default function VehicleCard({ vehicle }) {
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
      <p className="text-lg font-semibold">${vehicle.price.toLocaleString()}</p>
      <button
        disabled={outOfStock}
        className="mt-2 bg-blue-600 text-white text-sm rounded-md py-2 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Purchase
      </button>
    </div>
  );
}