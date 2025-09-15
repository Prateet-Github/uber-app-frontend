import React from 'react';

const DriverDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>

      {/* Driver Info */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@mail.com</p>
        <p><strong>Role:</strong> Driver</p>
        <p><strong>Earnings:</strong> $1200</p>
      </div>

      {/* Current Ride Requests */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Ride Requests</h2>
        <ul>
          <li className="flex justify-between items-center p-3 border-b">
            <div>
              <p><strong>Passenger:</strong> Alice</p>
              <p><strong>Pickup:</strong> 123 Main St</p>
              <p><strong>Dropoff:</strong> 456 Park Ave</p>
              <p><strong>Fare:</strong> $15</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
            </div>
          </li>
          <li className="flex justify-between items-center p-3 border-b">
            <div>
              <p><strong>Passenger:</strong> Bob</p>
              <p><strong>Pickup:</strong> 789 Elm St</p>
              <p><strong>Dropoff:</strong> 321 Oak Rd</p>
              <p><strong>Fare:</strong> $20</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
            </div>
          </li>
        </ul>
      </div>

      {/* Ride History */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Ride History</h2>
        <ul>
          <li className="p-3 border-b">
            <p><strong>Passenger:</strong> Charlie</p>
            <p><strong>Pickup:</strong> 111 First St</p>
            <p><strong>Dropoff:</strong> 222 Second Ave</p>
            <p><strong>Fare:</strong> $12</p>
          </li>
          <li className="p-3 border-b">
            <p><strong>Passenger:</strong> David</p>
            <p><strong>Pickup:</strong> 333 Third Rd</p>
            <p><strong>Dropoff:</strong> 444 Fourth Blvd</p>
            <p><strong>Fare:</strong> $18</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DriverDashboard;