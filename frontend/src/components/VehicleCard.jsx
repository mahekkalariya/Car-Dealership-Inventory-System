export default function VehicleCard({ vehicle, isAdmin, onPurchase, onEdit, onDelete, onRestock }) {
  const outOfStock = vehicle.quantity <= 0;
  const lowStock = vehicle.quantity > 0 && vehicle.quantity <= 2;

  const stockColor = outOfStock ? 'stock-out' : lowStock ? 'stock-low' : 'stock-good';
  const stockLabel = outOfStock ? 'OUT OF STOCK' : lowStock ? 'LOW STOCK' : 'IN STOCK';

  return (
    <div className="bg-panel border-2 border-ink relative">
      {/* top tag strip — like a window sticker header */}
      <div className="flex items-center justify-between px-4 py-2 bg-ink">
        <span className="font-mono text-[11px] tracking-widest text-gray-300 uppercase">{vehicle.category}</span>
        <span className={`font-mono text-[11px] tracking-widest uppercase text-${stockColor}`}>
          {stockLabel}
        </span>
      </div>

      <div className="p-4 border-b border-line">
        <h3 className="font-display font-semibold text-2xl uppercase leading-tight">
          {vehicle.make} {vehicle.model}
        </h3>
      </div>

      {/* spec rows — mono, like a Monroney sticker */}
      <div className="px-4 py-3 space-y-1.5 border-b border-line font-mono text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase tracking-wide text-xs">Price</span>
          <span className="font-semibold text-ink">₹{vehicle.price.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase tracking-wide text-xs">Units available</span>
          <span className={`font-semibold text-${stockColor}`}>{vehicle.quantity}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <button
          onClick={() => onPurchase(vehicle._id)}
          disabled={outOfStock}
          className="cut-corner bg-accent text-ink font-display font-semibold uppercase tracking-wide text-sm py-2.5 hover:bg-accent-deep hover:text-white transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Purchase
        </button>

        {isAdmin && (
          <div className="flex gap-2 text-xs font-mono uppercase tracking-wide">
            <button onClick={() => onEdit(vehicle)} className="flex-1 border border-ink py-1.5 hover:bg-ink hover:text-white transition-colors">
              Edit
            </button>
            <button onClick={() => onRestock(vehicle._id)} className="flex-1 border border-ink py-1.5 hover:bg-ink hover:text-white transition-colors">
              Restock
            </button>
            <button onClick={() => onDelete(vehicle._id)} className="flex-1 border border-stock-out text-stock-out py-1.5 hover:bg-stock-out hover:text-white transition-colors">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}