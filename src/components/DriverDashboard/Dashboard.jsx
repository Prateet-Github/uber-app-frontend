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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(() => {
    const savedRide = localStorage.getItem("driverCurrentRide");
    return savedRide ? JSON.parse(savedRide) : null;
  });
  const [driverLocation, setDriverLocation] = useState(() => {
    const savedLocation = localStorage.getItem("driverLocation");

    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  const token = localStorage.getItem("token");

  const getLocationName = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en`
      );
      const data = await res.json();
      return data.display_name || "Unknown Location";
    } catch (err) {
      return "Unknown Location";
    }
  };

  // Helpers
  const updateCurrentRide = (ride) => {
    setCurrentRide(ride);
    if (ride) localStorage.setItem("driverCurrentRide", JSON.stringify(ride));
    else localStorage.removeItem("driverCurrentRide");
  };

  const updateDriverLocation = (location) => {
    setDriverLocation(location);
    if (location)
      localStorage.setItem("driverLocation", JSON.stringify(location));
  };

  // Fetch driver's active ride on mount
  useEffect(() => {
    const checkDriverStatus = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/driver-decision/status`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success && data.driver?.currentRide) {
          const rideResponse = await axios.get(
            `${BACKEND_URL}/rides/${data.driver.currentRide}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (rideResponse.data.ride) {
            const ride = rideResponse.data.ride;

            // Get pickup and drop names
            let pickupName = "Unknown";
            let dropName = "Unknown";

            try {
              if (ride.pickup) {
                pickupName = await getLocationName(
                  ride.pickup.lat,
                  ride.pickup.lng
                );
              }
              if (ride.drop) {
                dropName = await getLocationName(ride.drop.lat, ride.drop.lng);
              }
            } catch (err) {
              console.error(
                "Error fetching location names for current ride:",
                err
              );
            }

            updateCurrentRide({ ...ride, pickupName, dropName });
          }
        }
      } catch (err) {
        console.error("Error checking driver status:", err);
        updateCurrentRide(null);
      }
    };

    checkDriverStatus();
  }, [token]);

  // Fetch pending rides

  const fetchRides = async () => {
    if (!token) return;

    try {
      // Fetch rides from backend
      const response = await axios.get(
        `${BACKEND_URL}/driver-decision/pending`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const ridesData = response.data.rides || [];

      const ridesWithNames = await Promise.all(
        ridesData.map(async (ride) => {
          let pickupName = "Unknown";
          let dropName = "Unknown";

          try {
            if (ride.pickup) {
              pickupName = await getLocationName(
                ride.pickup.lat,
                ride.pickup.lng
              );
            }
            if (ride.drop) {
              dropName = await getLocationName(ride.drop.lat, ride.drop.lng);
            }
          } catch (err) {
            console.error(
              "Error fetching location names for ride:",
              ride._id,
              err
            );
          }

          return { ...ride, pickupName, dropName };
        })
      );

      setRides(ridesWithNames);
    } catch (err) {
      console.error("Error fetching rides:", err);
      setRides([]);
    }
  };

  // Accept ride
  const handleAccept = async (rideId) => {
    try {
      const { data } = await axios.patch(
        `${BACKEND_URL}/rides/${rideId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ride accepted!");
      updateCurrentRide(data.ride); // set full ride object
      fetchRides();
    } catch (err) {
      console.error(err);
      alert("Failed to accept ride");
    }
  };

  // Reject ride
  const handleReject = async (rideId) => {
    try {
      await axios.patch(
        `${BACKEND_URL}/${rideId}/reject`,
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

  // Clear current ride
  const clearCurrentRide = async () => {
    if (!currentRide?._id) return;
    try {
      await axios.patch(
        `${BACKEND_URL}/driver-decision/clear-ride`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateCurrentRide(null);
      fetchRides();
      alert("Ride cleared successfully!");
    } catch (err) {
      console.error("Error clearing ride:", err.response?.data || err.message);
      alert(
        `Failed to clear ride: ${err.response?.data?.message || err.message}`
      );
    }
  };

  // Update driver location every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const newLocation = { lat: latitude, lng: longitude };
          updateDriverLocation(newLocation);

          try {
            await axios.patch(
              `${BACKEND_URL}/driver-decision/location`,
              { lat: latitude, lng: longitude },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } catch (err) {
            console.error("Failed to update location:", err);
          }
        },
        (error) => console.error("Geolocation error:", error)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left side - requests */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>

        {/* Driver Status */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800">
            📍 Location: {driverLocation ? "✅ Active" : "❌ Not Set"}
          </p>
          <p className="text-sm font-medium text-blue-800">
            🚗 Status: {currentRide ? "🔴 On Ride" : "🟢 Available"}
          </p>
        </div>

        {/* Current Ride */}
        {currentRide && (
          <div className="mb-6 p-4 border rounded bg-yellow-100">
            <h2 className="font-bold mb-2">🚗 Current Ride</h2>
            <div className="text-sm space-y-1">
              <p>
                <strong>Passenger:</strong>{" "}
                {currentRide.passengerId?.username || "N/A"}
              </p>
              <p>
                <strong>Pickup:</strong> {currentRide.pickupName || "Unknown"}
              </p>
              <p>
                <strong>Drop:</strong> {currentRide.dropName || "Unknown"}
              </p>
              <p>
                <strong>Fare:</strong> ₹{currentRide.fare}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize font-medium">
                  {currentRide.status}
                </span>
              </p>
            </div>
            <button
              className="mt-3 w-full bg-yellow-500 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-600"
              onClick={clearCurrentRide}
            >
              Complete Ride
            </button>
          </div>
        )}

        {/* Pending Rides */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            📋 Pending Rides ({rides.length})
          </h2>
          {rides.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="font-medium">No pending rides</p>
              <p className="text-sm">New requests will appear here</p>
            </div>
          )}
          <ul className="space-y-4">
            {rides.map((ride) => (
              <li key={ride._id} className="border p-4 rounded shadow bg-white">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>👤 Passenger:</strong>{" "}
                    {ride.passengerId?.username || "N/A"}
                  </p>
                  <p>
                    <strong>📍 Pickup:</strong> {ride.pickupName || "Unknown"}
                  </p>
                  <p>
                    <strong>🎯 Drop:</strong> {ride.dropName || "Unknown"}
                  </p>
                  <p>
                    <strong>💰 Fare:</strong> ₹{ride.fare}
                  </p>
                  <p>
                    <strong>📏 Distance:</strong> {ride.distance} km
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded font-semibold text-sm hover:bg-green-600 disabled:opacity-50"
                    onClick={() => handleAccept(ride._id)}
                    disabled={!!currentRide}
                  >
                    {currentRide ? "On Ride" : "Accept"}
                  </button>
                  <button
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded font-semibold text-sm hover:bg-red-600 disabled:opacity-50"
                    onClick={() => handleReject(ride._id)}
                    disabled={!!currentRide}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Map */}
      <div className="flex-1">
        <MapContainer
          center={
            driverLocation
              ? [driverLocation.lat, driverLocation.lng]
              : [28.6139, 77.209]
          }
          zoom={12}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Driver location */}
          {driverLocation && (
            <Marker position={[driverLocation.lat, driverLocation.lng]}>
              <Popup>
                <div className="text-sm">
                  <strong>🚗 Your Location</strong>
                  <br />
                  Status: {currentRide ? "On Ride" : "Available"}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Ride Polylines & Markers */}
          {rides.map((ride) => (
            <div key={ride._id}>
              {ride.pickup && ride.drop && (
                <Polyline
                  positions={[
                    [ride.pickup.lat, ride.pickup.lng],
                    [ride.drop.lat, ride.drop.lng],
                  ]}
                  color={currentRide?._id === ride._id ? "#FF0000" : "#0000FF"}
                  weight={currentRide?._id === ride._id ? 6 : 4}
                  opacity={currentRide?._id === ride._id ? 1 : 0.6}
                />
              )}

              {ride.pickup && (
                <Marker position={[ride.pickup.lat, ride.pickup.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <strong>📍 Pickup</strong>
                      <br />
                      {ride.pickup.display || "Unknown"}
                      <br />
                      <strong>👤 Passenger:</strong>{" "}
                      {ride.passengerId?.username || "N/A"}
                      <br />
                      <strong>💰 Fare:</strong> ₹{ride.fare}
                      {currentRide?._id === ride._id && <br />}
                      {currentRide?._id === ride._id && (
                        <strong className="text-red-600">🚗 ACTIVE RIDE</strong>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )}

              {ride.drop && (
                <Marker position={[ride.drop.lat, ride.drop.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <strong>🎯 Drop</strong>
                      <br />
                      {ride.drop.display || "Unknown"}
                      <br />
                      <strong>👤 Passenger:</strong>{" "}
                      {ride.passengerId?.username || "N/A"}
                      {currentRide?._id === ride._id && <br />}
                      {currentRide?._id === ride._id && (
                        <strong className="text-red-600">🚗 ACTIVE RIDE</strong>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )}
            </div>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DriverDashboard;
