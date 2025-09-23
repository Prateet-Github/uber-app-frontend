import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { useAuth } from "../../../context/authContext";

const Pending = () => {
  const navigate = useNavigate();
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [status, setStatus] = useState(null); // { role: "", driverRequest: "" }

  const { user, setUser } = useAuth(); // Add setUser for syncing

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          "http://localhost:5001/api/driver/my-status",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          const fetchedStatus = {
            role: data.role,
            driverRequest: data.driverRequest,
          };

          setStatus(fetchedStatus);

          // ✅ Update auth context with fresh data
          if (user) {
            setUser({
              ...user,
              role: data.role,
              driverRequest: data.driverRequest,
            });
          }

          // Show toast after 1 second

          // Keep page for 2 more seconds, then navigate if already a driver
          setTimeout(() => {
            if (data.role === "driver") {
              navigate("/driverdashboard");
            }
          }, 3000);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch status");
      } finally {
        setCheckingStatus(false);
      }
    };

    fetchStatus();
  }, [navigate, user, setUser]);

  if (checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
        Checking status...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* ✅ Use fresh status data instead of cached user data */}
        {status?.driverRequest === "pending" && (
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Request Pending
          </h2>
        )}

        {status?.driverRequest === "rejected" && (
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Request Rejected
          </h2>
        )}

        {status?.driverRequest === "accepted" && (
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Request Accepted
          </h2>
        )}

        <p className="text-gray-600 mb-6">
          {status?.driverRequest === "pending" &&
            "Your request to become a driver is under review. This may take some time. Please check back later."}
          {status?.driverRequest === "rejected" &&
            "Your driver request was rejected. You can apply again from the home page."}
          {status?.driverRequest === "accepted" &&
            "Congratulations! Your driver request has been approved. You will be redirected to the driver dashboard."}
        </p>

        <button
          onClick={() =>
            status?.role === "driver"
              ? navigate("/driverdashboard")
              : navigate("/")
          }
          className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          {status?.role === "driver" ? "Go to Dashboard" : "Go to Home"}
        </button>
      </div>
    </div>
  );
};

export default Pending;
