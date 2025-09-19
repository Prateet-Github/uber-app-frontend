import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  const requests = [
    {
      id: 1,
      passengerName: "John Doe",
      pickupLocation: "123 Main St",
      dropoffLocation: "456 Elm St",
      fare: 150,
    },
    {
      id: 2,
      passengerName: "Jane Smith",
      pickupLocation: "789 Oak St",
      dropoffLocation: "321 Pine St",
      fare: 200,
    },
    {
      id: 3,
      passengerName: "Alice Johnson",
      pickupLocation: "654 Maple St",
      dropoffLocation: "987 Cedar St",
      fare: 180,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Requests */}
      <div className="w-1/3  bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Current Requests</h1>
        <ul>
          {requests.map((request) => (
            <li key={request.id} className="border p-4 mb-4 rounded shadow">
              <p>
                <strong>Passenger:</strong> {request.passengerName}
              </p>
              <p>
                <strong>Pickup:</strong> {request.pickupLocation}
              </p>
              <p>
                <strong>Dropoff:</strong> {request.dropoffLocation}
              </p>
              <p>
                <strong>Fare:</strong> ₹{request.fare}
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Accept
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side - Map */}
      <div className="flex-1">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
