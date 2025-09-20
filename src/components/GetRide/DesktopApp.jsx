import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

import {
  LocationMarkers,
  LocationSearch,
  FitBoundsHandler,
  FareAlgo,
} from "./LocationSearch";

import Navbar from "./Navbar";
import axios from "axios";

// Custom driver icon
const driverIcon = L.divIcon({
  className: "custom-driver-icon",
  html: '<div style="background-color: #3B82F6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-weight: bold;">🚗</div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function DesktopApp() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [route, setRoute] = useState([]);
  const [info, setInfo] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ride, setRide] = useState(() => {
    // Initialize ride state from localStorage
    const savedRide = localStorage.getItem("currentRide");
    return savedRide ? JSON.parse(savedRide) : null;
  });
  const [notification, setNotification] = useState(null);
  const [activeDrivers, setActiveDrivers] = useState([]);

  

  // Get user info for socket connection
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch active drivers
  const fetchActiveDrivers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/driver-decision/active-drivers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setActiveDrivers(data.drivers || []);
    } catch (error) {
      console.error("Error fetching active drivers:", error);
    }
  };

  // Helper function to update ride state and localStorage
  const updateRideState = (newRide) => {
    setRide(newRide);
    if (newRide) {
      localStorage.setItem("currentRide", JSON.stringify(newRide));
    } else {
      localStorage.removeItem("currentRide");
    }
  };

  // Socket connection for real-time updates
  // Check for existing ride on component mount
  useEffect(() => {
    const checkExistingRide = async () => {
      const token = localStorage.getItem("token");
      const savedRide = localStorage.getItem("currentRide");

      if (!token || !savedRide) return;

      try {
        const rideData = JSON.parse(savedRide);

        // Verify the ride still exists and is active using your existing endpoint
        const { data } = await axios.get(
          `http://localhost:5001/api/rides/${rideData._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Check if ride is still active
        if (
          data.ride &&
          (data.ride.status === "pending" ||
            data.ride.status === "accepted" ||
            data.ride.status === "in-progress")
        ) {
          updateRideState(data.ride);

          // If there's a ride, also set the pickup/drop locations
          if (data.ride.pickup && data.ride.drop) {
            setPickup(data.ride.pickup);
            setDrop(data.ride.drop);
          }
        } else {
          // Ride is completed/cancelled, clear it
          updateRideState(null);
        }
      } catch (error) {
        console.error("Error checking existing ride:", error);
        // Clear invalid ride data (ride doesn't exist or user doesn't have access)
        updateRideState(null);
      }
    };

    checkExistingRide();
    fetchActiveDrivers();
  }, [user._id]);

  // Fetch active drivers periodically
  useEffect(() => {
    fetchActiveDrivers(); // Initial fetch

    const interval = setInterval(fetchActiveDrivers, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
 useEffect(() => {
  if (!user._id) return;

  const socket = io("http://localhost:5001");

  // Listen for ride completion
  socket.on(`ride-completed-${user._id}`, (data) => {
    console.log("Ride completion received:", data);

    // Show success notification
    setNotification({
      type: "success",
      message: data.message,
      details: `Total fare: ₹${data.ride.fare}`,
    });

    // Clear current ride and reset state
    updateRideState(null);
    clearAll();

    // Navigate to payment page using React Router
    navigate(`/payment/${data.ride._id}`);

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  });

  // Listen for driver location updates
  socket.on("driver-location-update", (driverUpdate) => {
    setActiveDrivers((prev) => {
      const updatedDrivers = prev.filter(
        (driver) => driver._id !== driverUpdate.driverId
      );
      if (driverUpdate.isAvailable) {
        updatedDrivers.push({
          _id: driverUpdate.driverId,
          username: driverUpdate.username,
          location: driverUpdate.location,
          isAvailable: driverUpdate.isAvailable,
        });
      }
      return updatedDrivers;
    });
  });

  return () => socket.disconnect();
}, [user._id, navigate]);

  const handleRequestRide = async () => {
    if (!pickup || !drop || !info) {
      alert("Please fill in all required ride details.");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to request a ride.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/rides/request",
        {
          pickup: { ...pickup, display: pickup.display || "Current Location" },
          drop: { ...drop, display: drop.display || "Destination" },
          distance: info.distance,
          duration: info.duration,
          fare: FareAlgo(info.distance, info.duration),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Ride requested successfully:", data.ride);
      updateRideState(data.ride);
    } catch (error) {
      console.error("Error requesting ride:", error);
      alert("Failed to request ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelRide = async () => {
    if (!ride?._id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to cancel a ride.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5001/api/rides/${ride._id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Ride cancelled successfully!");
      updateRideState(null);
      clearAll();
    } catch (error) {
      console.error("Error cancelling ride:", error);
      alert("Failed to cancel ride. Please try again.");
    }
  };

  useEffect(() => {
    if (pickup && drop) {
      const fetchRoute = async () => {
        setIsLoadingRoute(true);
        try {
          const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?geometries=geojson&overview=full`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.routes && data.routes.length > 0) {
            const routeData = data.routes[0];
            const coords = routeData.geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ]);
            setRoute(coords);

            setInfo({
              distance: (routeData.distance / 1000).toFixed(1),
              duration: Math.round(routeData.duration / 60),
            });
          }
        } catch (err) {
          console.error("Error fetching route:", err);
        } finally {
          setIsLoadingRoute(false);
        }
      };
      fetchRoute();
    } else {
      setRoute([]);
      setInfo(null);
    }
  }, [pickup, drop]);

  const clearAll = () => {
    setPickup(null);
    setDrop(null);
    setRoute([]);
    setInfo(null);
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      {/* Success/Error Notifications */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">{notification.message}</p>
              {notification.details && (
                <p className="text-sm mt-1 opacity-90">
                  {notification.details}
                </p>
              )}
            </div>
            <button
              onClick={dismissNotification}
              className="ml-4 text-white hover:text-gray-200 text-xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:flex h-full flex-col">
        <Navbar></Navbar>

        {/* Desktop Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 xl:w-[400px] bg-white flex-shrink-0 flex flex-col border-r border-gray-200">
            {/* Desktop Header */}
            <div className="px-6 py-5 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Plan your trip
                </h1>
                {(pickup || drop) && !ride && (
                  <button
                    onClick={clearAll}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Search Section */}
            <div className="flex-1 overflow-y-auto">
              {!ride ? (
                // Normal booking state
                <>
                  <div className="p-6 space-y-4">
                    <LocationSearch
                      label="Pickup"
                      placeholder="Enter pickup location"
                      onSelect={setPickup}
                      allowCurrentLocation={true}
                      icon="🟢"
                      value={pickup?.display || ""}
                    />

                    <LocationSearch
                      label="Destination"
                      placeholder="Where to?"
                      onSelect={setDrop}
                      icon="🔴"
                      value={drop?.display || ""}
                    />

                    {/* Active Drivers Info */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-800">
                          🚗 Available Drivers
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {activeDrivers.length}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Drivers are shown on the map with blue car icons
                      </p>
                    </div>
                  </div>

                  {/* Desktop Route Information */}
                  {(info || isLoadingRoute) && (
                    <div className="border-t border-gray-100 p-6">
                      {isLoadingRoute ? (
                        <div className="flex items-center justify-center py-8 text-gray-500">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                          <span className="font-medium">
                            Finding best route...
                          </span>
                        </div>
                      ) : (
                        info && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Route Overview
                            </h3>

                            <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="text-center">
                                  <div className="text-3xl font-bold text-black">
                                    {info.duration}
                                  </div>
                                  <div className="text-sm text-gray-600 font-medium">
                                    minutes
                                  </div>
                                </div>

                                <div className="text-center">
                                  <div className="text-3xl font-bold text-black">
                                    {info.distance}
                                  </div>
                                  <div className="text-sm text-gray-600 font-medium">
                                    kilometers
                                  </div>
                                </div>

                                <div className="text-center">
                                  <div className="text-2xl font-bold text-green-600">
                                    ₹ {FareAlgo(info.distance, info.duration)}
                                  </div>
                                  <div className="text-sm text-gray-600 font-medium">
                                    estimated
                                  </div>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-sm text-gray-600 mb-4">
                                  Fastest route • Light traffic
                                </div>
                                <button
                                  onClick={handleRequestRide}
                                  disabled={loading}
                                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                                >
                                  {loading ? "Requesting..." : "Request Ride"}
                                </button>
                              </div>
                            </div>

                            <div className="text-xs text-gray-500">
                              * Prices and times are estimates and may vary
                              based on traffic and demand
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </>
              ) : (
                // Active ride state
                <div className="p-6">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      🚗 Ride Active
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Pickup:</strong>{" "}
                        {ride.pickup?.display || "Custom location"}
                      </p>
                      <p>
                        <strong>Drop:</strong>{" "}
                        {ride.drop?.display || "Custom location"}
                      </p>
                      <p>
                        <strong>Fare:</strong> ₹{ride?.fare}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className="capitalize font-medium text-green-600">
                          {ride?.status}
                        </span>
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-green-200">
                      <p className="text-xs text-gray-600 mb-3">
                        🔄 Your ride is in progress. You'll be notified when
                        it's completed.
                      </p>
                      <button
                        onClick={cancelRide}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors"
                      >
                        Cancel Ride
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Map Container */}
          <div className="flex-1 relative">
            <MapContainer
              center={[28.6139, 77.209]}
              zoom={13}
              scrollWheelZoom={true}
              className="w-full h-full z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <LocationMarkers
                pickup={pickup}
                setPickup={setPickup}
                drop={drop}
                setDrop={setDrop}
              />

              {/* Active Drivers */}
              {activeDrivers.map(
                (driver) =>
                  driver.location && (
                    <Marker
                      key={`driver-${driver._id}`}
                      position={[driver.location.lat, driver.location.lng]}
                      icon={driverIcon}
                    >
                      <Popup>
                        <div className="text-sm">
                          <strong>🚗 {driver.username}</strong>
                          <br />
                          <span
                            className={`text-xs ${
                              driver.isAvailable
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {driver.isAvailable ? "✅ Available" : "❌ Busy"}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  )
              )}

              {route.length > 0 && (
                <>
                  <Polyline
                    positions={route}
                    color="#000000"
                    weight={6}
                    opacity={0.8}
                  />
                  <FitBoundsHandler route={route} />
                </>
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopApp;
