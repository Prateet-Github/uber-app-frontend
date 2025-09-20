import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRides = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/driver-decision/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRides(data.rides);
    } catch (err) {
      console.error("Failed to fetch rides:", err);
    }
  };

  const handleAccept = async (rideId) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/rides/${rideId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ride accepted!");
      fetchRides();
    } catch (err) {
      console.error(err);
      alert("Failed to accept ride");
    }
  };

  const handleReject = async (rideId) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/rides/${rideId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ride rejected!");
      fetchRides();
    } catch (err) {
      console.error(err);
      alert("Failed to reject ride");
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left side - Requests */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Pending Rides</h1>
        {rides.length === 0 && <p>No pending rides.</p>}
        <ul>
          {rides.map((ride) => (
            <li key={ride._id} className="border p-4 mb-4 rounded shadow">
              <p>
                <strong>Passenger:</strong>{" "}
                {ride.passengerId?.username || "N/A"}
              </p>
              <p>
                <strong>Pickup:</strong> {ride.pickup?.display || "Unknown"}
              </p>
              <p>
                <strong>Drop:</strong> {ride.drop?.display || "Unknown"}
              </p>
              <p>
                <strong>Fare:</strong> ₹{ride.fare}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => handleAccept(ride._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReject(ride._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side - Map */}
      <div className="flex-1">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={12}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {rides.map((ride) => (
            <>
              {ride.pickup && ride.drop && (
                <Polyline
                  key={ride._id}
                  positions={[
                    [ride.pickup.lat, ride.pickup.lng],
                    [ride.drop.lat, ride.drop.lng],
                  ]}
                  color="#0000FF"
                  weight={4}
                  opacity={0.6}
                />
              )}

              {ride.pickup && (
                <Marker
                  key={`${ride._id}-pickup`}
                  position={[ride.pickup.lat, ride.pickup.lng]}
                >
                  <Popup>
                    Pickup: {ride.pickup.display || "Unknown"} <br />
                    Passenger: {ride.passengerId?.username || "N/A"}
                  </Popup>
                </Marker>
              )}

              {ride.drop && (
                <Marker
                  key={`${ride._id}-drop`}
                  position={[ride.drop.lat, ride.drop.lng]}
                >
                  <Popup>
                    Drop: {ride.drop.display || "Unknown"} <br />
                    Passenger: {ride.passengerId?.username || "N/A"}
                  </Popup>
                </Marker>
              )}
            </>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DriverDashboard;
