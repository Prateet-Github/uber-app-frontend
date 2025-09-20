import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  BadgeHelp,
  ChartBar,
  Languages,
} from "lucide-react";

const Tab3 = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [isDown, setIsDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [driverRequestStatus, setDriverRequestStatus] = useState("none"); // none | pending | accepted
  const dropdownRef = useRef(null);

  // Close dropdown if click happens outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Handle driver request submission
  const handleDriverRequest = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5001/api/driver/request-driver",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setDriverRequestStatus("pending");
        alert("✅ Driver request submitted successfully!");
        navigate("/pending");
      } else {
        alert(data.message || "Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("❌ Error submitting request");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Driving License - Front", status: "next" },
    { id: 2, title: "Profile Picture", status: "pending" },
    { id: 3, title: "Aadhaar Card", status: "pending" },
    { id: 4, title: "Registration Certificate (RC)", status: "pending" },
    { id: 5, title: "Preferred Language", status: "completed" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navbar */}
      <header className="bg-black text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Uber</h1>
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/login">
              <button className="px-4 py-2 rounded-3xl bg-black text-white font-medium">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDown(!isDown)}
              className="bg-white text-black px-4 py-2 rounded-3xl font-medium"
            >
              <div className="flex items-center cursor-pointer">
                <p className="text-sm font-medium">Help</p>
                {isDown ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </button>
            {isDown && (
              <div className="absolute right-0 mt-2 p-4 bg-white text-black rounded-lg shadow-lg z-10 flex flex-col shadow-gray-600">
                <div className="flex flex-col">
                  <div className="cursor-pointer py-4 px-3 flex items-center">
                    <Languages size={20} className="mr-2" />
                    <span>Change my language</span>
                  </div>
                  <div className="cursor-pointer py-4 px-3 flex items-center">
                    <ChartBar size={20} className="mr-2" />
                    <span>Chat with support</span>
                  </div>
                  <div className="cursor-pointer py-4 px-3 flex items-center">
                    <BadgeHelp size={20} className="mr-2" />
                    <span>Get help with my account</span>
                  </div>
                  <div className="border-t border-gray-300 pt-6 flex justify-center">
                    <button
                      onClick={signOut}
                      className="text-red-500 px-6 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="flex flex-col items-center mt-12 px-6">
        <p className="text-sm text-gray-600">Signing up for</p>
        <p className="text-sm font-medium mb-6">Delhi NCR • Rides • 🚴</p>

        <h2 className="text-3xl font-bold mb-2">
          Welcome, <span>{user?.username}</span>
        </h2>
        <p className="text-gray-600 mb-10">
          Here's what you need to do to set up your account.
        </p>

        <div className="w-full max-w-xl space-y-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex justify-between items-center border-b pb-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3"
            >
              <div>
                <p className="font-medium">{step.title}</p>
                {step.status === "next" && (
                  <p className="text-blue-600 text-sm">Recommended next step</p>
                )}
                {step.status === "completed" && (
                  <p className="text-green-600 text-sm">Completed</p>
                )}
              </div>
              {step.status !== "completed" && (
                <ChevronRight size={18} className="text-gray-400" />
              )}
            </div>
          ))}

          <button
            onClick={handleDriverRequest}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-3xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Request to become a driver"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab3;