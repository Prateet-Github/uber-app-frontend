import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Pending = () => {
  const navigate = useNavigate();
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [status, setStatus] = useState(null); // { role: "", driverRequest: "" }

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          "http://localhost:5001/api/driver/my-status",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          setStatus({
            role: data.role,
            driverRequest: data.driverRequest,
          });

          // Show toast after 1 second
          setTimeout(() => {
            if (data.driverRequest === "pending") {
              toast("Your driver request is pending", { icon: "⏳" });
            }
          }, 1000);

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
  }, [navigate]);

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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Request Pending
        </h2>
        <p className="text-gray-600 mb-6">
          Your request to become a driver is under review. This may take some time.
          Please check back later.
        </p>
        <button
          onClick={() =>
            status?.role === "driver" ? navigate("/driverdashboard") : navigate("/")
          }
          className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Pending;