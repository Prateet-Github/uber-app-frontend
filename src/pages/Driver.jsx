import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Globe,
  HelpCircle,
  User,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "./../../context/authContext";
import Loading from "./Loading";
import toast from "react-hot-toast";

export default function UberLandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [showPage, setShowPage] = useState(true);

  const [showLoading, setShowLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (dropdownRef.current) {
      function handleClickOutside(event) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsDown(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  // redirect if already a driver
  useEffect(() => {
    if (!user) return;

    if (user.role?.toLowerCase().trim() === "driver") {
      const pageTimer = setTimeout(() => {
        toast("You are already a driver! Redirecting...", { duration: 3000 });

        setShowPage(false);
        setShowLoading(true);

        setTimeout(() => {
          navigate("/driverdashboard");
        }, 2000);
      }, 1000);

      return () => clearTimeout(pageTimer);
    }
  }, [user, navigate]);

  if (showLoading) return <Loading />;

console.log('When seeing Get Started button, status is:', user?.driverRequest);

  return (
    <div className="h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold">Uber</div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Ride
            </a>
            <div className="flex items-center space-x-1 hover:text-gray-300 transition-colors cursor-pointer">
              <span>Earn</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Business
            </a>
            <div className="flex items-center space-x-1 hover:text-gray-300 transition-colors cursor-pointer">
              <span>About</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm">EN</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help</span>
          </div>
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
                <div className="flex items-center space-x-2 px-2 py-2 rounded-full cursor-pointer transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.username}</span>
                  {isDown ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>
              {isDown && (
                <div className="absolute right-0 mt-2 p-4 bg-white text-black rounded-lg shadow-lg z-10 flex flex-col shadow-gray-600">
                  {/* Dropdown items */}
                  <div className="flex flex-col">
                    <div className="cursor-pointer py-4 px-3 flex items-center">
                      <User size={20} className="mr-2" />
                      <span>Drive & Deliver</span>
                    </div>
                    <div className="cursor-pointer py-4 px-3 flex items-center">
                      <GraduationCap size={20} className="mr-2" />
                      <span>Ride</span>
                    </div>
                    <div className="cursor-pointer py-4 px-3 flex items-center">
                      <GraduationCap size={20} className="mr-2" />
                      <span>Uber Eats</span>
                    </div>
                    <div className="cursor-pointer py-4 px-3 flex items-center">
                      <GraduationCap size={20} className="mr-2" />
                      <span>Uber for Business</span>
                    </div>
                    <div className="cursor-pointer py-4 px-3 flex items-center">
                      <GraduationCap size={20} className="mr-2" />
                      <span>Manage account</span>
                    </div>

                    <div className="border-t border-gray-300 pt-6 justify-center flex py-4">
                      <button
                        onClick={signOut}
                        className="text-red-500 px-30 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer"
                      >
                        Signout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
            Drive when you want, make what you need
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-md">
            Earn on your own schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {!user ? (
              <button
                onClick={() => (window.location.href = "/login")}
                className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors text-lg"
              >
                Already have an account? Sign in
              </button>
            ) : ["none", "rejected", undefined].includes(
                user?.driverRequest
              ) ? (
              <button
                onClick={() => (window.location.href = "/tab1")}
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get started
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = "/pending")}
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                View Request Status
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex-1 flex justify-end">
          <div className="relative">
            <div className="w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="./driver.webp"
                  alt="Uber driver illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
