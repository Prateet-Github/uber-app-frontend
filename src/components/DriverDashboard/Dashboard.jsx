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
  const [currentRide, setCurrentRide] = useState(() => {
    // Initialize currentRide from localStorage
    const savedRide = localStorage.getItem("driverCurrentRide");
    return savedRide ? JSON.parse(savedRide) : null;
  });
  const [driverLocation, setDriverLocation] = useState(() => {
    // Initialize driver location from localStorage
    const savedLocation = localStorage.getItem("driverLocation");
    return savedLocation ? JSON.parse(savedLocation) : null;
  });
  const token = localStorage.getItem("token");

  // Helper function to update currentRide state and localStorage
  const updateCurrentRide = (newRide) => {
    setCurrentRide(newRide);
    if (newRide) {
      localStorage.setItem("driverCurrentRide", JSON.stringify(newRide));
    } else {
      localStorage.removeItem("driverCurrentRide");
    }
  };

  // Helper function to update driver location and localStorage
  const updateDriverLocation = (location) => {
    setDriverLocation(location);
    if (location) {
      localStorage.setItem("driverLocation", JSON.stringify(location));
    }
  };

  // Check for existing accepted ride on component mount
  useEffect(() => {
    const checkDriverStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Check if driver has an active ride
        const { data } = await axios.get(
          "http://localhost:5001/api/driver-decision/status",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (data.success && data.driver) {
          // If driver has a current ride, restore it
          if (data.driver.currentRide) {
            // Fetch the full ride details
            const rideResponse = await axios.get(
              `http://localhost:5001/api/rides/${data.driver.currentRide}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );
            
            if (rideResponse.data.ride) {
              updateCurrentRide(rideResponse.data.ride._id);
            }
          } else {
            // No active ride, clear localStorage
            updateCurrentRide(null);
          }
        }
      } catch (error) {
        console.error("Error checking driver status:", error);
        // Clear invalid ride data
        updateCurrentRide(null);
      }
    };

    checkDriverStatus();
  }, []);

  // Fetch pending rides
  const fetchRides = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/driver-decision/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRides(data.rides || []);
    } catch (err) {
      console.error("Failed to fetch rides:", err);
    }
  };

  // Accept ride
  const handleAccept = async (rideId) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/rides/${rideId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ride accepted!");
      updateCurrentRide(rideId);
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

  // Clear current ride
  const clearCurrentRide = async () => {
    try {
      await axios.patch(
        `http://localhost:5001/api/driver-decision/clear-ride`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateCurrentRide(null);
      fetchRides();
      alert("Ride cleared successfully!");
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response?.data);
      alert(`Failed to clear ride: ${err.response?.data?.message || err.message}`);
    }
  };

  // Update driver location every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const newLocation = { lat: latitude, lng: longitude };
        updateDriverLocation(newLocation);

        try {
          await axios.patch(
            `http://localhost:5001/api/driver-decision/location`,
            { lat: latitude, lng: longitude },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.error("Failed to update location:", err);
        }
      }, (error) => {
        console.error("Geolocation error:", error);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  // Fetch rides on component mount
  useEffect(() => {
    fetchRides();
  }, []);

  // Get current ride details for display
  const getCurrentRideDetails = () => {
    if (!currentRide) return null;
    return rides.find(ride => ride._id === currentRide);
  };

  const currentRideDetails = getCurrentRideDetails();

  return (
    <div className="flex h-screen">
      {/* Left side - Requests */}
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

        {/* Current Ride Section */}
        {currentRide && (
          <div className="mb-6 p-4 border rounded bg-yellow-100">
            <h2 className="font-bold mb-2">🚗 Current Ride</h2>
            {currentRideDetails ? (
              <div className="text-sm space-y-1">
                <p><strong>Passenger:</strong> {currentRideDetails.passengerId?.username || "N/A"}</p>
                <p><strong>Pickup:</strong> {currentRideDetails.pickup?.display || "Unknown"}</p>
                <p><strong>Drop:</strong> {currentRideDetails.drop?.display || "Unknown"}</p>
                <p><strong>Fare:</strong> ₹{currentRideDetails.fare}</p>
                <p><strong>Status:</strong> <span className="capitalize font-medium">{currentRideDetails.status}</span></p>
              </div>
            ) : (
              <p className="text-sm">Ride ID: {currentRide}</p>
            )}
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
                    <strong>📍 Pickup:</strong> {ride.pickup?.display || "Unknown"}
                  </p>
                  <p>
                    <strong>🎯 Drop:</strong> {ride.drop?.display || "Unknown"}
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
          center={driverLocation ? [driverLocation.lat, driverLocation.lng] : [28.6139, 77.209]}
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
                  <strong>🚗 Your Location</strong><br />
                  Status: {currentRide ? "On Ride" : "Available"}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Rides */}
          {rides.map((ride) => (
            <div key={ride._id}>
              {ride.pickup && ride.drop && (
                <Polyline
                  positions={[
                    [ride.pickup.lat, ride.pickup.lng],
                    [ride.drop.lat, ride.drop.lng],
                  ]}
                  color={ride._id === currentRide ? "#FF0000" : "#0000FF"}
                  weight={ride._id === currentRide ? 6 : 4}
                  opacity={ride._id === currentRide ? 1 : 0.6}
                />
              )}

              {ride.pickup && (
                <Marker
                  position={[ride.pickup.lat, ride.pickup.lng]}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>📍 Pickup</strong><br />
                      {ride.pickup.display || "Unknown"}<br />
                      <strong>👤 Passenger:</strong> {ride.passengerId?.username || "N/A"}<br />
                      <strong>💰 Fare:</strong> ₹{ride.fare}
                      {ride._id === currentRide && (
                        <>
                          <br />
                          <strong className="text-red-600">🚗 ACTIVE RIDE</strong>
                        </>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )}

              {ride.drop && (
                <Marker
                  position={[ride.drop.lat, ride.drop.lng]}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>🎯 Drop</strong><br />
                      {ride.drop.display || "Unknown"}<br />
                      <strong>👤 Passenger:</strong> {ride.passengerId?.username || "N/A"}
                      {ride._id === currentRide && (
                        <>
                          <br />
                          <strong className="text-red-600">🚗 ACTIVE RIDE</strong>
                        </>
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