import { dummyVehicles } from '../data/dummyVehicles';
import VehicleCard from '../components/VehicleCard.jsx';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyVehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}