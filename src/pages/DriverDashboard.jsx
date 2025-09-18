import { useState, useEffect } from "react";
import axios from "axios";

const DriverDashboard = () => {
  const [driver, setDriver] = useState({});
  const [rides, setRides] = useState([]);
  const [earnings, setEarnings] = useState(0);

  const token = localStorage.getItem("token");

  // Fetch driver info
  const fetchDriverData = async () => {
    try {
      const res = await axios.get("/api/driver/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDriver(res.data);
      setEarnings(res.data.earnings);
    } catch (err) {
      console.error(err);
    }
  };

// Fetch ride requests
const fetchRides = async () => {
  try {
    const res = await axios.get("/api/driver/rides", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Ensure rides is always an array
    setRides(Array.isArray(res.data) ? res.data : res.data.rides || []);
  } catch (err) {
    console.error(err);
    setRides([]); // fallback to empty array to avoid crashes
  }
};

  // Initial data fetch
  useEffect(() => {
    fetchDriverData();
    fetchRides();
  }, []);

  // Accept a ride
  const handleAccept = async (rideId) => {
    try {
      await axios.put(
        `/api/driver/rides/${rideId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRides();
    } catch (err) {
      console.error(err);
    }
  };

  // Reject a ride
  const handleReject = async (rideId) => {
    try {
      await axios.put(
        `/api/driver/rides/${rideId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRides();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Driver Dashboard</h1>

      {/* Driver Info */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p>
          <strong>Name:</strong> {driver.username}
        </p>
        <p>
          <strong>Email:</strong> {driver.email}
        </p>
        <p>
          <strong>Role:</strong> {driver.role}
        </p>
        <p>
          <strong>Earnings:</strong> ${earnings}
        </p>
      </div>

      {/* Ride Requests */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Ride Requests</h2>
        {rides.length === 0 ? (
          <p>No current rides</p>
        ) : (
          <ul>
            {rides.map((ride) => (
              <li
                key={ride._id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <p>
                    <strong>Passenger:</strong> {ride.passengerName}
                  </p>
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Dropoff:</strong> {ride.dropoff}
                  </p>
                  <p>
                    <strong>Fare:</strong> ${ride.fare}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleAccept(ride._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(ride._id)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ride History */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Ride History</h2>
        {rides.filter((r) => r.status === "completed").length === 0 ? (
          <p>No completed rides yet</p>
        ) : (
          <ul>
            {rides
              .filter((r) => r.status === "completed")
              .map((ride) => (
                <li key={ride._id} className="p-2 border-b">
                  <p>
                    <strong>Passenger:</strong> {ride.passengerName}
                  </p>
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Dropoff:</strong> {ride.dropoff}
                  </p>
                  <p>
                    <strong>Fare:</strong> ${ride.fare}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
